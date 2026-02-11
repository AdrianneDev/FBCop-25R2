import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, createCollection, createSingle, PXScreen,
	controlConfig, graphInfo, GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CT.ContractItemMaint", primaryView: "ContractItems",
	showActivitiesIndicator: true,
})
export class CT201000 extends PXScreen {
	ContractItems = createSingle(ContractItem);
	CurrentContractItem = createSingle(ContractItem2);

	// we split DAC to allow grids to show different fields
	CurrentTemplates = createCollection(ContractTemplate);
	CurrentContracts = createCollection(Contract);
}

export class ContractItem extends PXView {

	@controlConfig({ displayMode: "id" })
	ContractItemCD: PXFieldState;

	Descr: PXFieldState;
}

export class ContractItem2 extends PXView {
	MaxQty: PXFieldState<PXFieldOptions.CommitChanges>;
	MinQty: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultQty: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	BaseItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	BasePriceOption: PXFieldState<PXFieldOptions.CommitChanges>;
	BasePrice: PXFieldState<PXFieldOptions.CommitChanges>;
	RetainRate: PXFieldState<PXFieldOptions.CommitChanges>;
	Deposit: PXFieldState<PXFieldOptions.CommitChanges>;
	Refundable: PXFieldState;
	ProrateSetup: PXFieldState;

	@controlConfig({ allowEdit: true })
	RenewalItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	CollectRenewFeeOnActivation: PXFieldState;
	RenewalPriceOption: PXFieldState<PXFieldOptions.CommitChanges>;
	RenewalPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	BasePriceVal: PXFieldState<PXFieldOptions.Disabled>;
	FixedRecurringPriceVal: PXFieldState<PXFieldOptions.Disabled>;
	UsagePriceVal: PXFieldState<PXFieldOptions.Disabled>;
	RenewalPriceVal: PXFieldState<PXFieldOptions.Disabled>;
	RecurringType: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	RecurringItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	ResetUsageOnBilling: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedRecurringPriceOption: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedRecurringPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	UsagePriceOption: PXFieldState<PXFieldOptions.CommitChanges>;
	UsagePrice: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	DepositItemID: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.ReadOnly, adjustPageSize: true })
export class ContractTemplate extends PXView {
	ContractCD: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, adjustPageSize: true })
export class Contract extends PXView {
	ContractCD: PXFieldState;
	CustomerID: PXFieldState;
	Status: PXFieldState;
	StartDate: PXFieldState;
	ExpireDate: PXFieldState;
	Description: PXFieldState;
}
