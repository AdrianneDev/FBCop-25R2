import { observable } from "aurelia-binding";
import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, QpInlineScreenCustomElement,
	ScreenUpdateParams, QpTreeCustomElement, ScreenApiSettings, autoinject, RedirectHandlersProvider,
	BaseRedirectExceptionHandler, IOpenWindowResult, RedirectType, IRedirectData, IRedirectHandlerParams,
	WindowMode, IGraphInfoConfig, Guid, UrlOpenerEngine, PXActionState, actionConfig, customDataHandler,
	IInlineScreenConfig, SessionURL
} from "client-controls";
import { RowFilter, SiteMapTree, RowSolutionConfig, RowCheckinFile, RowISVInitials, RowFilesTree, RowValidate } from "./views";
import { CustomizationManagerParams, CustomizationManagerParamsHelper } from "../common/au-base-screen";

interface RefreshTreeParams {
	projectSelectedNode?: string;
	projectTreeMoveToParent?: boolean;
	silentTreeUpdate?: boolean;
};

@graphInfo({graphType: "PX.Web.Customization.ProjectBrowserMaint", primaryView: "Filter", disableReminder: true })
export class AU000000 extends PXScreen  {
	activeScreenVM?: QpInlineScreenCustomElement;
	@autoinject
	protected screenApiSettings: ScreenApiSettings;
	@autoinject
	protected redirectHandlersProvider: RedirectHandlersProvider;

	@viewInfo({syncAlways: true})
	Filter = createSingle(RowFilter);
	SiteMapTree = createCollection(SiteMapTree);

	ViewSolutionNew = createSingle(RowSolutionConfig);
	ViewSolutionExisting = createSingle(RowSolutionConfig);
	ViewCreateFromTFS = createSingle(RowSolutionConfig);
	ViewSaveToTFS = createSingle(RowSolutionConfig);
	FilesTree = createSingle(RowFilesTree);

	@viewInfo({containerName: "Modified Files Detected"})
	ViewCheckinFiles = createCollection(RowCheckinFile);
	@viewInfo({containerName: "Customization Project Prefix"})
	ViewManageISVSolutionInitials = createSingle(RowISVInitials);
	ViewValidateExtensions = createSingle(RowValidate);

	@actionConfig({
		dialogWidth: "lg",
		dialogHeight: "85vh"
	})
	export: PXActionState;

	@observable
	treeVM: QpTreeCustomElement;
	@observable
	activeScreen?: IInlineScreenConfig & { nodeId: string };
	availableScreens: { [id: string]: IInlineScreenConfig & { nodeId: string } } = {};

	compilationPanelFrameUrl: string;


	afterConstructor() {
		super.afterConstructor();
		this.compilationPanelFrameUrl = new SessionURL("/Controls/Publish.aspx?compile=true", window.location).href;
		/*this.screenEventManager.subscribe(OpenPopupEvent, (message: OpenPopupEvent) => {
			if (message.content === "PanelCompiler") {
				message.detail.popupCommand = "Refresh";
			}
		});*/
		this.eventAggregator.subscribe("project-browser-tree-refresh", (params: RefreshTreeParams) => this.refreshTree(params));
		this.redirectHandlersProvider.register(RedirectType.GoTo, new AU000000GoToRedirectHadler(this));
		const win = <any>window;
		win.projectFrame = win.projectFrame || {};
		Object.assign(win.projectFrame, { refreshMenu: params => this.refreshTreeFromOldUi(params)});
	}

	onAfterInitialize(): void {
		document.addEventListener("buttonpressed", (event: CustomEvent) => {
			if (event.detail?.config?.id === "MainToolbarts_actionPublishSingle" && this.activeScreen.screenId.toUpperCase() === "SM204520") {
				const s = document.getElementById("_inner_frame") as HTMLIFrameElement;
				const v = s.contentDocument?.getElementById("ctl00_phDS_ds_ToolBar") as HTMLDivElement;
				const q = v.parentElement as any;
				q.au.controller.viewModel.processClick("ctl00_phDS_ds_ToolBar_saveProps", "MenuButton", new PointerEvent("Click"));
			}
		});
	}

