import {
	createCollection,
	createSingle,
	customDataHandler,
	graphInfo,
	viewInfo,
	gridConfig,
	linkCommand,
	columnConfig,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXScreen,
	PXView,
	GridPreset,
	GridPagerMode,
	OpenPopupEvent,
	controlConfig,
	actionConfig
} from "client-controls";

interface ProjectListParams {
	isFirstRequest?: boolean;
}

@graphInfo({
	graphType: "PX.SM.ProjectList",
	primaryView: "Projects",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class SM204505 extends PXScreen {
	compilationPanelFrameUrl: string;
	isFirstRequest: boolean = true;

	@actionConfig({
		dialogWidth: "lg",
		dialogHeight: "85vh"
	})
	actionPublishedXml: PXActionState;

	ActionPanelValidateExtOK: PXActionState;
	ActionPanelChooseProjects: PXActionState;
	ActionPanelChooseProjectsAllMessages: PXActionState;
	ActionPanelChooseProjectsCancel: PXActionState;

	@viewInfo({containerName: ""})
	Projects = createCollection(CustProject);

	@viewInfo({containerName: "Publish to Multiple Tenants"})
	ViewCompanyList = createCollection(RowSelectCompany);

	@viewInfo({containerName: "Publish to Multiple Tenants"})
	ViewPublishOptions = createSingle(RowPublishOptions);

	@viewInfo({containerName: "Validation Results"})
	ViewValidateExtensions = createSingle(RowValidate);

	@viewInfo({containerName: "Choose projects"})
	ProjectsChooser = createCollection(CustProject2);

	@viewInfo({containerName: "Choose projects"})
	CustomizedScreens = createCollection(CustomizedScreen);

	@customDataHandler<ProjectListParams>((screen: SM204505) => {
		const result = screen.isFirstRequest;
		screen.isFirstRequest = false;
		return {
			isFirstRequest: result
		};
	})

	SM204505Handler() {
		return;
	}

	afterConstructor() {
		super.afterConstructor();
		this.compilationPanelFrameUrl = this.redirectHelper.getAbsoluteUrl("/Controls/Publish.aspx?compile=true");
		this.screenEventManager.subscribe(OpenPopupEvent, (message: OpenPopupEvent) => {
			if (message.content === "PanelCompiler") {
				message.detail.popupCommand = "Reload";
			}
		});
	}
}

// Views
@gridConfig({
	preset: GridPreset.Primary,
	pageSize: 50,
	batchUpdate: false
})
export class CustProject extends PXView {
	@columnConfig({allowCheckAll: true, width: 46})
	IsWorking: PXFieldState;
	IsPublished: PXFieldState;

	@linkCommand("view")
	@controlConfig({ disabled: true })
	Name: PXFieldState;

	Level: PXFieldState;
	ScreenNames: PXFieldState;
	Description: PXFieldState;

	CertificationStatus: PXFieldState;
	Initials: PXFieldState;

	@columnConfig({allowUpdate: false})
	CreatedByID_Creator_Username: PXFieldState;

	@columnConfig({allowUpdate: false})
	LastModifiedDateTime: PXFieldState;

	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: true
})
export class RowSelectCompany extends PXView {
	Selected: PXFieldState;
	Name: PXFieldState;
	ID: PXFieldState;
	ParentID: PXFieldState;
}

export class RowPublishOptions extends PXView {
	PublishOnlyDB: PXFieldState;
	DisableOptimization: PXFieldState;
}

export class RowValidate extends PXView {
	Messages: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoAdjustColumns: true
})
export class CustProject2 extends PXView {
	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState;

	@columnConfig({allowUpdate: false})
	IsPublished: PXFieldState;

	@columnConfig({allowUpdate: false, hideViewLink: true})
	Name: PXFieldState;

	@columnConfig({allowUpdate: false})
	Description: PXFieldState;
}


@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoAdjustColumns: true
})
export class CustomizedScreen extends PXView {
	@columnConfig({allowUpdate: false})
	ScreenId: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Readonly>;

	@columnConfig({allowUpdate: false})
	ScreenName: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.Readonly>;
}
