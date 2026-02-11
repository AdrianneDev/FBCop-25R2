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

export class EPActivityFilter extends PXView  {
	ApproverID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState<PXFieldOptions.CommitChanges>;
	TillDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
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
	quickFilterFields: ["OwnerID", "Summary"],
	allowDelete: false,
	allowInsert: false
})
export class PMTimeActivity extends PXView  {
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsApproved: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsReject: PXFieldState;

	Date: PXFieldState;
	OwnerID: PXFieldState;

	OwnerID_EPEmployee_AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	WorkGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EarningTypeID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true })
	ParentTaskNoteID: PXFieldState;

	@linkCommand("ViewContract")
	@columnConfig({ hideViewLink: true })
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
	ApproverID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TimeCardCD: PXFieldState;

	@linkCommand("ViewCase")
	@columnConfig({ hideViewLink: true })
	CRCase__CaseCD: PXFieldState;

	@linkCommand("ViewContract")
	@columnConfig({ hideViewLink: true })
	ContractEx__ContractCD: PXFieldState;

	ReportedInTimeZoneID: PXFieldState;
	ReportedOnDate_Date: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }, format: "t" })
	ReportedOnDate_Time: PXFieldState;
}
