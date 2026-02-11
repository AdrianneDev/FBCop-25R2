import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,

	createSingle,
	createCollection,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnShowHideMode
} from "client-controls";

import { SO301000 } from "../SO301000";

export interface SO301000_OrderOrchestration extends SO301000 { }
export class SO301000_OrderOrchestration {
	OrchestrateOrder: PXActionState;

	@viewInfo({ containerName: "Order Orchestration Settings" })
	OrderOrchestrationSettingsView = createSingle(SOOrderOrchestrationSettings);

	@viewInfo({ containerName: "Order Orchestration Summary Line" })
	OrderOrchestrationSummariesView = createCollection(SOOrderOrchestrationSummaryLine);

	@viewInfo({ containerName: "Order Orchestration Line" })
	OrderOrchestrationDetailLineView = createCollection(SOOrderOrchestrationLine);
}

export class SOOrderOrchestrationSettings extends PXView {
	OrchestrationStrategy: PXFieldState;
	LimitWarehouse: PXFieldState;
	NumberOfWarehouses: PXFieldState;
	ShippingZoneID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	caption: "Order Fulfillment Plan",
	allowInsert: false,
	allowDelete: false,
	adjustPageSize: true,
	syncPosition: true,
	autoRepaint: ["OrderOrchestrationDetailLineView"]
})
export class SOOrderOrchestrationSummaryLine extends PXView {
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	OrderLineNbr: PXFieldState<PXFieldOptions.Hidden>;
	InventoryID: PXFieldState;
	InventoryDescr: PXFieldState;
	SiteCD: PXFieldState;
	SiteDescr: PXFieldState;
	OrderQty: PXFieldState;
	BaseUOM: PXFieldState;
	SalesUOM: PXFieldState;
	Splits: PXFieldState;
	SplitQty: PXFieldState;
	SplitDetails: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	caption: "Orchestration Details",
	allowInsert: false,
	allowDelete: false,
	adjustPageSize: true
})
export class SOOrderOrchestrationLine extends PXView {
	AltSiteCD: PXFieldState;
	LineQty: PXFieldState;
	IsAllocated: PXFieldState;
}