	public handleRedirect(props: IRedirectHandlerParams, redirectData: IRedirectData): IOpenWindowResult | Window | null | void | "not-handled" {
		if (props.url.indexOf("GetFile.ashx") >= 0) {
			return "not-handled";
		}
		if (props.settings.mode !== WindowMode.Same) return "not-handled";
		const projectBrowserTreeHandler = redirectData.screenData?.controlsData?.ProjectBrowserTreeHandler;
		if (!projectBrowserTreeHandler?.ProjectSelectedNode && !projectBrowserTreeHandler?.ProjectTreeMoveToParent) {
			if (props.targetFrame === "Solution") return "not-handled"; // opening of the solution file
			const uiType = props.url.indexOf(".aspx") >= 0 ? "E" : "T";
			const extension = uiType === "E" ? ".aspx" : ".html";
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			const screenId = props.url.slice(props.url.indexOf(extension) - 8, props.url.indexOf(extension));
			let url = props.url;
			if (projectBrowserTreeHandler?.AdditionalParameters) {
				url += "?";
				Object.keys(projectBrowserTreeHandler?.AdditionalParameters).forEach(key => url += `${key}=${projectBrowserTreeHandler?.AdditionalParameters[key]}&`);
			}
			url = this.appendTimeStamp(url);

			const nodeId = Object.keys(this.availableScreens).find(key => this.availableScreens[key].navigationUrl === url) ?? Guid.new();
			this.tryInitializeScreen(nodeId, screenId, uiType, url).then(p => this.setActiveScreen(nodeId));
		}
		//else return "not-handled";
		// consider case with inner redirect to the screen not presented in the tree nodes
		return null;
	}

	override async update(params?: ScreenUpdateParams, selectFirstNode: boolean = true) {
		await super.update(params);
		this.updateInlineScreensDelegate();
		if (selectFirstNode) await this.selectFirstNode();
	}

	@customDataHandler<CustomizationManagerParams>((screen: AU000000) => CustomizationManagerParamsHelper.getParamsFromLocation())
	CustomizationManagerCustomHandler() {
		return;
	}

	protected override onBeforeInitialize(): Promise<void> {
		this.treeVM?.element?.addEventListener("updateTree", () => {
			this.updateInlineScreensDelegate();
		});
		this.treeVM?.element?.addEventListener("valueSelected", this.setActiveScreenDelegate);
		return super.onBeforeInitialize();
	}

	private setActiveScreenDelegate = (e: CustomEvent) => {
		this.updateInlineScreensDelegate();
		const nodeId = e.detail[0].id;

		this.setActiveScreen(nodeId);
	};

	private async setActiveScreen(nodeId: any, silent: boolean = false) {
		if (!silent && this.activeScreen?.nodeId === nodeId) {
			this.reloadScreenAfterErrors();
		}

		let activeScreen;
		const innerScreenNodeID = this.Filter?.InnerScreenNodeID?.value;

		if (!this.activeScreen && innerScreenNodeID) {
			await this.tryInitializeScreen(innerScreenNodeID, this.Filter?.InnerScreenID?.value, this.Filter?.InnerScreenUIType?.value, this.Filter?.InnerScreenUrl?.value);
			activeScreen = this.availableScreens[innerScreenNodeID];
		}
		else {
			activeScreen = this.availableScreens[nodeId];
		}

		const nodeParams = (new SessionURL(activeScreen.navigationUrl)).searchParamsAsObject;
		const allParams = CustomizationManagerParamsHelper.getParamsFromLocation();
		const urlParams = {};
		for (const [k, v] of Object.entries(allParams)) {
			if (v !== undefined) {
				urlParams[k] = v;
			}
		}

		let url = activeScreen.navigationUrl;
		url = this.appendTimeStamp(url);

		const keyParams = {
			...(this.Filter?.ProjectID?.value.id && { ProjectId: this.Filter.ProjectID?.value.id }),
			...nodeParams,
			...urlParams
		} as Record<string, string>;

		this.screenApiSettings.updateBrowserLocation(activeScreen.screenId, false, keyParams);

		if (!silent) {
			this.activeScreen = undefined;
			this.tq.flushMicroTaskQueue();
			// Copy is needed because config might be modified if screen is unavailable and we roll it back to previous config
			this.activeScreen = { ...activeScreen, navigationUrl: url };
		}
	}

	private appendTimeStamp(url: string) {
		const timestampObj = this.container.get(UrlOpenerEngine).redirectToCachedVersion(url);
		if (timestampObj.timeStamp) {
			url = `${url}${url.indexOf("?") !== -1 ? "&" : "?"}timeStamp=${timestampObj.timeStamp}`;
		}
		return url;
	}

