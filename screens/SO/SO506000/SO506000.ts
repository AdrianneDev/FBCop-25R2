import { autoinject } from "aurelia-framework";
import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnDisplayMode,
} from "client-controls";

@autoinject
@graphInfo({
	graphType: "PX.ExternalCarriersHelper.SOCreateShipmentManifestProcess",
	primaryView: "Filter",
})
export class SO506000 extends PXScreen {
	@viewInfo({ containerName: "Filter" })
	Filter = createSingle(Filter);

	@viewInfo({ containerName: "Shipments" })
	ShipmentList = createCollection(SOShipment);
}

export class Filter extends PXView {
	CarrierID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintWithDeviceHub: PXFieldState<PXFieldOptions.CommitChanges>;
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing
})
export class SOShipment extends PXView {
	ProcessingStatus: PXFieldState<PXFieldOptions.Hidden>;
	ProcessingMessage: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowCheckAll: true, allowNull: false })
	Selected: PXFieldState;

	ShipmentNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;
	CustomerID_description: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	ShipVia: PXFieldState;
}
