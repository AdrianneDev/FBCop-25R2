import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	GridPreset
} from "client-controls";
import { IN204500 } from "../IN204500";

export interface IN204500_Manufacturing extends IN204500 { }
export class IN204500_Manufacturing {

	@viewInfo({ containerName: "Inventory Planning" })
	inventoryPlanningSettings = createSingle(INItemSiteInventoryPlanning);

	@viewInfo({ containerName: "Inventory Planning" })
	productionOrderDefaultSettings = createSingle(INItemSiteProductionOrder);

	@viewInfo({ containerName: "Manufacturing" })
	manufacturingSettings = createSingle(INItemSiteManufacturing);

	@viewInfo({ containerName: "Sub Item Defaults" })
	AMSubItemDefaults = createCollection(AMSubItemDefault);
}

export class INItemSiteInventoryPlanning extends PXView {
	AMReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;
	AMReplenishmentSourceOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMSourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMSourceSiteIDOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMSafetyStock: PXFieldState<PXFieldOptions.CommitChanges>;
	AMSafetyStockOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMinQty: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMinQtyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMinOrdQty: PXFieldState;
	AMMinOrdQtyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMaxOrdQty: PXFieldState;
	AMMaxOrdQtyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMLotSize: PXFieldState;
	AMLotSizeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMFGLeadTime: PXFieldState;
	AMMFGLeadTimeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMTransferLeadTime: PXFieldState;
	AMTransferLeadTimeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMGroupWindow: PXFieldState;
	AMGroupWindowOverride: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class INItemSiteProductionOrder extends PXView {
	AMReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;
	AMReplenishmentSourceOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMSourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMSourceSiteIDOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMinOrdQty: PXFieldState;
	AMMinOrdQtyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMaxOrdQty: PXFieldState;
	AMMaxOrdQtyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMLotSize: PXFieldState;
	AMLotSizeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMMFGLeadTime: PXFieldState;
	AMMFGLeadTimeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class INItemSiteManufacturing extends PXView {
	AMBOMID: PXFieldState;
	AMPlanningBOMID: PXFieldState;
	AMConfigurationID: PXFieldState;
	ReplenishmentSource: PXFieldState<PXFieldOptions.Disabled>;
	AMMinOrdQty: PXFieldState<PXFieldOptions.Disabled>;
	AMMaxOrdQty: PXFieldState<PXFieldOptions.Disabled>;
	AMLotSize: PXFieldState<PXFieldOptions.Disabled>;
	AMMFGLeadTime: PXFieldState<PXFieldOptions.Disabled>;
	AMScrapOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	AMScrapSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMScrapLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Attributes,
	syncPosition: true,
})
export class AMSubItemDefault extends PXView {
	SubItemID: PXFieldState;
	BOMID: PXFieldState;
	PlanningBOMID: PXFieldState;
}
