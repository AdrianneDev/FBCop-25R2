import {
	PXView,
	PXFieldState,
	gridConfig,
	controlConfig,
	PXFieldOptions,
	columnConfig,
	GridColumnType,
	PXActionState,
	TextAlign,
	GridPreset,
	GridColumnDisplayMode,
	linkCommand,
} from "client-controls";

export class OwnedFilter extends PXView  {
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	FromWeek: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	TillWeek: PXFieldState<PXFieldOptions.CommitChanges>;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeReject: PXFieldState<PXFieldOptions.CommitChanges>;
	RegularTime: PXFieldState<PXFieldOptions.Disabled>;
	BillableTime: PXFieldState<PXFieldOptions.Disabled>;
	RegularOvertime: PXFieldState<PXFieldOptions.Disabled>;
	BillableOvertime: PXFieldState<PXFieldOptions.Disabled>;
	RegularTotal: PXFieldState<PXFieldOptions.Disabled>;
	BillableTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Primary,
	initNewRow: true,
	mergeToolbarWith: "",
	actionsConfig: {
		import: { hidden: true }
	}
})
export class PMTimeActivity extends PXView  {
	View: PXActionState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Hold: PXFieldState;

	ApprovalStatus: PXFieldState;

	Date_Date: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }, format: "t" })
	Date_Time: PXFieldState;

	ReportedOnDate_Date: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }, format: "t" })
	ReportedOnDate_Time: PXFieldState;

	@columnConfig({ hideViewLink: true })
	WorkGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EarningTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true })
	ParentTaskNoteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ContractID: PXFieldState;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectDescription: PXFieldState;
	ReportedInTimeZoneID: PXFieldState;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskDescription: PXFieldState;

	@columnConfig({ type: GridColumnType.CheckBox })
	CertifiedJob: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UnionID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LabourItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	WorkCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ShiftID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AppointmentID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AppointmentCustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

	LogLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ServiceID: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeBillable: PXFieldState<PXFieldOptions.CommitChanges>;

	Summary: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ApproverID: PXFieldState;

	TimeCardCD: PXFieldState;
	CRCase__CaseCD: PXFieldState;
	@linkCommand("ViewContract") ContractEx__ContractCD: PXFieldState;
	RefNoteID: PXFieldState;
}
