import { delegationStrategy, Disposable } from "aurelia-binding";
import { autoinject, PLATFORM, ElementEvents } from "aurelia-framework";
import {
	ReportResultApiClient,
	PXScreen,
	graphInfo,
	viewInfo,
	createSingle,
	ReportResultType,
	optional,
	BASE_PATH,
	REPORT_VIEWER_ID_KEY,
	IToolBarMenuButton,
	SplitterState,
	PXActionState,
	actionConfig,
	createCollection,
	ServerCommand,
	Disposables,
	SelectedNode,
	QpTreeCustomElement,
	CustomEventType,
	handleEvent,
	CallbackCompletedHandlerArgs,
	ICommandUpdateResult,
	IScreenUpdateInfo,
	MenuButton,
	QpToolBarCustomElement,
} from "client-controls";
import { Container } from "aurelia-dependency-injection";
import {
	ReportExp,
	GroupTree,
} from "./report-views";
import { Messages } from "../screens/common/messages";
import {
	getResultUrl,
	ReportResultParams,
} from "./report-utils";
import {
	GROUPS_BUTTON, HTML_MODE_BUTTON, VIEW_PDF_BUTTON, REFRESH_BUTTON,
	PRINT_BUTTON, PAGE_FIRST_BUTTON, PAGE_PREVIOUS_BUTTON, PAGE_NEXT_BUTTON,
	PAGE_LAST_BUTTON, IPageInfo,
} from "./report-types";
const GROUP_NODE_SELECTED = "groupNodeSelected";

@graphInfo({ graphType: "PX.Data.Reports.ReportViewerMaint", primaryView: "Report" })
@autoinject
export class ReportViewer extends PXScreen {
	@actionConfig({ toggleMode: true })
	groups: PXActionState;

	groupNodeSelected: PXActionState;

	@viewInfo({ containerName: "Report" })
	Report = createSingle(ReportExp);

	@viewInfo({ containerName: "Groups Tree" })
	GroupsTree = createCollection(GroupTree);

	private msg = Messages;
	private isRefresh = false;
	private domEvents: ElementEvents;
	private groupsHidden: boolean = true;
	private groupsSplitterState: SplitterState = "collapsed-first";
	private resultFrame?: HTMLIFrameElement;
	private printFrame?: HTMLIFrameElement;
	private resultUrl: string;
	private printUrl = "about:blank";
	private subscriptions: Disposables = new Disposables();
	private treeSubscription?: Disposable = undefined;
	private treeElement?: HTMLElement;
	private treeViewModel: QpTreeCustomElement;
	private refreshing = false;
	private refreshingMessage = "";
	private hideIframe: boolean = false;
	private urlLoading = false;

	constructor(container: Container, @optional(BASE_PATH) private basePath: string) {
		super();
		container.registerInstance(REPORT_VIEWER_ID_KEY, this.instanceId);
		this.registerService(ReportResultApiClient);
		this.groupNodeSelect = this.groupNodeSelect.bind(this);
		PLATFORM.global.UpdateReportStatus = this.updateReportStatus.bind(this);
		PLATFORM.global.OnFrameLoad = this.onFrameLoad.bind(this);
	}

	detached() {
		delete PLATFORM.global.UpdateReportStatus;
		delete PLATFORM.global.OnFrameLoad;
	}

	afterConstructor() {
		super.afterConstructor();
		this.screenService.registerViewBinding(this.element, "Report");
		this.subscriptions.append(
			this.eventAggregator.subscribe("screen-updated", (args: IScreenUpdateInfo) => {
				const serverCommand = args.dueToQuery?.command;
				if (serverCommand && serverCommand.length > 0) {
					if (serverCommand[0].name === GROUP_NODE_SELECTED) {
						return;
					}
					if (serverCommand[0].name === REFRESH_BUTTON) {
						this.refreshGroupView();
						this.attachTreeEvent();
					}
				}
				if (!this.Report?.ViewPdf?.value) {
					try {
						const pageInfo = this.getPageInfo(this.resultFrame.contentWindow);
						this.enablePageButtons(pageInfo);
					}
					catch (error) {
						console.warn("Couldn't calculate pageInfo", error);
					}
				}
				this.recalculateResultUrl();
			})
		);
		this.recalculateResultUrl();
	}

