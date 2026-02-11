import {
	gridConfig,
	linkCommand,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridNoteFilesShowMode
} from "client-controls";

export class ProjectManagementClasses extends PXView {
	ProjectManagementClassId: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	UseForProjectIssue: PXFieldState<PXFieldOptions.CommitChanges>;
	UseForRequestForInformation: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ProjectManagementClassesCurrent extends PXView {
	RequestForInformationResponseTimeFrame: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectIssueResponseTimeFrame: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details })
export class Attributes extends PXView {
	IsActive: PXFieldState;
	@linkCommand("CRAttribute_ViewDetails")
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	SortOrder: PXFieldState;
	Required: PXFieldState;
	CSAttribute__IsInternal: PXFieldState;
	ControlType: PXFieldState;
	DefaultValue: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class ProjectManagementClassPriority extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	PriorityName: PXFieldState;
	SortOrder: PXFieldState;
	IsDefault: PXFieldState<PXFieldOptions.CommitChanges>;
}
