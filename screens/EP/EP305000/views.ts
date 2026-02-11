import {
	PXView,
	PXFieldState,
	gridConfig,
	controlConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnType,
	PXActionState,
	TextAlign,
	GridPreset,
	GridColumnDisplayMode,
	GridFastFilterVisibility
} from "client-controls";

export class EPTimeCard extends PXView {
	ViewOrigTimecard: PXActionState;

	TimeCardCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ displayMode: "text" })
	WeekID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ displayMode: "text" })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;

	TimecardType: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ linkCommand: "ViewOrigTimecard" })
	OrigTimecardCD: PXFieldState<PXFieldOptions.Disabled>;
	TimeSpentCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableCalc: PXFieldState<PXFieldOptions.Disabled>;
	OvertimeSpentCalc: PXFieldState<PXFieldOptions.Disabled>;
	OvertimeBillableCalc: PXFieldState<PXFieldOptions.Disabled>;
	TotalSpentCalc: PXFieldState<PXFieldOptions.Disabled>;
	TotalBillableCalc: PXFieldState<PXFieldOptions.Disabled>;
	SunTotal: PXFieldState;
	MonTotal: PXFieldState;
	TueTotal: PXFieldState;
	WedTotal: PXFieldState;
	ThuTotal: PXFieldState;
	FriTotal: PXFieldState;
	SatTotal: PXFieldState;
	WeekTotal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowDelete: false,
	allowInsert: false,
	showFastFilter: GridFastFilterVisibility.False
})
export class CRActivity extends PXView {
	@columnConfig({ allowNull: false, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Selected: PXFieldState;

	Subject: PXFieldState;
	ProjectID: PXFieldState;
	ProjectTaskID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	repaintColumns: true
})
export class EPTimeCardSummary extends PXView {
	PreloadFromTimeLog: PXActionState;
	PreloadFromTasks: PXActionState;
	PreloadFromPreviousTimecard: PXActionState;
	PreloadHolidays: PXActionState;
	NormalizeTimecard: PXActionState;

	@columnConfig({ hideViewLink: true })
	EarningType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true })
	ParentNoteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectDescription: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskDescription: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ type: GridColumnType.CheckBox })
	CertifiedJob: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	CostCodeDescription: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	UnionID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WorkCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ShiftID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	Mon: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	Tue: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	Wed: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	Thu: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	Fri: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	Sat: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	Sun: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeSpent: PXFieldState;

	@columnConfig({ type: GridColumnType.CheckBox }) IsBillable: PXFieldState;
	Description: PXFieldState;

	ApprovalStatus: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ApproverID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class PMTimeActivity extends PXView {
	ViewActivity: PXActionState;
	CreateActivity: PXActionState;
	View: PXActionState;
	ViewContract: PXActionState;
	OpenAppointment: PXActionState;

	Date_Date: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WorkGroupID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	EarningTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true })
	ParentTaskNoteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ type: GridColumnType.CheckBox })
	CertifiedJob: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UnionID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WorkCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ShiftID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("OpenAppointment")
	AppointmentID: PXFieldState<PXFieldOptions.CommitChanges>;

	LogLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ServiceID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ReportedInTimeZoneID: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }, format: "t", hideViewLink: true })
	Date_Time: PXFieldState<PXFieldOptions.CommitChanges>;

	ReportedOnDate_Date: PXFieldState;

	@columnConfig({ editorConfig: { timeMode: true }, format: "t" })
	ReportedOnDate_Time: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ type: GridColumnType.CheckBox })
	IsBillable: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	BillableTimeCalc: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	BillableOvertimeCalc: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	Summary: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	RegularTimeCalc: PXFieldState;

	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	OvertimeCalc: PXFieldState;

	OvertimeMultiplierCalc: PXFieldState;
	ApprovalStatus: PXFieldState;
	Day: PXFieldState<PXFieldOptions.CommitChanges>;

	CaseCD: PXFieldState;

	@linkCommand("ViewContract")
	ContractCD: PXFieldState;

	IsActivityExists: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AppointmentCustomerID: PXFieldState;

	IsCreatedFromTimeLog: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	repaintColumns: true
})
export class EPTimeCardItem extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	Mon: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	Tue: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	Wed: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	Thu: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	Fri: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	Sat: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	Sun: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	TotalQty: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowInsert: false
})
export class TimeLog extends PXView {
	ReportedInTimeZoneID: PXFieldState;
	StartDateReported_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t", hideViewLink: true })
	StartDateReported_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDateReported_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true }, format: "t", hideViewLink: true })
	EndDateReported_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ renderEditorText: true, editorType: "qp-time-span" })
	TimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ allowEdit: true, })
	TimeLogTypeID: PXFieldState;
	Summary: PXFieldState;
	RelatedEntityType: PXFieldState;
	@linkCommand("Open")
	DocumentNbr: PXFieldState;
}
