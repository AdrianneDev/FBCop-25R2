import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig,
	GridColumnShowHideMode, GridPreset, GridAutoGrowMode, controlConfig, ISelectorControlConfig,
} from "client-controls";

// Views

@gridConfig({ preset: GridPreset.ReadOnly })
export class Vendor extends PXView {

	@columnConfig({ allowUpdate: false })
	AcctName: PXFieldState<PXFieldOptions.CommitChanges>;

	LegalName: PXFieldState<PXFieldOptions.CommitChanges>;
	AcctReferenceNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	ParentBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	LocaleName: PXFieldState<PXFieldOptions.CommitChanges>;
	LandedCostVendor: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxAgency: PXFieldState<PXFieldOptions.CommitChanges>;
	Vendor1099: PXFieldState<PXFieldOptions.CommitChanges>;
	Box1099: PXFieldState;
	ForeignEntity: PXFieldState;
	FATCA: PXFieldState;
	SDEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorDefaultCostCodeId: PXFieldState;

	@controlConfig({ allowEdit: true, displayMode: "both" })
	VendorDefaultInventoryId: PXFieldState;

	@controlConfig({ allowEdit: true })
	TermsID: PXFieldState;

	VOrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	AllowOverrideCury: PXFieldState;
	CuryRateTypeID: PXFieldState;
	AllowOverrideRate: PXFieldState;
	RetainageApply: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	ShouldGenerateLienWaivers: PXFieldState;
	TinType: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscTakenAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscTakenSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrebookAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrebookSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesTaxSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchTaxAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchTaxSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	SVATReversalMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	SVATInputTaxEntryRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SVATOutputTaxEntryRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SVATTaxInvoiceNumberingID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxPeriodType: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxReportFinPeriod: PXFieldState;
	UpdClosedTaxPeriods: PXFieldState;
	AutoGenerateTaxBill: PXFieldState;
	TaxReportRounding: PXFieldState;
	TaxReportPrecision: PXFieldState;
	TaxUseVendorCurPrecision: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	PayToVendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	PaymentsByLinesAllowed: PXFieldState;

	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "AddNewPrimaryContact" })
	PrimaryContactID: PXFieldState<PXFieldOptions.CommitChanges>;
}


@gridConfig({ preset: GridPreset.ReadOnly })
export class Vendor_SuppliedByVendors extends PXView {

	AcctCD: PXFieldState<PXFieldOptions.CommitChanges>;
	AcctName: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class VendorBAccount extends PXView {

	@linkCommand("viewDetails")
	@columnConfig({ allowUpdate: false })
	@controlConfig({ displayMode: "id" })
	AcctCD: PXFieldState;

	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	VStatus: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class VendorBalanceSummary extends PXView {
	Balance: PXFieldState;
	Balance_Label: PXFieldState;
	DepositsBalance: PXFieldState;
	DepositsBalance_Label: PXFieldState;
	RetainageBalance: PXFieldState;
	RetainageBalance_Label: PXFieldState;
}

export class Location extends PXView {

	@columnConfig({ allowUpdate: false })
	IsActive: PXFieldState;

	@linkCommand("ViewLocation")
	@columnConfig({ allowUpdate: false })
	LocationCD: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Descr: PXFieldState;

	@columnConfig({ allowUpdate: false })
	IsDefault: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Address__City: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	Address__State: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	Address__CountryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	VExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VTaxZoneID: PXFieldState;

	OverrideRemitAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideRemitContact: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VPaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	VPaymentByType: PXFieldState;
	VPaymentLeadTime: PXFieldState;
	VSeparateCheck: PXFieldState;
	VPrepaymentPct: PXFieldState;
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VBranchID: PXFieldState;

	VPrintOrder: PXFieldState;
	VEmailOrder: PXFieldState;
	TaxRegistrationID: PXFieldState;
	VTaxCalcMode: PXFieldState;

	@controlConfig({ allowEdit: true })
	VSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VCarrierID: PXFieldState;

	@controlConfig({ allowEdit: true })
	VShipTermsID: PXFieldState;

	@controlConfig({ allowEdit: true })
	VFOBPointID: PXFieldState;

	VLeadTime: PXFieldState;
	VAllowAPBillBeforeReceipt: PXFieldState;
	VRcptQtyMin: PXFieldState;
	VRcptQtyMax: PXFieldState;
	VRcptQtyThreshold: PXFieldState;
	VRcptQtyAction: PXFieldState;
	VAPAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	VAPSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	VDiscountAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	VDiscountSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	VRetainageAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	VRetainageSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	Address__PostalCode: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Address__State_description: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Address__CountryID_description: PXFieldState;

	@columnConfig({ allowUpdate: false })
	VBranchID_description: PXFieldState;

	@columnConfig({ allowUpdate: false })
	CreatedByID_Description: PXFieldState;

	@columnConfig({ allowUpdate: false })
	CreatedDateTime: PXFieldState;

	@columnConfig({ allowUpdate: false })
	LastModifiedByID_Description: PXFieldState;

	@columnConfig({ allowUpdate: false })
	LastModifiedDateTime: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Address__Department: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__StreetName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__BuildingName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__Floor: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__PostBox: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__Room: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowUpdate: false })
	Address__DistrictName: PXFieldState<PXFieldOptions.Hidden>;

}

export class LocationBranchSettings extends PXView {
	@controlConfig({ allowEdit: true })
	VSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Attributes, autoGrowInHeight: GridAutoGrowMode.Fit })
export class VendorPaymentMethodDetail extends PXView {
	@columnConfig({ allowUpdate: false })
	PaymentMethodDetail__descr: PXFieldState;
	@columnConfig({ allowUpdate: false })
	DetailValue: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class VendorBalanceSummaryByBaseCurrency extends PXView {
	@columnConfig({ allowUpdate: false })
	BaseCuryID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Balance: PXFieldState;
	@columnConfig({ allowUpdate: false })
	DepositsBalance: PXFieldState;
	@columnConfig({ allowUpdate: false })
	RetainageBalance: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class CSAnswers extends PXView {
	@columnConfig({ allowUpdate: false, allowShowHide: GridColumnShowHideMode.False, textField: "AttributeID_description", hideViewLink: true })
	AttributeID: PXFieldState;
	@columnConfig({ allowUpdate: false })
	isRequired: PXFieldState;
	@columnConfig({ allowUpdate: false, allowShowHide: GridColumnShowHideMode.False, allowSort: false })
	Value: PXFieldState;
}
