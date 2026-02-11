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
	GridPreset,
	PXPageLoadBehavior,
	GridAutoGrowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.SO.SOOrderRelatedReturnsSP",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class SO4010SP extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(SOOrderRelatedReturnsSPFilter);

	@viewInfo({ containerName: "Related Return Documents" })
	RelatedReturnDocuments = createCollection(SOOrderRelatedReturnsSPResultDoc);

	@viewInfo({ containerName: "Return Documents by Line" })
	ReturnsByLine = createCollection(SOOrderRelatedReturnsSPResultLine);
}

export class SOOrderRelatedReturnsSPFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippedQty: PXFieldState;
	ReturnedQty: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	adjustPageSize: true,
	pageSize: 15
})
export class SOOrderRelatedReturnsSPResultDoc extends PXView {
	ReturnOrderType: PXFieldState;
	ReturnOrderNbr: PXFieldState;
	ReturnInvoiceType: PXFieldState;
	ReturnInvoiceNbr: PXFieldState;
	ShipmentType: PXFieldState;
	ShipmentNbr: PXFieldState;
	ARDocType: PXFieldState;
	ARRefNbr: PXFieldState;
	APDocType: PXFieldState;
	APRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class SOOrderRelatedReturnsSPResultLine extends PXView {
	LineNbr: PXFieldState;
	InventoryID: PXFieldState;
	BaseUnit: PXFieldState;
	ReturnedQty: PXFieldState;
	DisplayReturnOrderType: PXFieldState;
	DisplayReturnOrderNbr: PXFieldState;
	DisplayReturnInvoiceType: PXFieldState;
	DisplayReturnInvoiceNbr: PXFieldState;
}