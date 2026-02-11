import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,

	GridPreset,
	GridPagerMode,
	GridNoteFilesShowMode,
	columnConfig,
} from "client-controls";
import { SO302020 } from "../SO302020";
import { Address } from "src/screens/common/form-address/form-address";

export interface SO302020_Ship extends SO302020 { }
export class SO302020_Ship {
	@viewInfo({ containerName: "Shipping Address" })
	Shipping_Address = createSingle(Address);

	@viewInfo({ containerName: "Shipment Totals" })
	CurrentDocument = createSingle(ShipmentTotals);

	@viewInfo({ containerName: "Carrier Rates" })
	CarrierRates = createCollection(CarrierRates);

	@viewInfo({ containerName: "Packages" })
	Packages = createCollection(ShipmentPackages);
}

export class ShipmentTotals extends PXView {
	ShipmentQty: PXFieldState<PXFieldOptions.Disabled>;
	ShipmentWeight: PXFieldState<PXFieldOptions.Disabled>;
	ShipmentVolume: PXFieldState<PXFieldOptions.Disabled>;
	PackageCount: PXFieldState<PXFieldOptions.Disabled>;
	PackageWeight: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	pagerMode: GridPagerMode.InfiniteScroll,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class CarrierRates extends PXView {
	ScanRefreshRates: PXActionState;
	ScanGetLabels: PXActionState;

	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	Method: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled>;
	Amount: PXFieldState<PXFieldOptions.Disabled>;
	DaysInTransit: PXFieldState<PXFieldOptions.Disabled>;
	DeliveryDate: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class ShipmentPackages extends PXView {
	@columnConfig({ hideViewLink: true })
	BoxID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowOverrideDimension: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LinearUOM: PXFieldState<PXFieldOptions.CommitChanges>;

	Length: PXFieldState<PXFieldOptions.CommitChanges>;
	Width: PXFieldState<PXFieldOptions.CommitChanges>;
	Height: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	WeightUOM: PXFieldState<PXFieldOptions.CommitChanges>;

	Weight: PXFieldState<PXFieldOptions.CommitChanges>;
	BoxWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	NetWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	DeclaredValue: PXFieldState<PXFieldOptions.CommitChanges>;
	COD: PXFieldState<PXFieldOptions.CommitChanges>;
	TrackNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	StampsAddOns: PXFieldState<PXFieldOptions.CommitChanges>;
}
