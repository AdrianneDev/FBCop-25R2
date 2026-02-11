import {
    createCollection,
    createSingle,
    PXScreen,
    graphInfo,
    PXView,
    PXFieldState,
    gridConfig,
    PXFieldOptions,
    linkCommand,
    columnConfig,
    GridColumnShowHideMode,
    PXActionState,
    GridPreset,
    localizable,
    controlConfig,
    fieldConfig,
    viewInfo,
} from "client-controls";

@graphInfo({
    graphType: "PX.Objects.CT.ContractMaint",
    primaryView: "Contracts",
    showActivitiesIndicator: true,
    bpEventsIndicator: true,
})
export class CT301000 extends PXScreen {
    @localizable
	static AllEmployees = "All Employees";

    ShowContact: PXActionState;
    ViewInvoice: PXActionState;
    ViewContract: PXActionState;

    @viewInfo({containerName: "Contract Info"})
    Contracts = createSingle(Contract);

    @viewInfo({containerName: "Set Up Contract"})
    SetupSettings = createSingle(SetupSettingsFilter);

    @viewInfo({containerName: "Activate Contract"})
    ActivationSettings = createSingle(ActivationSettingsFilter);

    @viewInfo({containerName: "Terminate Contract"})
    TerminationSettings = createSingle(TerminationSettingsFilter);

    @viewInfo({containerName: "Billing On Demand"})
    OnDemandSettings = createSingle(BillingOnDemandSettingsFilter);

    @viewInfo({containerName: "Renew Contract"})
    RenewalSettings = createSingle(RenewalSettingsFilter);

    @viewInfo({containerName: "Current Contract"})
    CurrentContract = createSingle(Contract2);

    @viewInfo({containerName: "Summary -> Billing Schedule"})
    Billing = createSingle(ContractBillingSchedule);

    @viewInfo({containerName: "Summary -> Billing Information -> Shipping Branch"})
    BillingLocation = createSingle(Location);

    // split DAC into 2 classes to allow different columns set for dirrerent grids
    @viewInfo({containerName: "Details"})
    ContractDetails = createCollection(ContractDetail);

    @viewInfo({containerName: "Recurring Summary"})
    RecurringDetails = createCollection(ContractDetail2);

    @viewInfo({containerName: "Employee Overrides"})
    ContractRates = createCollection(EPContractRate);

    @viewInfo({containerName: "Contract History"})
    RenewalHistory = createCollection(ContractRenewalHistory);

    @viewInfo({containerName: "AR History"})
    Invoices = createCollection(ARInvoice);

    @viewInfo({containerName: "Attributes"})
    Answers = createCollection(CSAnswers);

    @viewInfo({containerName: "Please enter new Contract ID"})
    renewManualNumberingFilter = createSingle(RenewManualNumberingFilter);

}

export class Contract extends PXView {
	ContractCD: PXFieldState;

    @controlConfig({ allowEdit: true })
    TemplateID: PXFieldState<PXFieldOptions.CommitChanges>;

    Status: PXFieldState;

    @controlConfig({ allowEdit: true })
    CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

    @controlConfig({ allowEdit: true })
    LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

    Description: PXFieldState;
    Balance: PXFieldState;
}

export class Contract2 extends PXView {
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ActivationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpireDate: PXFieldState<PXFieldOptions.CommitChanges>;
	TerminationDate: PXFieldState;
	AutoRenew: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoRenewDays: PXFieldState;
	DaysBeforeExpiration: PXFieldState<PXFieldOptions.Disabled>;
	GracePeriod: PXFieldState;
	Days: PXFieldState<PXFieldOptions.Disabled>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;

    @controlConfig({ allowEdit: true })
    OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;

    @controlConfig({ allowEdit: true })
    SalesPersonID: PXFieldState;

    @controlConfig({ allowEdit: true })
    CaseItemID: PXFieldState;

