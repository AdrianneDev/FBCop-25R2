import {
	PXScreen, graphInfo, PXView, createCollection, createSingle,
	PXFieldState, CurrencyInfo, controlConfig, PXFieldOptions, gridConfig, GridPreset, columnConfig, PXActionState,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.TX.TaxAdjustmentEntry", primaryView: "Document",
	udfTypeField: "DocType", showUDFIndicator: true, bpEventsIndicator: true, showActivitiesIndicator: true,
})
export class TX301000 extends PXScreen {

	ViewBatch: PXActionState;
	ViewOriginalDocument: PXActionState;
	NewVendor: PXActionState;
	EditVendor: PXActionState;
	CurrencyView: PXActionState;

	Document = createSingle(TaxAdjustment);
	Transactions = createCollection(TaxTran);
	CurrentDocument = createSingle(TaxAdjustment2);
	CurrencyInfo = createSingle(CurrencyInfo);
}

export class TaxAdjustment extends PXView {

	DocType: PXFieldState;
	RefNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxPeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ rows: 2 })
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;

	CuryDocBal: PXFieldState<PXFieldOptions.Disabled>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class TaxAdjustment2 extends PXView {

	@controlConfig({ allowEdit: true })
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjSubID: PXFieldState;

	@controlConfig({ linkCommand: "ViewOriginalDocument" })
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Details })
export class TaxTran extends PXView {

	@columnConfig({hideViewLink: true})
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;
	CuryTaxAmt: PXFieldState;

	@columnConfig({hideViewLink: true})
	TaxZoneID: PXFieldState;

	@columnConfig({hideViewLink: true})
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({hideViewLink: true})
	SubID: PXFieldState;

	Description: PXFieldState;

}
