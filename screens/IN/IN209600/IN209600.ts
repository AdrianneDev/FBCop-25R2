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
	GridFastFilterVisibility,
} from "client-controls";


@graphInfo({
	graphType: "PX.Objects.IN.INItemLotSerialAttributesMaint",
	primaryView: "ItemLotSerial",
})
export class IN209600 extends PXScreen {
	@viewInfo({ containerName: "Lot/Serial Attribute Summary" })
	ItemLotSerial = createSingle(ItemLotSerialAttributesHeader);

	@viewInfo({ containerName: "Lot/Serial Attribute" })
	CurrentItemLotSerial = createSingle(ItemLotSerialAttributes);

	@viewInfo({ containerName: "Attributes" })
	LotSerialAttributes = createCollection(LotSerialAttributes);

	@viewInfo({ containerName: "History" })
	History = createCollection(LotSerialAttributesHistory);
}

export class ItemLotSerialAttributesHeader extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	MfgLotSerialNbr: PXFieldState;
	InventoryItem__LotSerClassID: PXFieldState;
	INItemLotSerial__ExpireDate: PXFieldState;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	Body: PXFieldState;
	SalesPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	RecPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ImageUrl: PXFieldState;
}

export class ItemLotSerialAttributes extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerialNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	MfgLotSerialNbr: PXFieldState;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	Body: PXFieldState;
	ImageUrl: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	autoAdjustColumns: false
})
export class LotSerialAttributes extends PXView {
	@columnConfig({ hideViewLink: true })
	AttributeID: PXFieldState;

	Required: PXFieldState;
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showFastFilter: GridFastFilterVisibility.False,
	actionsConfig: {
		exportToExcel: { hidden: true, disabled: true }
	},
})
export class LotSerialAttributesHistory extends PXView {
	RefNbr: PXFieldState;
	TranType: PXFieldState;
	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	Qty: PXFieldState;
	UnitCost: PXFieldState;
	INTran__UnitPrice: PXFieldState;
	INTran__SOShipmentNbr: PXFieldState;
	INTran__ARRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	INTran__BAccountID: PXFieldState;

	INTran__BAccountID_Description: PXFieldState;
	INTran__POReceiptType: PXFieldState;
	INTran__POReceiptNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	POReceipt__VendorID: PXFieldState;

	POReceipt__VendorID_Vendor_acctName: PXFieldState;
	Released: PXFieldState;
	INTran__TranDesc: PXFieldState;
}
