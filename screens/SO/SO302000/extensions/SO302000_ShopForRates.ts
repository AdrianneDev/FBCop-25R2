import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridAutoGrowMode,
} from "client-controls";
import { SO302000 } from "../SO302000";

export interface SO302000_ShopForRates extends SO302000 { }
export class SO302000_ShopForRates {
	ShopRates: PXActionState;

	@viewInfo({ containerName: "Carrier Rates" })
	CarrierRates = createCollection(CarrierRates);

	@viewInfo({ containerName: "Packages - Rates" })
	PackagesForRates = createCollection(PackagesForRates);
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	autoGrowInHeight: GridAutoGrowMode.Fit
})
export class CarrierRates extends PXView {
	RefreshRates: PXActionState;

	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	Method: PXFieldState;
	Amount: PXFieldState;
	DaysInTransit: PXFieldState;
	DeliveryDate: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class PackagesForRates extends PXView {
	RecalculatePackages: PXActionState;
	CaptureWeightFromScale: PXActionState;

	@columnConfig({ hideViewLink: true })
	BoxID: PXFieldState<PXFieldOptions.CommitChanges>;

	BoxDescription: PXFieldState;
	Weight: PXFieldState<PXFieldOptions.CommitChanges>;
	WeightUOM: PXFieldState;
	AllowOverrideDimension: PXFieldState;
	Length: PXFieldState<PXFieldOptions.CommitChanges>;
	Width: PXFieldState<PXFieldOptions.CommitChanges>;
	Height: PXFieldState<PXFieldOptions.CommitChanges>;
	LinearUOM: PXFieldState;
	BoxWeight: PXFieldState;
	NetWeight: PXFieldState;
	DeclaredValue: PXFieldState<PXFieldOptions.CommitChanges>;
	COD: PXFieldState<PXFieldOptions.CommitChanges>;
	StampsAddOns: PXFieldState<PXFieldOptions.CommitChanges>;
}