	private reloadScreenAfterErrors() {
		const iframeDocument = this.activeScreenVM?.iframeElement?.contentDocument;
		const iframeWindow = this.activeScreenVM?.iframeElement?.contentWindow as any;
		const iframeBody = iframeDocument.body as any;
		// reload page if there's a server error instead of the page content
		if (this.activeScreen?.uiType === "T") {
			// no aurelia instance for the new ui screen
			if (!iframeBody.aurelia) {
				iframeDocument?.location.reload();
			}
		}
		else {
			// no px object for the old ui screen
			if (!iframeWindow?.px) {
				iframeDocument?.location.reload();
			}
		}
	}

	private async updateAllInlineScreensDelegate() {
		for (const record of this.SiteMapTree.records) {
			await this.updateInlineScreensDelegate(record);
		};
	}

	private async updateInlineScreensDelegate(row?: SiteMapTree): Promise<void> {
		const record = row ?? this.SiteMapTree.activeRow;
		if (!record) return;

		const nodeId = record.NodeID.value;
		const screenId = record.ScreenID.value;
		const selectedUI = record.SelectedUI.value;
		const navigationUrl = record.Url.value;
		const graphType = record.Graphtype.value;
		const primaryView = record.PrimaryView.value;

		await this.tryInitializeScreen(nodeId, screenId, selectedUI, navigationUrl, graphType, primaryView);
	}

	private async tryInitializeScreen(nodeId: string, screenId: string, selectedUI: "T" | "E", navigationUrl: string, graphType?: string, primaryView?: string): Promise<void> {
		let graphInfo: IGraphInfoConfig | undefined = undefined;
		if (graphType && primaryView) {
			graphInfo = {
				graphType: graphType,
				primaryView: primaryView
			};
		}

		if (!this.availableScreens[nodeId]) {
			const screen: IInlineScreenConfig & { nodeId: string } = {
				screenId: screenId,
				navigationParameters: {},
				uiType: selectedUI,
				graphInfo: graphInfo,
				isReport: false,
				hideToolbar: true,
				navigationUrl: navigationUrl,
				nodeId: nodeId
			};

			this.availableScreens[nodeId] = screen;
		}
	}

	private async selectFirstNode() {
		if (!this.treeVM?.treeService?.itemList?.length) return;
		await this.updateAllInlineScreensDelegate();
		this.treeVM.initSelectedNode(this.treeVM.treeService.itemList[0].id);
	}

	private async selectNode(id: string, silent: boolean = false) {
		if (!this.treeVM?.treeService?.itemList?.length) return;
		await  this.updateAllInlineScreensDelegate();
		this.treeVM.initSelectedNode(id, silent);
	}

	private refreshTree(params?: RefreshTreeParams, silent: boolean = false) {
		params = params || {};
		let activeNode = params.projectSelectedNode;
		if (!params.projectSelectedNode && params.projectTreeMoveToParent) {
			activeNode = this.treeVM.treeService.itemList.find(i => i.rowId === (<SiteMapTree> this.treeVM.view.activeRow)?.NodeID?.value).parentId;
			if (activeNode) this.selectNode(activeNode).then(() => this.update(null, false));
			else this.update(null, false);
		}
		else {
			if (silent || params.silentTreeUpdate) this.treeVM.lockActiveRowId();
			this.update(null, false)
				.then(() => {
					this.selectNode(activeNode, silent || params.silentTreeUpdate);
					this.openTreePath(activeNode);
				});
		}
	}

	private openTreePath(nodeId: string) {
		// load children for opened nodes
		const nodesToOpen: string[] = [];
		let parentId = this.treeVM.treeService.metaMap[nodeId]?.item?.parentId;
		while (parentId) {
			nodesToOpen.push(parentId);
			parentId = this.treeVM.treeService.metaMap[parentId].item?.parentId;
		}
		this.treeVM.openNode(nodesToOpen);
	}

	private refreshTreeFromOldUi(params?: RefreshTreeParams) {
		if (params.projectSelectedNode) {
			// screen was already loaded and we just need to select tree node without triggering screen reload, so we pass silent=true
			this.refreshTree(params, true);
		}
	}
}


class AU000000GoToRedirectHadler extends BaseRedirectExceptionHandler {
	constructor(private owner: AU000000) {
		super();
	}

	override handle(props: IRedirectHandlerParams, redirectData: IRedirectData): IOpenWindowResult | Window | null | void | "not-handled" {
		return this.owner.handleRedirect(props, redirectData);
	}
}
