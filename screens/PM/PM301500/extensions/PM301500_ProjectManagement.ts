import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState, GridFastFilterVisibility, linkCommand, PXFieldOptions, controlConfig, featureInstalled, FeaturesSet, GridNoteFilesShowMode, columnConfig } from "client-controls";
import { PM301500 } from "../PM301500";

export interface PM301500_ProjectManagement extends PM301500 { }
@featureInstalled(FeaturesSet.ConstructionProjectManagement)
export class PM301500_ProjectManagement {
    DailyFieldReports = createCollection(DailyFieldReport);
    RequestsForInformation = createCollection(RequestForInformation);
    ProjectIssues = createCollection(ProjectIssue);
    DrawingLogs = createCollection(DrawingLog);
    PhotoLogs = createCollection(PhotoLog);
    CurrentPhoto = createSingle(Photo);
    Submittals = createCollection(Submittal);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.Auto
})
export class DailyFieldReport extends PXView {
	CreateDailyFieldReport: PXActionState;

	DailyFieldReportCd: PXFieldState;
	Status: PXFieldState;
	Date: PXFieldState;
	@columnConfig({hideViewLink: true})
	ProjectManagerId: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	CreatedById: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.Auto
})
export class RequestForInformation extends PXView {
	CreateRequestForInformation: PXActionState;

	RequestForInformationCd: PXFieldState;
	Status: PXFieldState;
	Reason: PXFieldState;
	ProjectTaskId: PXFieldState;
	Summary: PXFieldState;
	DueResponseDate: PXFieldState;
	IsScheduleImpact: PXFieldState;
	ScheduleImpact: PXFieldState;
	IsCostImpact: PXFieldState;
	CostImpact: PXFieldState;
	DesignChange: PXFieldState;
	Incoming: PXFieldState;
	@columnConfig({hideViewLink: true})
	OwnerId: PXFieldState<PXFieldOptions.Hidden>;
	BusinessAccountId: PXFieldState<PXFieldOptions.Hidden>;
	ContactId_Description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	ClassId: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.Auto
})
export class ProjectIssue extends PXView {
	CreateProjectIssue: PXActionState;

	PriorityIcon: PXFieldState;
	ProjectIssueCd: PXFieldState;
	Summary: PXFieldState;
	Status: PXFieldState;
	@columnConfig({hideViewLink: true})
	ProjectTaskId: PXFieldState;
	@columnConfig({hideViewLink: true})
	OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	WorkgroupID: PXFieldState;
	CreationDate: PXFieldState<PXFieldOptions.Hidden>;
	DueDate: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	ClassId: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	ProjectIssueTypeId: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.Auto
})
export class DrawingLog extends PXView {
	CreateDrawingLog: PXActionState;

	DrawingLogCd: PXFieldState;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState;
	@columnConfig({hideViewLink: true})
	ProjectTaskId: PXFieldState;
	Title: PXFieldState;
	@columnConfig({hideViewLink: true})
	DisciplineId: PXFieldState;
	Revision: PXFieldState;
	Sketch: PXFieldState<PXFieldOptions.Hidden>;
	Description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	StatusId: PXFieldState;
	DrawingDate: PXFieldState;
	ReceivedDate: PXFieldState<PXFieldOptions.Hidden>;
	OriginalDrawingId: PXFieldState;
	@columnConfig({hideViewLink: true})
	OwnerId: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.Auto,
	autoRepaint: ["CurrentPhoto"]
})
export class PhotoLog extends PXView {
	CreatePhotoLog: PXActionState;

	PhotoLogCd: PXFieldState;
	Date: PXFieldState;
	ProjectTaskId: PXFieldState;
	Description: PXFieldState;
	@columnConfig({hideViewLink: true})
	StatusId: PXFieldState;
	@columnConfig({hideViewLink: true})
	CreatedById: PXFieldState;
	PhotoLogId: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.Auto
})
export class Photo extends PXView {
	ImageUrl: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.Auto
})
export class Submittal extends PXView {
	CreateSubmittal: PXActionState;

	SubmittalID: PXFieldState;
	@columnConfig({hideViewLink: true})
	RevisionID: PXFieldState;
	Status: PXFieldState;
	Reason: PXFieldState;
	@columnConfig({hideViewLink: true})
	TypeID: PXFieldState;
	Summary: PXFieldState;
	@columnConfig({hideViewLink: true})
	ProjectTaskId: PXFieldState;
	@columnConfig({hideViewLink: true})
	CostCodeID: PXFieldState;
	SpecificationSection: PXFieldState;
	SpecificationInfo: PXFieldState;
	DueDate: PXFieldState;
	DateOnSite: PXFieldState;
	@columnConfig({hideViewLink: true})
	OwnerID: PXFieldState;
	CurrentWorkflowItemContactID_Description: PXFieldState;
	DaysOverdue: PXFieldState;
	DateClosed: PXFieldState;
}

