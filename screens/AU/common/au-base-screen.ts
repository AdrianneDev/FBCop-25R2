import {
	autoinject, customDataHandler, PXScreen, IRedirectHandlerParams, IRedirectData, IOpenWindowResult,
	RedirectHandlersProvider, RedirectType, BaseRedirectExceptionHandler, SessionUrlSerializer,
	isLegacyEnv
} from "client-controls";

export interface CustomizationManagerParams {
	editorScreenId?: string;
	workflowId?: string;
	projectName?: string;
	codeFile?: string;
	projectID?: string;
	objectID?: string;
	mobileScreenID?: string;
	tableName?: string;
	fieldName?: string;
	controlID?: string;
}

export interface WithUrlSerializer {
	urlSerializer: SessionUrlSerializer;
}

export class AuBaseScreen extends PXScreen implements WithUrlSerializer {
	@autoinject
	public urlSerializer: SessionUrlSerializer;

	@autoinject
	protected redirectHandlersProvider: RedirectHandlersProvider;

	get parentScreen(): PXScreen | undefined {
		return (window.parent.document.body as any).aurelia?.container?.viewModel?.viewModel;
	}

	@customDataHandler()
	ProjectBrowserTreeHandler(params: { RefreshProjectTree?: boolean; ProjectSelectedNode?: string; ProjectTreeMoveToParent?: boolean; SilentTreeUpdate?: boolean; AdditionalParameters?: {[x: string]: any} }) {
		if (params.RefreshProjectTree) {
			const eventAggregator = this.parentScreen?.eventAggregator;
			if (eventAggregator) {
				eventAggregator.publish("project-browser-tree-refresh", { projectSelectedNode: params.ProjectSelectedNode, projectTreeMoveToParent: params.ProjectTreeMoveToParent, additionalParameters: params.AdditionalParameters, silentTreeUpdate: params.SilentTreeUpdate });
			}
			else if (isLegacyEnv(<any>window.parent)) {
				const topWin = (<any>window.parent)?.px.topWin();
				if (topWin && topWin.projectFrame) topWin.projectFrame.refreshMenu();
			}
		}
	}

	@customDataHandler<CustomizationManagerParams>((screen: AuBaseScreen) => CustomizationManagerParamsHelper.getParamsFromUrl(screen))
	CustomizationManagerCustomHandler() {
		return;
	}

	afterConstructor() {
		super.afterConstructor();
		if (this.parentScreen) this.redirectHandlersProvider.register(RedirectType.GoTo, new AUBaseScreenGoToRedirectHadler(this));
	}
}


class AUBaseScreenGoToRedirectHadler extends BaseRedirectExceptionHandler {
	constructor(private owner: AuBaseScreen) {
		super();
	}

	override handle(props: IRedirectHandlerParams, redirectData: IRedirectData): IOpenWindowResult | Window | null | void | "not-handled" {
		return (this.owner.parentScreen as any)?.handleRedirect(props, redirectData);
	}
}

export class CustomizationManagerParamsHelper {
	public static getParamsFromUrl(screen: WithUrlSerializer) {
		const parsedParams = screen.urlSerializer.parseQueryParams(window.location.search);
		return {
			editorScreenId: parsedParams.EditScreenID,
			workflowId: parsedParams.WorkflowID,
			projectName: parsedParams.ProjectId ?? parsedParams.project ?? parsedParams.projectName,
			codeFile: parsedParams.CodeFile,
			projectID: parsedParams.ProjectID,
			objectID: parsedParams.ObjectID,
			mobileScreenID: parsedParams.EditMobileScreenID,
			tableName: parsedParams.TableName,
			fieldName: parsedParams.FieldName,
			controlID: parsedParams.ControlID
		};
	}
}
