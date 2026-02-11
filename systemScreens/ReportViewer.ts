import { delegationStrategy } from "aurelia-binding";
import { autoinject, PLATFORM, computedFrom, ElementEvents } from "aurelia-framework";
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

const GROUPS_BUTTON = "groups";
const HTML_MODE_BUTTON = "htmlmode";
const VIEW_PDF_BUTTON = "viewpdf";
const REFRESH_BUTTON = "refresh";
const PRINT_BUTTON = "print";

@graphInfo({ graphType: "PX.Data.Reports.ReportViewerMaint", primaryView: "Report" })
@autoinject
export class ReportViewer extends PXScreen {
	@actionConfig({ toggleMode: true })
	groups: PXActionState;

	@viewInfo({ containerName: "Report" })
	Report = createSingle(ReportExp);

	@viewInfo({ containerName: "Groups Tree" })
	GroupsTree = createCollection(GroupTree);

	private msg = Messages;
	private isRefresh = true;
	private refreshScreenDataAfterLoadOfReportResults = true;
	private domEvents: ElementEvents;
	private groupsHidden: boolean = true;
	private groupsSplitterState: SplitterState = "collapsed-first";
	private resultFrame?: HTMLIFrameElement;
	private printFrame?: HTMLIFrameElement;
	private resultUrl: string;
	private printUrl = "about:blank";
	private subscriptions: Disposables = new Disposables();
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
			this.eventAggregator.subscribe("screen-updated", () => {
				this.recalculateResultUrl();
			})
		);
		this.recalculateResultUrl();
	}

	async attached() {
		await super.attached();
		if (this.treeElement) {
			this.subscriptions.append(
				this.eventManager.addEventListener(this.treeElement, "onSelect",
					(e: Event) => this.groupNodeSelect(e as any), delegationStrategy.none, true));
		}
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
			this.resultFrame.contentWindow.location.href = this.resultUrl;
		}
		else {
			this.refreshing = false;
		}
	}

	private recalculateResultUrl(params?: { pageNum?: number; groupId?: string; search?: string }) {
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
		}
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
				this.toogleGroups(buttonConfig);
				e.stopPropagation();
				(<any>e).propagationStopped = true;
				break;

			case HTML_MODE_BUTTON:
			case VIEW_PDF_BUTTON:
				this.refreshScreenDataAfterLoadOfReportResults = true;
				this.refreshing = true;
				this.refreshingMessage = "";
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
		}
	}

	private printResultLoaded() {
		if (!this.refreshing) {
			return;
		}
		this.refreshing = false;
		this.printFrame?.contentWindow.print();
	}

	private toogleGroups(buttonConfig: IToolBarMenuButton) {
		//buttonConfig.togleMode = true;
		this.groupsHidden = !this.groupsHidden;
		this.groupsSplitterState = this.groupsHidden ? "collapsed-first" : "normal";
		buttonConfig.pushed = !this.groupsHidden;
	}

	private groupNodeSelect(e: CustomEvent<Array<SelectedNode>>) {
		const selectedGroupNode = e?.detail?.[0];
		const idParts = selectedGroupNode?.id?.split("|");

		if (!idParts) {
			return;
		}

		// Indirect sign that the report is ARM report
		// TODO: replace later with a direct indicator of ARM reports if it will be passed to the frontend
		const isArmReport = idParts.length !== 2;

		if (isArmReport) {
			this.screenService.setControlParameter("GroupsTree", "GroupId", idParts[0]);
			this.screenService.update();
		}
		else {
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

		// We need to make an extra request for screen data to backend after report results are loaded for the first time
		// to ensure that actual screen data are obtained in the end. All other requests for screen data may return incorrect data
		// due to a report object in the server memory being outdated. Only this request always happens after the report object's refresh.
		if (this.refreshScreenDataAfterLoadOfReportResults) {
			this.refreshScreenDataAfterLoadOfReportResults = false;
			if (this.screenService.initialized || this.screenService.isReloadRequest) {
				await this.screenService.update();
			}
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
		this.recalculateResultUrl({ pageNum: 0, search: filter });
		if (this.resultFrame) {
			this.resultFrame.contentWindow.location.href = this.resultUrl;
		}
	}
}
