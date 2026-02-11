import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnType,
	TextAlign,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

export class OwnedFilter extends PXView  {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState<PXFieldOptions.CommitChanges>;
	TillDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	RegularTime: PXFieldState<PXFieldOptions.Disabled>;
	BillableTime: PXFieldState<PXFieldOptions.Disabled>;
	RegularOvertime: PXFieldState<PXFieldOptions.Disabled>;
	BillableOvertime: PXFieldState<PXFieldOptions.Disabled>;
	RegularTotal: PXFieldState<PXFieldOptions.Disabled>;
	BillableTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	mergeToolbarWith: "",
	quickFilterFields: ["OwnerID_EPEmployee_AcctName", "ProjectID", "ProjectTaskID"],
	allowDelete: false,
	allowInsert: false
})
export class PMTimeActivity extends PXView  {
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox, allowCheckAll: true })
	Selected: PXFieldState;

	Date: PXFieldState;
	OwnerID: PXFieldState;
	OwnerID_EPEmployee_AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EarningTypeID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true })
	ParentTaskNoteID: PXFieldState;

	@linkCommand("ViewContract")
	ContractID: PXFieldState;

	ProjectID: PXFieldState;
	ProjectDescription: PXFieldState;
	ProjectTaskID: PXFieldState;
	ProjectTaskDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;

	CostCodeDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ShiftID: PXFieldState;

	TimeSpent: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsBillable: PXFieldState;

	TimeBillable: PXFieldState;

	@linkCommand("ViewDetails")
	Summary: PXFieldState;

	@columnConfig({ hideViewLink: true })
	WorkGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ApproverID: PXFieldState;

	ApprovedDate: PXFieldState;

	@linkCommand("ViewCase")
	@columnConfig({ hideViewLink: true })
	CRCase__CaseCD: PXFieldState;

	CRCase__Status: PXFieldState;

	@linkCommand("ViewContract")
	@columnConfig({ hideViewLink: true })
	ContractEx__ContractCD: PXFieldState;

	ReportedInTimeZoneID: PXFieldState;
	ReportedOnDate_Date: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }, format: "t" })
	ReportedOnDate_Time: PXFieldState;
}
