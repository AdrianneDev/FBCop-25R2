import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridPreset, controlConfig,
	GridAutoGrowMode,
} from "client-controls";

// Views

export class Location extends PXView {

	@controlConfig({ allowEdit: true })
	BAccountID: PXFieldState;

	@controlConfig({displayMode: "id"})
	LocationCD: PXFieldState;

	Status: PXFieldState;
	IsDefault: PXFieldState;
}

export class Location2 extends PXView {
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true, displayMode: "both" })
	VBranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	VPrintOrder: PXFieldState;
	VEmailOrder: PXFieldState;
	OverrideRemitAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideRemitContact: PXFieldState<PXFieldOptions.CommitChanges>;
	IsAPPaymentInfoSameAsMain: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRegistrationID: PXFieldState;

	@controlConfig({ allowEdit: true })
	VTaxZoneID: PXFieldState;

	VTaxCalcMode: PXFieldState;
	VAllowAPBillBeforeReceipt: PXFieldState;
	VRcptQtyMin: PXFieldState;
	VRcptQtyMax: PXFieldState;
	VRcptQtyThreshold: PXFieldState;
	VRcptQtyAction: PXFieldState;

	@controlConfig({ allowEdit: true })
	VSiteID: PXFieldState;

	@controlConfig({ allowEdit: true })
	VCarrierID: PXFieldState;

	@controlConfig({ allowEdit: true })
	VShipTermsID: PXFieldState;

	@controlConfig({ allowEdit: true })
	VFOBPointID: PXFieldState;

	VLeadTime: PXFieldState;
	IsAPAccountSameAsMain: PXFieldState<PXFieldOptions.CommitChanges>;
	VExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	VExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	VDiscountAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	VDiscountSubID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class LocationAPPaymentInfo extends PXView {

	@controlConfig({ allowEdit: true })
	VPaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	VPaymentByType: PXFieldState;
	VPaymentLeadTime: PXFieldState;
	VSeparateCheck: PXFieldState;
}
@gridConfig({
	preset: GridPreset.Attributes,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	allowSort: false,
})
export class VendorPaymentMethodDetail extends PXView {
	@columnConfig({ allowUpdate: false })
	PaymentMethodDetail__descr: PXFieldState;
	@columnConfig({ allowUpdate: false, allowShowHide: GridColumnShowHideMode.False })
	DetailValue: PXFieldState;
}

export class LocationAPAccountSub extends PXView {
	VAPAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	VAPSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	VRetainageAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	VRetainageSubID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class LocationBranchSettings extends PXView {
	@controlConfig({ allowEdit: true })
	VSiteID: PXFieldState;
}
