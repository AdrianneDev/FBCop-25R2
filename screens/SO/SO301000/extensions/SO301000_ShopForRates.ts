import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridAutoGrowMode,
	GridPagerMode,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_ShopForRates extends SO301000 { }
export class SO301000_ShopForRates {
	ShopRates: PXActionState;

	@viewInfo({ containerName: "Shop For Rates" })
	DocumentProperties = createSingle(ShopForRatesHeader);

	@viewInfo({ containerName: "Carrier Rates" })
	CarrierRates = createCollection(CarrierRates);

	@viewInfo({ containerName: "Packages" })
	Packages = createCollection(Packages);
}

export class ShopForRatesHeader extends PXView {
	OrderWeight: PXFieldState;
	PackageWeight: PXFieldState;
	IsManualPackage: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
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
export class Packages extends PXView {
	RecalculatePackages: PXActionState;

	@columnConfig({ hideViewLink: true })
	BoxID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;
	GrossWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	WeightUOM: PXFieldState;

	AllowOverrideDimension: PXFieldState;
	Length: PXFieldState<PXFieldOptions.CommitChanges>;
	Width: PXFieldState<PXFieldOptions.CommitChanges>;
	Height: PXFieldState<PXFieldOptions.CommitChanges>;
	LinearUOM: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	Weight: PXFieldState;
	BoxWeight: PXFieldState;

	DeclaredValue: PXFieldState<PXFieldOptions.CommitChanges>;
	COD: PXFieldState<PXFieldOptions.CommitChanges>;
	StampsAddOns: PXFieldState<PXFieldOptions.CommitChanges>;
}