	async attached() {
		await super.attached();
		this.domEvents = new ElementEvents(document.body);
		this.domEvents.subscribe("buttonpressed", (e: CustomEvent) => this.processButtonPressed(e));
	}

	get instanceId(): string | undefined {
		const urlParams = new URLSearchParams(PLATFORM.global.location.search.toLowerCase());
		return urlParams.get("instanceid") ?? this.Report?.InstanceId?.value;
	}

	updateReportStatus(message: string) {
		if (this.model && !this.model.initialized) {
			this.model.loadingMessage = message;
		}
		else {
			this.refreshingMessage = message;
		}
	}

	onFrameLoad(iFrame: HTMLIFrameElement) {
		if (iFrame.contentDocument?.body?.classList?.contains("report-loading")) {
			this.isRefresh = false;

			if (!this.refreshing && this.initialized) {
				this.refreshing = true;
				this.refreshingMessage = this.refreshingMessage ?? this.model?.loadingMessage;
			}

			if (!this.recalculateResultUrl()) {
				this.resultFrame.contentWindow.location.href = this.resultUrl;
			}
		}
		else {
			this.refreshing = false;
		}
	}

	@handleEvent(CustomEventType.CallbackCompleted)
	onCallbackCompleted(args: CallbackCompletedHandlerArgs<ICommandUpdateResult>) {
		if (!args.data?.succeeded) {
			// Exception
			return;
		}

		if (this.Report?.IsArm.value && args.actionName === GROUP_NODE_SELECTED) {
			if (this.resultFrame) {
				this.refreshing = true;
				this.isRefresh = true;
				this.resultFrame.contentWindow.location.href = this.getUrl({ pageNum: 0 });
			}
		}
	}

	getKeys(): { [key: string]: string } {
		// add instanceId to keys so the rewritten url can identify the report instance
		return { ...super.getKeys(), instanceId: this.instanceId || "" };
	}

	private recalculateResultUrl(params?: { pageNum?: number; groupId?: string; search?: string }): boolean {
		const newUrl = this.getUrl(params);
		if (newUrl !== this.resultUrl) {
			if (!this.urlLoading) {
				this.busyCounter.increment();
				this.urlLoading = true;
			}

			this.hideIframe = true; // we need to hide iframe before changing its src to prevent parent window history changing
			this.tq.queueTask(() => {
				this.resultUrl = newUrl;
				this.hideIframe = false;
			});

			return true;
		}

		return false;
	}

	private getUrl(params?: { pageNum?: number; groupId?: string; search?: string }) {
		const pageIndex = typeof params?.pageNum === "undefined" ? (this.Report?.PageIndex?.value || 0) : params.pageNum;
		const resultUrlParams: ReportResultParams = {
			instanceId: this.instanceId,
			opType: this.Report?.ViewPdf?.value ? ReportResultType.Pdf : ReportResultType.Html,
			basePath: this.basePath,
			pageIndex,
			groupId: params?.groupId,
			search: params?.search
		};

		if (this.isRefresh && !resultUrlParams.search && !resultUrlParams.groupId) {
			resultUrlParams.refresh = true;
		}

		if (!!this.Report?.PrintAllPages?.value) {
			resultUrlParams.joinPages = true;
			resultUrlParams.pageIndex = -1;
		}

		return getResultUrl(resultUrlParams);
	}

