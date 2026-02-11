import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	columnConfig,
	gridConfig,
	GridPreset,
	GridAutoGrowMode
} from "client-controls";

export class Filter extends PXView {
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	autoRepaint: ["WorkCompensationRates", "ProjectTaskSources", "LaborItemSources", "CostCodeRanges"],
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class WorkCompensationCodes extends PXView {
	ViewMaximumInsurableWages: PXActionState;

	IsActive: PXFieldState;
	WorkCodeID: PXFieldState<PXFieldOptions.CommitChanges>; // there is no commit changes here in the old UI but I have to add it here to fix rollback of entered data in tests
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true
})
export class WorkCompensationRates extends PXView {
	IsActive: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DeductCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	DeductionCalcType: PXFieldState;
	PRDeductCode__CntCalcType: PXFieldState;

	@columnConfig({ width: 110, hideViewLink: true })
	PRDeductCode__State: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	DeductionRate: PXFieldState;
	Rate: PXFieldState;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pageSize: 200,
	adjustPageSize: true,
})
export class ProjectTaskSources extends PXView {
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pageSize: 200,
	adjustPageSize: true,
})
export class LaborItemSources extends PXView {
	@columnConfig({ hideViewLink: true })
	LaborItemID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	pageSize: 200,
	adjustPageSize: true,
})
export class PMWorkCodeCostCodeRange extends PXView {
	@columnConfig({ hideViewLink: true })
	CostCodeFrom: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeTo: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowInsert: true,
	allowDelete: true,
	initNewRow: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class MaximumInsurableWages extends PXView {
	@columnConfig({ hideViewLink: true })
	DeductCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	State__StateID: PXFieldState;
	MaximumInsurableWage: PXFieldState;
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
}
