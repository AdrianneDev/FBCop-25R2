import {
	PXView, createSingle, graphInfo, viewInfo, PXScreen, PXActionState, linkCommand, createCollection, controlConfig,
	gridConfig, columnConfig, GridColumnDisplayMode, GridPreset, TextAlign, localizable, GridAutoGrowMode, GridColumnGeneration, fieldConfig,
	actionConfig,
	ISelectorControlConfig,
	PXFieldOptions, PXFieldState
} from "client-controls";
import { PrimaryContact } from "src/screens/CR/common/forms/form-primary-contact/form-primary-contact";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact, DefaultContact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.AR.CustomerMaint", primaryView: "BAccount", showUDFIndicator: true, udfTypeField: "CustomerClassID", bpEventsIndicator: true })
export class AR303000 extends PXScreen {

	@viewInfo({containerName: "Customer Summary"})
	BAccount = createSingle(Customer);

	@viewInfo({containerName: "Current Customer"})
	CurrentCustomer = createSingle(Customer2);

	@viewInfo({containerName: "Customer Summary -> Balance"})
	CustomerBalance = createSingle(CustomerBalance);

	@viewInfo({containerName: "General -> Account Address"})
	DefAddress = createSingle(Address);

	@viewInfo({containerName: "General -> Additional Account Info"})
	DefContact = createSingle(DefaultContact);

	@viewInfo({containerName: "General -> Primary Contact"})
	PrimaryContactCurrent = createSingle(PrimaryContact);

	@viewInfo({containerName: "Billing -> Bill-To Address"})
	BillAddress = createSingle(Address);

	@viewInfo({containerName: "Billing -> Bill-To Info"})
	BillContact = createSingle(Contact);

	@viewInfo({containerName: "Billing -> Default Payment Method"})
	DefPaymentMethodInstance = createSingle(DefPaymentMethodInstance);

	@viewInfo({containerName: "Billing -> Default Payment Method -> Payment Method Details"})
	DefPaymentMethodInstanceDetails = createCollection(DefPaymentMethodInstanceDetails);

	@viewInfo({containerName: "Shipping -> Ship-to Address"})
	DefLocation = createSingle(DefLocation);

	@viewInfo({containerName: "Shipping -> Ship-to Address"})
	DefLocationAddress = createSingle(Address);

	@viewInfo({containerName: "Shipping -> Ship-to Info"})
	DefLocationContact = createSingle(Contact);

	@viewInfo({containerName: "Shipping -> Shipping Instructions -> Carrier Accounts"})
	Carriers = createCollection(Carriers);

	@viewInfo({containerName: "Balances"})
	Balances = createCollection(Balances);

	@viewInfo({containerName: "Payment Methods"})
	PaymentMethods = createCollection(PaymentMethods);

	@viewInfo({containerName: "Salespersons"}) // est. compatibility with Classic UI
	SalesPersons = createCollection(SalesPersons);

	@viewInfo({containerName: "Child Accounts"})
	ChildAccounts = createCollection(ChildAccounts);

	@viewInfo({containerName: "Attributes"})
	Answers = createCollection(Answers);

	//qp-panel
	@viewInfo({containerName: "Generate On-Demand Statement"})
	OnDemandStatementDialog = createSingle(OnDemandStatementDialog);

	@viewInfo({containerName: "Select Company Code"})
	CreateCustomerFilter = createSingle(CreateCustomerFilter);

	@viewInfo({containerName: "Exemption Certificates"})
	ExemptionCertificates = createCollection(ExemptionCertificates);

	@viewInfo({containerName: "Request Certificate"})
	RequestCertificateFilter = createSingle(RequestCertificateFilter);

	ViewMainOnMap: PXActionState;
	ViewRestrictionGroups: PXActionState;
	CustomerDocuments: PXActionState;
	StatementForCustomer: PXActionState;
	NewInvoiceMemo: PXActionState;
	NewSalesOrder: PXActionState;
	NewPayment: PXActionState;
	WriteOffBalance: PXActionState;
	ViewBillAddressOnMap: PXActionState;
	RegenerateLastStatement: PXActionState;
	GenerateOnDemandStatement: PXActionState;
	ARBalanceByCustomer: PXActionState;
	CustomerHistory: PXActionState;
	ARAgedPastDue: PXActionState;
	ARAgedOutstanding: PXActionState;
	ARRegister: PXActionState;
	CustomerDetails: PXActionState;
	CustomerStatement: PXActionState;
	SalesPrice: PXActionState;
	ViewDefLocationAddressOnMap: PXActionState;

