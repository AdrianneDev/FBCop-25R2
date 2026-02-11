import {
	PXScreen, createSingle, createCollection, graphInfo, autoRefresh, PXView, PXFieldState, PXFieldOptions,
	controlConfig, gridConfig, columnConfig, linkCommand, PXActionState, GridPreset, fieldConfig,
	IEditorControlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CT.TemplateMaint", primaryView: "Templates",
	showActivitiesIndicator: true,
})
export class CT202000 extends PXScreen {

	CRAttribute_ViewDetails: PXActionState;

	Templates = createSingle(ContractTemplate);
	CurrentTemplate = createSingle(ContractTemplate2);
	Billing = createSingle(ContractBillingSchedule);
	ContractDetails = createCollection(ContractDetail);
	Contracts = createCollection(Contract);
	SLAMapping = createCollection(ContractSLAMapping);
	AttributeGroup = createCollection(CSAttributeGroupList);

}

export class ContractTemplate extends PXView {

	@controlConfig({ displayMode: "id" })
	ContractCD: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;
	@controlConfig<IEditorControlConfig>({
		required: false
	})
	Status: PXFieldState;
}

export class ContractTemplate2 extends PXView {

	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Duration: PXFieldState<PXFieldOptions.CommitChanges>;
	DurationType: PXFieldState<PXFieldOptions.CommitChanges>;
	Refundable: PXFieldState<PXFieldOptions.CommitChanges>;
	RefundPeriod: PXFieldState<PXFieldOptions.CommitChanges>;
	Days: PXFieldState<PXFieldOptions.Disabled>;
	AutoRenew: PXFieldState;
	AutoRenewDays: PXFieldState;
	DaysBeforeExpiration: PXFieldState<PXFieldOptions.Disabled>;
	GracePeriod: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	EffectiveFrom: PXFieldState;
	DiscontinueAfter: PXFieldState;
	ScheduleStartsOn: PXFieldState;
	DetailedBilling: PXFieldState;
	AllowOverrideFormulaDescription: PXFieldState;

	@controlConfig({ allowEdit: true })
	CaseItemID: PXFieldState;

	AllowOverride: PXFieldState;
	AutomaticReleaseAR: PXFieldState;

}

export class ContractBillingSchedule extends PXView {

	Type: PXFieldState;
	BillTo: PXFieldState;

	@fieldConfig({ controlType: "qp-formula-editor"	})
	InvoiceFormula: PXFieldState;

	@fieldConfig({ controlType: "qp-formula-editor" })
	TranFormula: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, adjustPageSize: true })
export class ContractDetail extends PXView {

	@autoRefresh
	ContractItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractItem__BasePriceVal: PXFieldState;
	ContractItem__FixedRecurringPriceVal: PXFieldState;
	ContractItem__UsagePriceVal: PXFieldState;
	ContractItem__RenewalPriceVal: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly, adjustPageSize: true })
export class Contract extends PXView {

	ContractCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;
	Status: PXFieldState;
	StartDate: PXFieldState;
	ExpireDate: PXFieldState;
	Description: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly, adjustPageSize: true })
export class ContractSLAMapping extends PXView {

	Severity: PXFieldState;
	@columnConfig({ editorConfig: { emptyChar: "0" } })
	Period: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, adjustPageSize: true })
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
