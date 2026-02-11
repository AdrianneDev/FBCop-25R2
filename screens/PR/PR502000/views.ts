import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnType,
	PXActionState,
	TextAlign,
	GridPreset,
	GridAutoGrowMode
} from "client-controls";

export class PRTaxFormsFilter extends PXView  {
	TaxForm: PXFieldState<PXFieldOptions.CommitChanges>;
	Year: PXFieldState<PXFieldOptions.CommitChanges>;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProvinceOfEmployment: PXFieldState<PXFieldOptions.CommitChanges>;
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
	DocType: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeUnreleasedPaychecks: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class PREmployee extends PXView  {
	ViewDiscrepancies: PXActionState;

	BAccountID: PXFieldState;

	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AcctCD: PXFieldState;

	AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ParentBAccountID: PXFieldState;

	PayGroupName: PXFieldState;

	@linkCommand("ViewTaxFormBatch")
	PublishedFrom: PXFieldState;

	DocType: PXFieldState;
	BatchID: PXFieldState;

	@columnConfig({ type: GridColumnType.CheckBox })
	HasDiscrepancies: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class PRTaxFormDiscrepancy extends PXView  {
	@columnConfig({ width: 240 })
	EmployeeID: PXFieldState;

	@columnConfig({ width: 240 })
	Box: PXFieldState;

	@columnConfig({ width: 120 })
	OldValue: PXFieldState;

	@columnConfig({ width: 120 })
	NewValue: PXFieldState;
}