	private processButtonPressed(e: CustomEvent) {
		const buttonConfig = e.detail?.config as IToolBarMenuButton;
		if (!buttonConfig?.commandName) {
			return;
		}

		const commandLowerCase = buttonConfig.commandName.toLowerCase();

		switch (commandLowerCase) {
			case GROUPS_BUTTON:
				this.toogleGroups();
				e.stopPropagation();
				(<any>e).propagationStopped = true;
				break;

			case HTML_MODE_BUTTON:
				this.refreshing = true;
				this.refreshingMessage = "";
				break;
			case VIEW_PDF_BUTTON:
				this.refreshing = true;
				this.refreshingMessage = "";
				if (!this.groupsHidden) {
					this.toogleGroups();
				}
				break;

			case REFRESH_BUTTON:
				if (this.model && this.resultFrame) {
					this.refreshing = true;
					this.isRefresh = true;
					this.resultFrame.contentWindow.location.href = this.resultUrl;
					if (!this.urlLoading) {
						this.busyCounter.increment();
						this.urlLoading = true;
					}
				}
				break;

			case PRINT_BUTTON:
				if (this.printFrame) {
					const printUrl = this.getUrl({ pageNum: -1 });
					if (this.printUrl !== printUrl) {
						this.refreshing = true;
						this.refreshingMessage = "";
						this.printUrl = printUrl;
						// see printResultLoaded
					}
					else {
						this.printFrame?.contentWindow.print();
					}
				}
				break;

			case PAGE_FIRST_BUTTON:
			case PAGE_PREVIOUS_BUTTON:
			case PAGE_NEXT_BUTTON:
			case PAGE_LAST_BUTTON:
				this.isRefresh = false;
				this.onPageButton(commandLowerCase);
				e.stopPropagation();
				(<any>e).propagationStopped = true;
				break;
		}
	}

	private onPageButton(pageButtonCommand: string) {
		const win = this.resultFrame.contentWindow;
		const pageInfo = this.getPageInfo(win);

		switch (pageButtonCommand) {
			case PAGE_FIRST_BUTTON:
				pageInfo.startPage = 0;
				break;

			case PAGE_PREVIOUS_BUTTON:
				if (pageInfo.startPage > 0) {
					pageInfo.startPage--;
				}
				break;

			case PAGE_NEXT_BUTTON:
				if (pageInfo.startPage < pageInfo.pageCount - 1) {
					pageInfo.startPage++;
				}
				break;

			case PAGE_LAST_BUTTON:
				if (pageInfo.pageCount > 0) {
					pageInfo.startPage = pageInfo.pageCount - 1;
				}
				break;
		}


		this.recalculateResultUrl({ pageNum: pageInfo.startPage });
		this.enablePageButtons(pageInfo);
	}

	private getPageInfo(win: Window) {
		const elem = win.document.getElementById("reportInfo") as HTMLElement;
		const startPage = typeof elem?.dataset?.startPage === "string" ? Number(elem.dataset.startPage) : 0;
		const pageCount = typeof elem?.dataset?.pageCount === "string" ? Number(elem.dataset.pageCount) : 0;
		return { startPage, pageCount };
	}

	private enablePageButtons(pageInfo: IPageInfo) {
		this.checkButtonIsEnabled(PAGE_FIRST_BUTTON, pageInfo,
			(pageInfo) => pageInfo.startPage > 0);
		this.checkButtonIsEnabled(PAGE_PREVIOUS_BUTTON, pageInfo,
			(pageInfo) => pageInfo.startPage > 0 && pageInfo.pageCount > 1);
		this.checkButtonIsEnabled(PAGE_NEXT_BUTTON, pageInfo,
			(pageInfo) => pageInfo.startPage < pageInfo.pageCount - 1 && pageInfo.pageCount > 1);
		this.checkButtonIsEnabled(PAGE_LAST_BUTTON, pageInfo,
			(pageInfo) => pageInfo.startPage < pageInfo.pageCount - 1);
	}

	private checkButtonIsEnabled(actionName: string, pageInfo: IPageInfo, condition: (pageInfo: IPageInfo) => boolean) {
		const button = this.actions.get(actionName);
		if (button) {
			button.enabled = condition(pageInfo);
		}
	}

	private printResultLoaded() {
		if (!this.refreshing) {
			return;
		}
		this.refreshing = false;
		this.printFrame?.contentWindow.print();
	}

	private toogleGroups() {
		this.groupsHidden = !this.groupsHidden;
		this.refreshGroupView();
		this.attachTreeEvent();
	}

