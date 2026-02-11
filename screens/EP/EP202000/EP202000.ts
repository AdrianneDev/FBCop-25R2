import {
	createCollection,
	createSingle,
	PXScreen,
	PXView,
	graphInfo,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

import { CSAttributeGroup } from "src/screens/CR/common/tabs/tab-attributes/views";

@graphInfo({
	graphType: "PX.Objects.EP.EmployeeClassMaint",
	primaryView: "EmployeeClass",
	showActivitiesIndicator: true,
})
export class EP202000 extends PXScreen {
	EmployeeClass = createSingle(EPEmployeeClass);

	@viewInfo({ containerName: "Attributes" })
	Mapping = createCollection(CSAttributeGroup);
}

export class EPEmployeeClass extends PXView {
	VendorClassID: PXFieldState;
	Descr: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TermsID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CashAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	APAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	APSubID: PXFieldState;
	DiscTakenAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscTakenSubID: PXFieldState;
	PrepaymentAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepaymentSubID: PXFieldState;
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseSubID: PXFieldState;
	SalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesSubID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CuryID: PXFieldState;
	AllowOverrideCury: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CuryRateTypeID: PXFieldState;
	AllowOverrideRate: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CalendarID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	TaxZoneID: PXFieldState;
	HoursValidation: PXFieldState;
	DefaultDateInActivity: PXFieldState;
	ProbationPeriodMonths: PXFieldState<PXFieldOptions.CommitChanges>;
}
