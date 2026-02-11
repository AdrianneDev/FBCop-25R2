import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnShowHideMode,
	headerDescription,
	CurrencyInfo,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.PO.POLandedCostDocEntry",
	primaryView: "Document",
	bpEventsIndicator: true,
	udfTypeField: "",
	showActivitiesIndicator: true,
})
export class PO303000 extends PXScreen {
	AddLC: PXActionState;

	@viewInfo({ containerName: "Document Summary" })
	Document = createSingle(POLandedCostDocHeader);

	@viewInfo({ containerName: "Billing Settings" })
	CurrentDocument = createSingle(POLandedCostDoc);

	@viewInfo({ containerName: "Landed Costs" })
	Details = createCollection(POLandedCostDetail);

	@viewInfo({ containerName: "Details" })
	ReceiptLines = createCollection(POLandedCostReceiptLine);

	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(POLandedCostTaxTran);

	@viewInfo({ containerName: "Currency Info" })
	CurrencyInfo = createSingle(CurrencyInfo);
}

export class POLandedCostDocHeader extends PXView {
	RefNbr: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateBill: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAllocatedTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryLineTotal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryVatTaxableTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryVatExemptTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDocTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryControlTotal: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class POLandedCostDoc extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	TermsID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState;
	DiscDate: PXFieldState;
	CuryDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayToVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	adjustPageSize: true,
})
export class POLandedCostDetail extends PXView {
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	LandedCostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	Descr: PXFieldState;
	AllocationMethod: PXFieldState;
	CuryLineAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	APDocType: PXFieldState;
	APRefNbr: PXFieldState;
	INDocType: PXFieldState;
	INRefNbr: PXFieldState;
	LineNbr: PXFieldState;
	SortOrder: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	adjustPageSize: true,
})
export class POLandedCostReceiptLine extends PXView {
	AddPOReceipt: PXActionState;
	AddPOReceiptLine: PXActionState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server, hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	LineNbr: PXFieldState;
	SortOrder: PXFieldState;

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	ReceiptQty: PXFieldState;
	ExtWeight: PXFieldState;
	ExtVolume: PXFieldState;
	LineAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	POReceiptBaseCuryID: PXFieldState;

	CuryAllocatedLCAmt: PXFieldState;
	POReceiptNbr: PXFieldState;
	POReceiptLineNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class POLandedCostTaxTran extends PXView {
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxRate: PXFieldState;
	CuryTaxableAmt: PXFieldState;
	CuryTaxAmt: PXFieldState;
}