    EffectiveFrom: PXFieldState;
    DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;
    PendingSetup: PXFieldState<PXFieldOptions.Disabled>;
    PendingRecurring: PXFieldState<PXFieldOptions.Disabled>;
    PendingRenewal: PXFieldState<PXFieldOptions.Disabled>;
    TotalPending: PXFieldState<PXFieldOptions.Disabled>;
    CurrentSetup: PXFieldState<PXFieldOptions.Disabled>;
    CurrentRecurring: PXFieldState<PXFieldOptions.Disabled>;
    CurrentRenewal: PXFieldState<PXFieldOptions.Disabled>;
    TotalRecurring: PXFieldState<PXFieldOptions.Disabled>;
    TotalUsage: PXFieldState<PXFieldOptions.Disabled>;
    TotalDue: PXFieldState<PXFieldOptions.Disabled>;
}

export class SetupSettingsFilter extends PXView {
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ActivationSettingsFilter extends PXView {
	ActivationDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class TerminationSettingsFilter extends PXView {
	TerminationDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class BillingOnDemandSettingsFilter extends PXView {
	BillingDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class RenewalSettingsFilter extends PXView {
	RenewalDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ContractBillingSchedule extends PXView {
	StartBilling: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	LastDate: PXFieldState;
	NextDate: PXFieldState;
	BillTo: PXFieldState<PXFieldOptions.CommitChanges>;

    @controlConfig({ allowEdit: true })
    AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
    LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({ controlType: "qp-formula-editor" })
    InvoiceFormula: PXFieldState;

	@fieldConfig({ controlType: "qp-formula-editor" })
    TranFormula: PXFieldState;
}

export class Location extends PXView {
	CBranchID: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Details })
export class ContractDetail extends PXView {
	ContractItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	Change: PXFieldState;
	BasePriceVal: PXFieldState;
	BaseDiscountPct: PXFieldState;
	FixedRecurringPriceVal: PXFieldState;
	UsagePriceVal: PXFieldState;
	RecurringDiscountPct: PXFieldState;
	RenewalPriceVal: PXFieldState;
	RenewalDiscountPct: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, allowSort: false })
export class ContractDetail2 extends PXView {
	ContractItemID: PXFieldState;
	Description: PXFieldState;
	InventoryItem__InventoryCD: PXFieldState;
	ContractItem__UOMForDeposits: PXFieldState;
	ContractItem__RecurringTypeForDeposits: PXFieldState;
	RecurringIncluded: PXFieldState;
	FixedRecurringPriceVal: PXFieldState;
	RecurringDiscountPct: PXFieldState;
	UsagePriceVal: PXFieldState;
	RecurringUsed: PXFieldState;
	RecurringUsedTotal: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class EPContractRate extends PXView {
    @columnConfig({ hideViewLink: true })
    EarningType: PXFieldState<PXFieldOptions.CommitChanges>;
    EPEarningType__Description: PXFieldState;
    LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;

    @columnConfig({ nullText: CT301000.AllEmployees })
    EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;

    EPEmployee__AcctName: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, allowSort: false, allowUpdate: false })
export class ContractRenewalHistory extends PXView {
	Action: PXFieldState;
	Date: PXFieldState;
	CreatedByID: PXFieldState;
	ChildContractID: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true, allowUpdate: false })
export class ARInvoice extends PXView {
	DocType: PXFieldState;

    @linkCommand("ViewInvoice")
    RefNbr: PXFieldState;

    @columnConfig({ hideViewLink: true })
    FinPeriodID: PXFieldState;

    DocDate: PXFieldState;
    DueDate: PXFieldState;

    @columnConfig({ allowUpdate: false })
    Status: PXFieldState;

    CuryOrigDocAmt: PXFieldState;

    @columnConfig({ allowUpdate: false })
    CuryDocBal: PXFieldState;

    @columnConfig({ hideViewLink: true })
    PaymentMethodID: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class CSAnswers extends PXView {
    @columnConfig({
        allowShowHide: GridColumnShowHideMode.False,
        textField: "AttributeID_description",
        hideViewLink: true,
    })
    AttributeID: PXFieldState;

    isRequired: PXFieldState;
    Value: PXFieldState;
}

export class RenewManualNumberingFilter extends PXView {
	@fieldConfig({
		controlType: "qp-mask-editor"
	})
    ContractCD: PXFieldState<PXFieldOptions.CommitChanges>;
}
