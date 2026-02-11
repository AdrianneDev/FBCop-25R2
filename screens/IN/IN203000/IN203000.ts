import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	linkCommand,

	GridColumnShowHideMode,
	GridColumnGeneration,
	GridPreset,
	IGridColumn,
	GridColumnDisplayMode,
	TextAlign,
	GridAutoGrowMode,
	GridPagerMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.Matrix.Graphs.TemplateInventoryItemMaint",
	primaryView: "Item",
	showActivitiesIndicator: true,
})
export class IN203000 extends PXScreen {
	IdRowUp: PXActionState;
	IdRowDown: PXActionState;
	DescriptionRowUp: PXActionState;
	DescriptionRowDown: PXActionState;
	DeleteItems: PXActionState;
	ViewMatrixItem: PXActionState;
	CreateUpdate: PXActionState;

	@viewInfo({ containerName: "Template Item Summary" })
	Item = createSingle(InventoryItem);

	@viewInfo({ containerName: "Template Item Configuration" })
	ItemSettings = createSingle(InventoryItem2);

	@viewInfo({ containerName: "Warehouse Defaults" })
	ItemCurySettings = createSingle(InventoryItemCurySettings);

	@viewInfo({ containerName: "Conversions" })
	itemunits = createCollection(INUnit);

	@viewInfo({ containerName: "Fulfillment" })
	Category = createCollection(INItemCategory);

	@viewInfo({ containerName: "Boxes" })
	Boxes = createCollection(INItemBox);

	@viewInfo({ containerName: "Vendors" })
	VendorItems = createCollection(VendorItems);

	@viewInfo({ containerName: "Attributes" })
	Answers = createCollection(Attributes);

	@viewInfo({ containerName: "Excluded Fields" })
	FieldsExcludedFromUpdate = createCollection(INMatrixExcludedData);

	@viewInfo({ containerName: "Excluded Attributes" })
	AttributesExcludedFromUpdate = createCollection(AttributesExcludedFromUpdate);

	@viewInfo({ containerName: "Matrix Items" })
	MatrixItems = createCollection(MatrixItems);

	@viewInfo({ containerName: "Media URLs" })
	InventoryFileUrls = createCollection(BCInventoryFileUrls);

	ItemClass = createSingle(INItemClass);

	private readonly AttributeValueTemplate = "AttributeValue";
	private readonly AttributesPlaceholderField = "AttributeValue0";
	private readonly TemplateItemMatrixItemsFields = ["Selected", "InventoryID", "Descr", "DfltSiteID", "ItemClassID", "TaxCategoryID", "RecPrice", "LastCost", "BasePrice", "StkItem"];

	matrixItemsOnFilterColumns(column: IGridColumn): boolean {
		column.commitChanges = true;

		return column.field !== undefined &&
			(column.field.startsWith(this.AttributeValueTemplate) ||
				this.TemplateItemMatrixItemsFields.includes(column.field));
	}

	//by default generic columns are added to the tail. Use this method to move matrix attribute columns to a place they were before
	matrixItemsColumnsGenerated(columns: IGridColumn[]): void {
		let templateFieldIndex = 0;
		let columnCounter = 0;

		for (let columnIndex = 0; columnIndex < columns.length; columnIndex++) {
			const column = columns[columnIndex];

			if (column.field === this.AttributesPlaceholderField) {
				templateFieldIndex = columnIndex;
			}

			if (column.field !== undefined && column.field.startsWith(this.AttributeValueTemplate)) {
				columns.splice(columnIndex, 1);
				columns.splice(templateFieldIndex + columnCounter++, 0, column);
			}
		}
	}
}

export class InventoryItem extends PXView {
	InventoryCD: PXFieldState;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	StkItem: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class InventoryItem2 extends PXView {
	ItemStatus: PXFieldState;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemType: PXFieldState;
	ValMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	PostClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	LotSerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryOfOrigin: PXFieldState;
	NonStockReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	NonStockReceiptAsService: PXFieldState<PXFieldOptions.CommitChanges>;
	NonStockShip: PXFieldState;
	CompletePOLine: PXFieldState;
	EstimatedDuration: PXFieldState;
	DefaultSubItemID: PXFieldState;
	DefaultSubItemOnEntry: PXFieldState;
	BaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	DecimalBaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	DecimalSalesUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	DecimalPurchaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	CycleID: PXFieldState<PXFieldOptions.CommitChanges>;
	ABCCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ABCCodeIsFixed: PXFieldState<PXFieldOptions.NoLabel>;
	MovementClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	MovementClassIsFixed: PXFieldState<PXFieldOptions.NoLabel>;
	BaseItemWeight: PXFieldState;
	WeightUOM: PXFieldState;
	BaseItemVolume: PXFieldState;
	VolumeUOM: PXFieldState;
	HSTariffCode: PXFieldState;
	UndershipThreshold: PXFieldState;
	OvershipThreshold: PXFieldState;
	PackageOption: PXFieldState<PXFieldOptions.CommitChanges>;
	PackSeparately: PXFieldState;
	PriceClassID: PXFieldState;
	PriceWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceManagerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Commisionable: PXFieldState<PXFieldOptions.NoLabel>;
	MinGrossProfitPct: PXFieldState;
	MarkupPct: PXFieldState;
	PostToExpenseAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	CostBasis: PXFieldState<PXFieldOptions.CommitChanges>;
	PercentOfSalesPrice: PXFieldState;
	DfltEarningType: PXFieldState;
	InvtAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvtSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCodeSubID: PXFieldState;
	SalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesSubID: PXFieldState;
	COGSAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	COGSSubID: PXFieldState;
	ExpenseSubID: PXFieldState;
	StdCstVarAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	StdCstVarSubID: PXFieldState;
	StdCstRevAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	StdCstRevSubID: PXFieldState;
	POAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualSubID: PXFieldState;
	PPVAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PPVSubID: PXFieldState;
	LCVarianceAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	LCVarianceSubID: PXFieldState;
	DeferralAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeferralSubID: PXFieldState;
	Body: PXFieldState;
	DefaultColumnMatrixAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultRowMatrixAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ImageUrl: PXFieldState;
	UpdateOnlySelected: PXFieldState;
	ExportToExternal: PXFieldState<PXFieldOptions.CommitChanges>;
	Visibility: PXFieldState;
	Availability: PXFieldState<PXFieldOptions.CommitChanges>;
	NotAvailMode: PXFieldState;
	CustomURL: PXFieldState<PXFieldOptions.CommitChanges>;
	PageTitle: PXFieldState;
	ShortDescription: PXFieldState;
	SearchKeywords: PXFieldState;
	MetaKeywords: PXFieldState;
	MetaDescription: PXFieldState;
}

export class InventoryItemCurySettings extends PXView {
	DfltSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltShipLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltReceiptLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	RecPrice_Label: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled>;
	RecPrice: PXFieldState<PXFieldOptions.NoLabel>;
	BasePrice_Label: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled>;
	BasePrice: PXFieldState<PXFieldOptions.NoLabel>;
	PendingStdCost_Label: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled>;
	PendingStdCost: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.CommitChanges>;
	PendingStdCostDate: PXFieldState;
	StdCost_Label: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled>;
	StdCost: PXFieldState<PXFieldOptions.NoLabel>;
	StdCostDate: PXFieldState<PXFieldOptions.Disabled>;
	LastStdCost_Label: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled>;
	LastStdCost: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	initNewRow: true,
	showBottomBar: true,
	adjustPageSize: true,
	pageSize: 15
})
export class INUnit extends PXView {
	UnitType: PXFieldState;

