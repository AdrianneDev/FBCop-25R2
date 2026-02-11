import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, controlConfig, columnConfig, PXFieldOptions, createCollection, linkCommand,
	gridConfig, GridPreset, GridColumnShowHideMode, PXActionState,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.VendorClassMaint", primaryView: "VendorClassRecord" })
export class AP201000 extends PXScreen {

	CRAttribute_ViewDetails: PXActionState;

	VendorClassRecord = createSingle(VendorClass);
	CurVendorClassRecord = createSingle(VendorClass2);
	Mapping = createCollection(CSAttributeGroupList);
	LienWaiverRecipientProjects = createCollection(LienWaiverRecipient);
}

export class VendorClass extends PXView {
	VendorClassID: PXFieldState;
	Descr: PXFieldState;
	LocaleName: PXFieldState;
}

export class VendorClass2 extends PXView {
	// General
	CountryID: PXFieldState;
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	TaxZoneID: PXFieldState;
	RequireTaxZone: PXFieldState;
	TaxCalcMode: PXFieldState;
	DefaultLocationCDFromBranch: PXFieldState;
	GroupMask: PXFieldState;

	// Purchasing
	@controlConfig({ allowEdit: true })
	ShipTermsID: PXFieldState;
	RcptQtyAction: PXFieldState;

	//Financial
	@controlConfig({ allowEdit: true })
	TermsID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CashAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	PaymentByType: PXFieldState;
	CuryID: PXFieldState;
	AllowOverrideCury: PXFieldState;
	CuryRateTypeID: PXFieldState;
	AllowOverrideRate: PXFieldState;
	PaymentsByLinesAllowed: PXFieldState;
	RetainageApply: PXFieldState;

	// Email and Printing settings
	PrintPO: PXFieldState;
	EmailPO: PXFieldState;

	ShouldGenerateLienWaivers: PXFieldState;

	// GL Accounts

	APAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	APSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscTakenAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscTakenSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrebookAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrebookSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnrealizedGainAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnrealizedGainSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnrealizedLossAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnrealizedLossSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainageSubID: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Details })
export class CSAttributeGroupList extends PXView {

	IsActive: PXFieldState;

	@linkCommand("CRAttribute_ViewDetails")
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;
	SortOrder: PXFieldState;
	Required: PXFieldState;
	CSAttribute__IsInternal: PXFieldState;
	ControlType: PXFieldState;
	DefaultValue: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly })
export class LienWaiverRecipient extends PXView {

	@columnConfig({ allowSort: false, allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMProject__ContractCD: PXFieldState;

	PMProject__Description: PXFieldState;

	PMProject__Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMProject__CustomerID: PXFieldState;

	PMProject__CustomerID_Customer_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PMProject__CuryID: PXFieldState;

	MinimumCommitmentAmount: PXFieldState;
}
