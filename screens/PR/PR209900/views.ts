import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	GridPreset,
	GridAutoGrowMode
} from "client-controls";

export class CertifiedProjectFilter extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class PMLaborCostRate extends PXView {
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	Description: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	TaskID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	WageRate: PXFieldState;

	@columnConfig({ allowUpdate: false })
	EffectiveDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class PRDeductionAndBenefitProjectPackage extends PXView {
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	DeductionAndBenefitCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	LaborItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	PRDeductCode__Description: PXFieldState;

	@columnConfig({ allowUpdate: false })
	PRDeductCode__ContribType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	PRDeductCode__DedCalcType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	DeductionAmount: PXFieldState;

	@columnConfig({ allowUpdate: false })
	DeductionRate: PXFieldState;

	@columnConfig({ allowUpdate: false })
	PRDeductCode__CntCalcType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	BenefitAmount: PXFieldState;

	@columnConfig({ allowUpdate: false })
	BenefitRate: PXFieldState;

	@columnConfig({ allowUpdate: false })
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class Contract extends PXView {
	Status: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled>;
	FileEmptyCertifiedReport: PXFieldState;
	WageAbovePrevailingAnnualizationException: PXFieldState;
	ApplyOTMultiplierToFringeRate: PXFieldState;
	BenefitCodeReceivingFringeRate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class PRProjectFringeBenefitRate extends PXView {
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	LaborItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	InventoryItem__Descr: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	Rate: PXFieldState;

	@columnConfig({ allowUpdate: false })
	EffectiveDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class PRProjectFringeBenefitRateReducingDeduct extends PXView {
	@columnConfig({ allowUpdate: false })
	IsActive: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	DeductCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	DeductCodeID_Description: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	PRDeductCode__CertifiedReportType: PXFieldState;

	@columnConfig({ allowUpdate: false })
	AnnualizationException: PXFieldState;
}
