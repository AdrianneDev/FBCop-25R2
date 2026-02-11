import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	columnConfig,
	GridPreset
} from "client-controls";

@graphInfo({graphType: "PX.Objects.CS.CarrierMaint", primaryView: "Carrier"})
export class CS207500 extends PXScreen {

	@viewInfo({containerName: "Ship Via Summary"})
	Carrier = createSingle(Carrier);

	@viewInfo({containerName: "Details"})
	CarrierCurrent = createSingle(Carrier2);

	@viewInfo({containerName: "Freight Rates"})
	FreightRates = createCollection(FreightRate);

	@viewInfo({containerName: "Packages"})
	CarrierPackages = createCollection(CarrierPackage);
}

export class Carrier extends PXView  {
	CarrierID: PXFieldState;
	Description: PXFieldState;
	IsExternal: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
}

export class Carrier2 extends PXView  {
	CalendarID: PXFieldState;
	CarrierPluginID: PXFieldState<PXFieldOptions.CommitChanges>;
	CalcMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	PluginMethod: PXFieldState;
	BaseRate: PXFieldState;
	IsCommonCarrier: PXFieldState;
	CalcFreightOnReturn: PXFieldState<PXFieldOptions.CommitChanges>;
	ConfirmationRequired: PXFieldState;
	PackageRequired: PXFieldState;
	ReturnLabel: PXFieldState;
	TaxCategoryID: PXFieldState;
	DeliveryType: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightSalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightSalesSubID: PXFieldState;
	FreightExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	FreightExpenseSubID: PXFieldState;
	ValidatePackedQty: PXFieldState;
	IsExternalShippingApplication: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippingApplicationType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class FreightRate extends PXView  {
	Weight: PXFieldState;
	Volume: PXFieldState;
	ZoneID: PXFieldState;
	Rate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class CarrierPackage extends PXView  {
	@columnConfig({ hideViewLink: true })
	BoxID: PXFieldState;
	CSBox__Description: PXFieldState;
	CSBox__BoxWeight: PXFieldState;
	CSBox__MaxWeight: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CommonSetup__WeightUOM: PXFieldState;
	CSBox__MaxVolume: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CommonSetup__VolumeUOM: PXFieldState;
	CSBox__Length: PXFieldState;
	CSBox__Width: PXFieldState;
	CSBox__Height: PXFieldState;
	CarrierBox: PXFieldState;
}
