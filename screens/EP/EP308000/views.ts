import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	columnConfig,
	controlConfig,
	gridConfig,
	GridPreset
} from "client-controls";

export class Document extends PXView {
	ViewOrigTimecard: PXActionState;

	TimeCardCD: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	WeekID: PXFieldState<PXFieldOptions.CommitChanges>;
	EquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	TimecardType: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ linkCommand: "ViewOrigTimecard" })
	OrigTimecardCD: PXFieldState<PXFieldOptions.Disabled>;
	TimeTotalCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableTotalCalc: PXFieldState<PXFieldOptions.Disabled>;
	SunTotal: PXFieldState;
	MonTotal: PXFieldState;
	TueTotal: PXFieldState;
	WedTotal: PXFieldState;
	ThuTotal: PXFieldState;
	FriTotal: PXFieldState;
	SatTotal: PXFieldState;
	WeekTotal: PXFieldState;
}

export class DocumentProperties extends PXView {
	TimeSetupCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableSetupCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeRunCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableRunCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeSuspendCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableSuspendCalc: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: true,
	allowUpdate: true,
	allowDelete: true,
	initNewRow: true,
	repaintColumns: true
})
export class Summary extends PXView {
	PreloadFromPreviousTimecard: PXActionState;
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.NoLabel>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	RateType: PXFieldState<PXFieldOptions.CommitChanges>;
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
	IsBillable: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Details extends PXView {
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	SetupTime: PXFieldState<PXFieldOptions.CommitChanges>;
	RunTime: PXFieldState<PXFieldOptions.CommitChanges>;
	SuspendTime: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState;
	Description: PXFieldState;
}