	//qp-panel
	ChangeID: PXActionState;

}

export class OnDemandStatementDialog extends PXView {
	StatementDate: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class Answers extends PXView {
	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true })
	AttributeID: PXFieldState;

	isRequired: PXFieldState;

	@columnConfig({ allowSort: false })
	Value: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class ChildAccounts extends PXView {
	CustomerID: PXFieldState;
	CustomerName: PXFieldState;
	BaseCuryID: PXFieldState;
	Balance: PXFieldState;
	SignedDepositsBalance: PXFieldState;
	UnreleasedBalance: PXFieldState;
	OpenOrdersBalance: PXFieldState;
	OldInvoiceDate: PXFieldState;
	ConsolidateToParent: PXFieldState;
	ConsolidateStatements: PXFieldState;
	SharedCreditPolicy: PXFieldState;

	@columnConfig({ hideViewLink: true })
	StatementCycleId: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class SalesPersons extends PXView {
	SalesPersonID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesPersonID_SalesPerson_descr: PXFieldState;

	@linkCommand("ViewLocation")
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	LocationID_description: PXFieldState;
	CommisionPct: PXFieldState;
	IsDefault: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class PaymentMethods extends PXView {
	@actionConfig({ popupCommand: "cancel" })
	AddPaymentMethod: PXActionState;

	@actionConfig({ popupCommand: "cancel" })
	ViewPaymentMethod: PXActionState;

	IsDefault: PXFieldState;
	AvailableOnPortals: PXFieldState;
	IsPortalDefault: PXFieldState;
	PaymentMethodID: PXFieldState;
	Descr: PXFieldState;
	CashAccountID: PXFieldState;
	IsActive: PXFieldState;
	IsCustomerPaymentMethod: PXFieldState;
	ExpirationDate: PXFieldState;
	CCProcessingCenterID: PXFieldState;
	CreatedDateTime: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class Balances extends PXView {
	BaseCuryID: PXFieldState;
	CurrentBal: PXFieldState;
	TotalPrepayments: PXFieldState;
	ConsolidatedBalance: PXFieldState;
	RetainageBalance: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
	quickFilterFields: ["CustomerID", "CustomerID_description", "CarrierAccount", "CustomerLocationID"]
})
export class Carriers extends PXView {

	IsActive: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CarrierPluginID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CarrierBillingType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CarrierAccount: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CountryID: PXFieldState;

	PostalCode: PXFieldState;
	CustomerID: PXFieldState;
	CustomerID_description: PXFieldState;
}

export class DefLocation extends PXView {
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CBranchID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CPriceClassID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CDefProjectID: PXFieldState;

	TaxRegistrationID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CTaxZoneID: PXFieldState;

	CTaxCalcMode: PXFieldState;
	CAvalaraExemptionNumber: PXFieldState;
	CAvalaraCustomerUsageType: PXFieldState;

	@controlConfig({ allowEdit: true })
	CSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CCarrierID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CShipTermsID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CShipZoneID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CFOBPointID: PXFieldState;

	CResedential: PXFieldState;
	CSaturdayDelivery: PXFieldState;
	CInsurance: PXFieldState;
	CAdditionalHandling: PXFieldState;
	CLiftGate: PXFieldState;
	CInsideDelivery: PXFieldState;
	CLimitedAccess: PXFieldState;
	CShipComplete: PXFieldState;
	COrderPriority: PXFieldState;

	@fieldConfig({
		controlType: "qp-number-editor",
		controlConfig: {
			nullText: "0",
		}
	})
	CLeadTime: PXFieldState;

	@controlConfig({ allowEdit: true })
	CCalendarID: PXFieldState;

	CARAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CARSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CSalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CSalesSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CDiscountAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CDiscountSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CFreightAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CFreightSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	CRetainageAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CRetainageSubID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoGrowInHeight: GridAutoGrowMode.Fit,
})
export class DefPaymentMethodInstanceDetails extends PXView {
	DetailID_PaymentMethodDetail_descr: PXFieldState;
	Value: PXFieldState;
}

export class DefPaymentMethodInstance extends PXView {
	CCProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerCCPID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
}

export class Customer extends PXView {

	@controlConfig({ displayMode: "id" })
	AcctCD: PXFieldState<PXFieldOptions.CommitChanges>;

	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	CustomerCategory: PXFieldState<PXFieldOptions.CommitChanges>;
}
export class Customer2 extends PXView {

	@controlConfig({ allowEdit: true })
	TermsID: PXFieldState;

	@controlConfig({ allowEdit: true })
	StatementCycleId: PXFieldState<PXFieldOptions.CommitChanges>;

	AcctName: PXFieldState<PXFieldOptions.CommitChanges>;

	COrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoApplyPayments: PXFieldState;
	FinChargeApply: PXFieldState;
	SmallBalanceAllow: PXFieldState<PXFieldOptions.CommitChanges>;
	SmallBalanceLimit: PXFieldState;
	SmallBalanceLimit_Label: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOverrideCury: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryRateTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOverrideRate: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentsByLinesAllowed: PXFieldState;
	RetainageApply: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainagePct: PXFieldState<PXFieldOptions.CommitChanges>;
	CreditRule: PXFieldState<PXFieldOptions.CommitChanges>;
	CreditLimit_Label: PXFieldState;
	CreditLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	CreditDaysPastDue: PXFieldState;

	@controlConfig({ allowEdit: true })
	ParentBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	ConsolidateToParent: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsolidateStatements: PXFieldState<PXFieldOptions.CommitChanges>;
	SharedCreditPolicy: PXFieldState<PXFieldOptions.CommitChanges>;
	MailInvoices: PXFieldState;
	PrintInvoices: PXFieldState<PXFieldOptions.CommitChanges>;
	MailDunningLetters: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintDunningLetters: PXFieldState<PXFieldOptions.CommitChanges>;
	SendStatementByEmail: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintStatements: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementType: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintCuryStatements: PXFieldState<PXFieldOptions.CommitChanges>;
	RequireCustomerSignature: PXFieldState;

	BillingCycleID: PXFieldState<PXFieldOptions.CommitChanges>;
	SendInvoicesTo: PXFieldState;
	BillShipmentSource: PXFieldState;
	DefaultBillingCustomerSource: PXFieldState<PXFieldOptions.CommitChanges>;
	BillCustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillLocationID: PXFieldState;

	AcctReferenceNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	LocaleName: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideBillAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideBillContact: PXFieldState<PXFieldOptions.CommitChanges>;
	DefPaymentMethodID: PXFieldState;
	SuggestRelatedItems: PXFieldState<PXFieldOptions.CommitChanges>;

	DiscTakenAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscTakenSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	COGSAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	LegalName: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	ChkServiceManagement: PXFieldState;

	@controlConfig<ISelectorControlConfig>({ allowEdit: true, addCommand: "AddNewPrimaryContact" })
	PrimaryContactID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CustomerBalance extends PXView {

	Balance: PXFieldState;
	ConsolidatedBalance: PXFieldState;
	SignedDepositsBalance: PXFieldState;
	RetainageBalance: PXFieldState;

	Balance_Label: PXFieldState;
	ConsolidatedBalance_Label: PXFieldState;
	SignedDepositsBalance_Label: PXFieldState;
	RetainageBalance_Label: PXFieldState;

	UnreleasedBalance: PXFieldState;
	UnreleasedBalance_Label: PXFieldState;
	OpenOrdersBalance: PXFieldState;
	OpenOrdersBalance_Label: PXFieldState;
	RemainingCreditLimit: PXFieldState;
	RemainingCreditLimit_Label: PXFieldState;
	OldInvoiceDate: PXFieldState;
}

export class CreateCustomerFilter extends PXView {
	CompanyCode: PXFieldState;
}

@localizable
export class CommandTextValues {
	static RequestCertificate = "Request Certificate";
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	actionsConfig: { refresh: { hidden: true } },
	topBarItems: {
		RequestCertificate: {
			config: {
				commandName: "RequestCertificate",
				text: CommandTextValues.RequestCertificate
			},
		},
		RefreshCertificates: {
			config: {
				imageSet: "main",
				imageKey: "Refresh",
				commandName: "RefreshCertificates",
			},
		}
	}
})
export class ExemptionCertificates extends PXView {

	RefreshCertificates: PXActionState;
	RequestCertificate: PXActionState;

	@columnConfig({ textAlign: TextAlign.Center })
	CertificateID: PXFieldState;

	State: PXFieldState;
	ExemptionReason: PXFieldState;
	EffectiveDate: PXFieldState;
	ExpirationDate: PXFieldState;
	Status: PXFieldState;
	CompanyCode: PXFieldState;
}

export class RequestCertificateFilter extends PXView {

	CompanyCode: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailId: PXFieldState<PXFieldOptions.CommitChanges>;
	Template: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState<PXFieldOptions.CommitChanges>;
	ExemptReason: PXFieldState;
}
