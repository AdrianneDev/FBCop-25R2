import {
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	viewInfo,
	graphInfo,
	gridConfig,
	createSingle,
	createCollection
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CS.ShippingZoneDetailedMaint", primaryView: "ShippingZones" })
export class CS209500 extends PXScreen {
	AddState: PXActionState;

	@viewInfo({ containerName: "Shipping Zone" })
	ShippingZones = createSingle(ShippingZone);

	@viewInfo({ containerName: "Shipping Zone Lines" })
	ShippingZoneLines = createCollection(ShippingZoneLine);

	@viewInfo({ containerName: "Add Country States Filter" })
	CountryFilter = createSingle(CountryParam);

	@viewInfo({ containerName: "Add Country States" })
	CountryStatesList = createCollection(State);
}

export class ShippingZone extends PXView {
	ZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
}

@gridConfig({
	adjustPageSize: true,
})
export class ShippingZoneLine extends PXView {
	AddCountryStates: PXActionState;
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryID_description: PXFieldState;
	StateID: PXFieldState<PXFieldOptions.CommitChanges>;
	StateID_description: PXFieldState;
}

export class CountryParam extends PXView {
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryID_description: PXFieldState;
}

@gridConfig({
	adjustPageSize: true,
})
export class State extends PXView {
	@columnConfig({
		allowCheckAll: true
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryID: PXFieldState;
	CountryID_description: PXFieldState;
	StateID: PXFieldState;
	Name: PXFieldState;
}