	private refreshGroupView() {
		this.groupsSplitterState = this.groupsHidden ? "collapsed-first" : "normal";
		const toolbar: QpToolBarCustomElement | undefined = (this.screenService.getDataComponent("ScreenToolbar") as any)?.toolBarVM;
		const button = toolbar?.items?.find((i: MenuButton) => i.commandName === GROUPS_BUTTON) as MenuButton;
		if (!button) {
			return;
		}
		button.pushed = !this.groupsHidden;
	}

	private attachTreeEvent() {
		if (this.treeSubscription) {
			this.treeSubscription.dispose();
		}
		if (!this.groupsHidden) {
			this.tq.queueTask(() => {
				if (!this.treeElement) {
					return;
				}
				this.treeSubscription = this.eventManager.addEventListener(
					this.treeElement,
					"onSelect",
					(e: Event) => this.groupNodeSelect(e as any), delegationStrategy.none, true);
			});
		}
	}

	private groupNodeSelect(e: CustomEvent<Array<SelectedNode>>) {
		const selectedGroupNode = e?.detail?.[0];
		const idParts = selectedGroupNode?.id?.split("|");

		if (!idParts) {
			return;
		}

		if (this.Report?.IsArm.value !== true) {
			let pageIndex = parseInt(idParts[0]) - 1;
			let groupId = idParts[1];
			const isTopLevelGroup = pageIndex < 0;

			if (isTopLevelGroup && this.treeViewModel.treeService) {
				const directSubgroups = this.treeViewModel.treeService.getDirectChildren(selectedGroupNode.id);
				const firstSubgroup = directSubgroups?.[0];
				const firstSubgroupIdParts = firstSubgroup?.id?.split("|");

				if (firstSubgroupIdParts && firstSubgroupIdParts.length === 2) {
					pageIndex = parseInt(firstSubgroupIdParts[0]) - 1;
					groupId = firstSubgroupIdParts[1];
				}
			}

			this.recalculateResultUrl({ pageNum: pageIndex, groupId: groupId });
		}
		else {
			this.busyCounter.increment();
		}
	}

	private async resultLoaded() {
		if (!this.resultFrame) {
			return;
		}

		const iframeBody = this.resultFrame.contentDocument?.body;
		if (iframeBody?.classList?.contains("report-loading")) {
			return;
		}

		this.urlLoading = false;
		this.busyCounter.decrement();

		const win = this.resultFrame.contentWindow;
		try {
			win.addEventListener("click", (ev: MouseEvent) => {
				let target = ev.target as HTMLElement;
				if (target && target.tagName === "SPAN" && target.parentElement.tagName === "A") {
					target = target.parentElement;
				}
				if (!target || target.tagName !== "A") {
					return;
				}

				ev.stopPropagation();
				ev.preventDefault();
				const prefix = "javascript:";
				const anchorElement = target as HTMLAnchorElement;
				if (anchorElement.href.startsWith(prefix)) {
					const hash = anchorElement.href.substring(prefix.length);
					this.screenService.executeCommand(new ServerCommand("Navigate", [hash]));
				}
				else {
					this.redirectHelper.openUrl(anchorElement.href, anchorElement.target ? anchorElement.target : "_self");
				}
			});
		}
		catch (error) {
			console.warn("Couldn't attach event to IFRAME", error);
		}

		if (!this.Report?.ViewPdf?.value) {
			this.enablePageButtons(this.getPageInfo(win));
			this.refreshGroupView();
		}
	}

	private onSearchPressed(ev: KeyboardEvent): boolean {
		if (ev.key !== "Enter" || ev.ctrlKey || ev.altKey) {
			return true;
		}
		ev.stopPropagation();
		ev.preventDefault();
		const searchElement = ev.target as HTMLInputElement;

		this.onSearch(searchElement.value);
		return false;
	}

	private onSearch(filter: string) {
		if (!this.recalculateResultUrl({ pageNum: 0, search: filter })) {
			this.busyCounter.increment();
		}

		if (this.resultFrame) {
			const win = this.resultFrame.contentWindow;
			win.location.href = this.resultUrl;
		}
	}
}
