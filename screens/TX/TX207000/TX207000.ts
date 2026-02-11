import { createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, PXActionState, GridPreset } from "client-controls";

@graphInfo({ graphType: "PX.Objects.TX.TaxYearMaint", primaryView: "TaxYearFilterSelectView" })
export class TX207000 extends PXScreen {

	ViewTaxPeriodDetails: PXActionState;

	TaxYearFilterSelectView = createSingle(TaxYearFilter);
	TaxPeriodExSelectView = createCollection(TaxPeriod);

}

export class TaxYearFilter extends PXView {

	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	Year: PXFieldState<PXFieldOptions.CommitChanges>;
	ShortTaxYear: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxPeriodType: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
})
export class TaxPeriod extends PXView {

	TaxPeriodID: PXFieldState;
	StartDateUI: PXFieldState;
	EndDateUI: PXFieldState;
	Status: PXFieldState;
	@linkCommand("ViewTaxPeriodDetails")
	NetTaxAmt: PXFieldState;

	// Actions

	AddPeriod: PXActionState;
	DeletePeriod: PXActionState;

}
