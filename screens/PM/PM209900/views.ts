import {
	columnConfig,
	gridConfig,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset
} from "client-controls";

export class Filter extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnionID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Items extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UnionID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID_description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	EmploymentType: PXFieldState<PXFieldOptions.CommitChanges>;
	RegularHours: PXFieldState<PXFieldOptions.CommitChanges>;
	AnnualSalary: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	WageRate: PXFieldState<PXFieldOptions.CommitChanges>;
	Rate: PXFieldState<PXFieldOptions.CommitChanges>;
	BurdenRate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;
	ExtRefNbr: PXFieldState;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
}
