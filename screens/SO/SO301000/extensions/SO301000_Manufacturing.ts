import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	placeAfterProperty,
	placeBeforeProperty,
	handleEvent,
	CustomEventType,
	PXViewCollection,
	PXActionState,
	CurrentRowChangedHandlerArgs,
	actionConfig,
} from "client-controls";
import { SO301000, SOLine, SOOrder } from "../SO301000";

export interface SO301000_Manufacturing extends SO301000 { }
export class SO301000_Manufacturing {
	@viewInfo({ containerName: "Production Orders" })
	AMSOLineRecords = createCollection(AMSOLineRecords);

	@viewInfo({ containerName: "Production Details Filter" })
	linkProdOrderSelectFilter = createSingle(linkProdOrderSelectFilter);

	@viewInfo({ containerName: "Production Details" })
	AMSOLineLinkRecords = createCollection(AMSOLineLinkRecords);

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "Transactions" })
	onSOLineChangedAM(args: CurrentRowChangedHandlerArgs<PXViewCollection<SOLine>>) {
		const model = args.viewModel as PXViewCollection<SOLineAM>;
		const ar = args.viewModel.activeRow as SOLineAM;

		if (model.ConfigureEntry) model.ConfigureEntry.enabled = !!ar?.IsConfigurable.value;
		if (model.linkProdOrder) model.linkProdOrder.enabled = !!ar?.AMProdCreate.value;
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
})
export class AMSOLineRecords extends PXView {
	@columnConfig({ allowCheckAll: true })
	AMSelected: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateSubAssemblyOrders: PXFieldState;
	LineNbr: PXFieldState;
	InventoryID: PXFieldState;
	SubItemID: PXFieldState;
	AMQtyReadOnly: PXFieldState;
	AMUOMReadOnly: PXFieldState;
	AMOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	AMProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMProdItem__StatusID: PXFieldState;
	AMProdItem__QtytoProd: PXFieldState;
	AMProdItem__QtyComplete: PXFieldState;
	AMProdItem__UOM: PXFieldState;
	AMConfigurationResults__Completed: PXFieldState;
}

export class linkProdOrderSelectFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	ProdOrdID: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
})
export class AMSOLineLinkRecords extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	StatusID: PXFieldState;
	QtytoProd: PXFieldState;
	QtyComplete: PXFieldState;
	UOM: PXFieldState;
}

export interface SOLineAM extends SOLine { }
export class SOLineAM {
	@actionConfig({
		dialogWidth: "lg",
		dialogHeight: "85vh",
	})
	ConfigureEntry: PXActionState;
	linkProdOrder: PXActionState;

	@placeAfterProperty("ExcludedFromExport")
	IsConfigurable: PXFieldState;

	@placeAfterProperty("DiscPctDR")
	AMProdCreate: PXFieldState<PXFieldOptions.CommitChanges>;

	@placeAfterProperty("DiscPctDR")
	AMorderType: PXFieldState;

	@placeAfterProperty("DiscPctDR")
	AMProdOrdID: PXFieldState;

	@placeAfterProperty("DiscPctDR")
	AMEstimateID: PXFieldState;

	@placeAfterProperty("DiscPctDR")
	AMEstimateRevisionID: PXFieldState;

	@placeAfterProperty("DiscPctDR")
	AMParentLineNbr: PXFieldState;

	@placeAfterProperty("DiscPctDR")
	AMIsSupplemental: PXFieldState;

	@placeAfterProperty("DiscPctDR")
	AMConfigKeyID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export interface SOOrderAM extends SOOrder { }
export class SOOrderAM {
	@placeBeforeProperty("CuryGoodsExtPriceTotal")
	AMCuryEstimateTotal: PXFieldState<PXFieldOptions.Disabled>;

	@placeBeforeProperty("BlanketOpenQty")
	AMEstimateQty: PXFieldState<PXFieldOptions.Disabled>;
}
