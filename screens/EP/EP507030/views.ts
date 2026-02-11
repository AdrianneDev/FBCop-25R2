import { PXView, PXFieldState, gridConfig, controlConfig, PXFieldOptions, columnConfig, GridColumnType, TextAlign, GridPreset, GridColumnDisplayMode, PXActionState } from "client-controls";

export class EPSummaryFilter extends PXView  {
	ApproverID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	FromWeek: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	TillWeek: PXFieldState<PXFieldOptions.CommitChanges>;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	RegularTime: PXFieldState<PXFieldOptions.Disabled>;
	RegularOvertime: PXFieldState<PXFieldOptions.Disabled>;
	RegularTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	mergeToolbarWith: "",
	quickFilterFields: ["EmployeeID", "Description"],
	allowInsert: false,
	allowDelete: false
})
export class EPSummaryApprove extends PXView  {
	ViewDetails: PXActionState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsApprove: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsReject: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	EmployeeID: PXFieldState;

	WeekID_Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EarningType: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true })
	ParentNoteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState;

	ProjectDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;

	ProjectTaskDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ShiftID: PXFieldState;

	Mon: PXFieldState;
	Tue: PXFieldState;
	Wed: PXFieldState;
	Thu: PXFieldState;
	Fri: PXFieldState;
	Sat: PXFieldState;
	Sun: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeSpent: PXFieldState;

	@columnConfig({ type: GridColumnType.CheckBox })
	IsBillable: PXFieldState;

	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TimeCardCD: PXFieldState;
}