	@columnConfig({ visible: false })
	ItemClassID: PXFieldState;

	InventoryID: PXFieldState<PXFieldOptions.Hidden>;
	FromUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitMultDiv: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	SampleToUnit: PXFieldState;
	PriceAdjustmentMultiplier: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	showBottomBar: true,
	adjustPageSize: true,
	pageSize: 15
})
export class INItemCategory extends PXView {
	@columnConfig({
		hideViewLink: true,
		textAlign: TextAlign.Left,
		displayMode: GridColumnDisplayMode.Text,
		editorType: "qp-tree-selector",
		editorConfig: {
			treeConfig: {
				idField: "CategoryID",
				dataMember: "Categories",
				textField: "Description",
				mode: "single",
				hideRootNode: true,
				openedLayers: 3,
			},
		}
	})
	CategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ShortList,
})
export class INItemBox extends PXView {
	BoxID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState;
	MaxWeight: PXFieldState;
	MaxVolume: PXFieldState;
	MaxQty: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class VendorItems extends PXView {
	Active: PXFieldState;
	IsDefault: PXFieldState;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	Vendor__AcctName: PXFieldState;

	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Location__VSiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PurchaseUnit: PXFieldState;

	Location__VLeadTime: PXFieldState;
	OverrideSettings: PXFieldState;
	AddLeadTimeDays: PXFieldState;
	MinOrdFreq: PXFieldState;
	MinOrdQty: PXFieldState;
	MaxOrdQty: PXFieldState;
	LotSize: PXFieldState;
	ERQ: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	LastPrice: PXFieldState;
	PrepaymentPct: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	syncPosition: true,
	autoAdjustColumns: false,
	adjustPageSize: true
})
export class Attributes extends PXView {
	@columnConfig({
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text
	})
	AttributeID: PXFieldState;

	isRequired: PXFieldState;
	AttributeCategory: PXFieldState;
	Value: PXFieldState;
	@columnConfig({ allowCheckAll: true })
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details, //to review when restoring matrix items functionality
	autoGrowInHeight: GridAutoGrowMode.Fit,
	adjustPageSize: true,
	pageSize: 15
})
export class INMatrixExcludedData extends PXView {
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState;

	@columnConfig({ allowCheckAll: true })
	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details, //to review when restoring matrix items functionality
	autoGrowInHeight: GridAutoGrowMode.Fit,
	adjustPageSize: true,
	pageSize: 15
})
export class AttributesExcludedFromUpdate extends PXView {
	FieldName: PXFieldState;
	CSAnswers__IsRequired: PXFieldState;
	CSAnswers__AttributeCategory: PXFieldState;
	CSAnswers__Value: PXFieldState;

	@columnConfig({ allowCheckAll: true })
	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	generateColumns: GridColumnGeneration.Append,
})
export class MatrixItems extends PXView {
	DeleteItems: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@linkCommand("ViewMatrixItem")
	InventoryID: PXFieldState;

	Descr: PXFieldState;
	DfltSiteID: PXFieldState;
	AttributeValue0: PXFieldState;
	ItemClassID: PXFieldState;
	TaxCategoryID: PXFieldState;
	RecPrice: PXFieldState;
	LastCost: PXFieldState;
	BasePrice: PXFieldState;
	StkItem: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	showBottomBar: true,
	adjustPageSize: true,
	pageSize: 15
})
export class BCInventoryFileUrls extends PXView {
	FileURL: PXFieldState<PXFieldOptions.CommitChanges>;
	FileType: PXFieldState;
}

export class INItemClass extends PXView {
	Mem_RouteService: PXFieldState<PXFieldOptions.Disabled>;
}
