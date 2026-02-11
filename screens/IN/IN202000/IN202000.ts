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
	controlConfig,
	headerDescription,
	linkCommand,
	GridPreset,
	GridNoteFilesShowMode,
	GridColumnDisplayMode,
	TextAlign,
	PXActionState,
	GridAutoGrowMode,
	GridPagerMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.NonStockItemMaint",
	primaryView: "Item",
	showActivitiesIndicator: true,
})
export class IN202000 extends PXScreen {
	@viewInfo({ containerName: "Non-Stock Item Summary" })
	Item = createSingle(InventoryItem);

	@viewInfo({ containerName: "Inventory Item Settings" })
	ItemSettings = createSingle(ItemSettings);

	@viewInfo({ containerName: "Item Class" })
	ItemClass = createSingle(ItemClass);

	@viewInfo({ containerName: "Inventory Item Currency-Specific Settings" })
	ItemCurySettings = createSingle(ItemCurySettings);

	@viewInfo({ containerName: "Item UOM Settings" })
	itemunits = createCollection(ItemUnits);

	@viewInfo({ containerName: "Vendors" })
	VendorItems = createCollection(VendorItems);

	@viewInfo({ containerName: "Attributes" })
	Answers = createCollection(Attributes);

	@viewInfo({ containerName: "Sales Categories" })
	Category = createCollection(Category);

	@viewInfo({ containerName: "Cross-Reference" })
	itemxrefrecords = createCollection(ItemXRefRecords);

	@viewInfo({ containerName: "Revenue Components" })
	Components = createCollection(RevenueComponents);

	@viewInfo({ containerName: "Service Skills" })
	ServiceSkills = createCollection(ServiceSkills);

	@viewInfo({ containerName: "Service License Types" })
	ServiceLicenseTypes = createCollection(ServiceLicenseTypes);

	@viewInfo({ containerName: "Resource Equipment Types" })
	ServiceEquipmentTypes = createCollection(ServiceEquipmentTypes);

	@viewInfo({ containerName: "Pickup/Delivery Item" })
	ServiceInventoryItems = createCollection(ServiceInventoryItems);

	@viewInfo({ containerName: "Media URLs" })
	InventoryFileUrls = createCollection(InventoryFileUrls);
}

export class InventoryItem extends PXView {
	InventoryCD: PXFieldState;
	ItemStatus: PXFieldState;

	@headerDescription
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;

	ProductWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProductManagerID: PXFieldState;
	ChkServiceManagement: PXFieldState;
	Body: PXFieldState;
}

export class ItemSettings extends PXView {
	//General tab

	@controlConfig({ allowEdit: true })
	TemplateItemID: PXFieldState;

	//Item Defaults
	@controlConfig({ allowEdit: true })
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	ItemType: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	PostClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	KitItem: PXFieldState<PXFieldOptions.CommitChanges>;
	IsTravelItem: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxCalcMode: PXFieldState;
	NonStockReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	NonStockReceiptAsService: PXFieldState<PXFieldOptions.CommitChanges>;
	NonStockShip: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletePOLine: PXFieldState;
	AMDefaultMarkFor: PXFieldState;
	DefaultCostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	//Field Service Defaults
	EstimatedDuration: PXFieldState;

	//Unit of Measure
	BaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	DecimalBaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	DecimalSalesUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	DecimalPurchaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;

	//Price-Cost tab
	@controlConfig({ allowEdit: true })
	PriceClassID: PXFieldState;

	PriceWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceManagerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Commisionable: PXFieldState;
	MinGrossProfitPct: PXFieldState;
	MarkupPct: PXFieldState;

	//Posting of Item Cost
	PostToExpenseAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	CostBasis: PXFieldState<PXFieldOptions.CommitChanges>;
	PercentOfSalesPrice: PXFieldState;

	//Field Service Defaults
	DfltEarningType: PXFieldState;
	BillingRule: PXFieldState;

	//Packaging tab
	BaseItemWeight: PXFieldState;
	WeightUOM: PXFieldState;
	BaseItemVolume: PXFieldState;
	VolumeUOM: PXFieldState;
	UndershipThreshold: PXFieldState;
	OvershipThreshold: PXFieldState;
	CommodityCodeType: PXFieldState;
	HSTariffCode: PXFieldState;

	//Deferral tab
	@controlConfig({ allowEdit: true })
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;

	DefaultTerm: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultTermUOM: PXFieldState<PXFieldOptions.CommitChanges>;
	UseParentSubID: PXFieldState;
	TotalPercentage: PXFieldState;

	//GL Accounts tab
	InvtAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvtSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReasonCodeSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	COGSAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	COGSSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PPVAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PPVSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeferralAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeferralSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	EarningsAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	EarningsSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	BenefitExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	BenefitExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	PTOExpenseAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PTOExpenseSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	//Pickup/Delivery Item tab
	ActionType: PXFieldState<PXFieldOptions.CommitChanges>;

	//eCommerce tab
	ExportToExternal: PXFieldState<PXFieldOptions.CommitChanges>;
	Visibility: PXFieldState;
	Availability: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomURL: PXFieldState<PXFieldOptions.CommitChanges>;
	PageTitle: PXFieldState;
	ShortDescription: PXFieldState;
	SearchKeywords: PXFieldState;
	MetaKeywords: PXFieldState;

	@controlConfig({ rows: 5 })
	MetaDescription: PXFieldState<PXFieldOptions.Multiline>;

	//Attributes tab
	ImageUrl: PXFieldState;

	//Related Items tab
	PreferredItemClasses: PXFieldState;
	PriceOfSuggestedItems: PXFieldState;
}

export class ItemClass extends PXView {
	Mem_RouteService: PXFieldState<PXFieldOptions.Disabled>;
}

export class ItemCurySettings extends PXView {
	//General tab
	DfltSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	//Price-Cost tab
	RecPrice_Label: PXFieldState;
	RecPrice: PXFieldState;
	BasePrice_Label: PXFieldState;
	BasePrice: PXFieldState;

	PendingStdCost_Label: PXFieldState;
	PendingStdCost: PXFieldState;
	PendingStdCostDate: PXFieldState;
	StdCost_Label: PXFieldState;
	StdCost: PXFieldState;
	StdCostDate: PXFieldState;
	LastStdCost_Label: PXFieldState;
	LastStdCost: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	showBottomBar: true,
	adjustPageSize: true,
	pageSize: 15
})
export class ItemUnits extends PXView {
	FromUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitMultDiv: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	SampleToUnit: PXFieldState;
	PriceAdjustmentMultiplier: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class VendorItems extends PXView {
	Active: PXFieldState;
	IsDefault: PXFieldState;

	@linkCommand("ViewVendorEmployee")
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	Vendor__AcctName: PXFieldState;

	@linkCommand("ViewVendorLocation")
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PurchaseUnit: PXFieldState;

	VendorInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

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
	@columnConfig({ displayMode: GridColumnDisplayMode.Text })
	AttributeID: PXFieldState;

	AttributeCategory: PXFieldState;
	Value: PXFieldState;
	isRequired: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	showBottomBar: true,
	adjustPageSize: true,
	pageSize: 15
})
export class Category extends PXView {
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
	preset: GridPreset.Details,
})
export class ServiceSkills extends PXView {
	SkillID: PXFieldState<PXFieldOptions.CommitChanges>;
	FSSkill__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ServiceLicenseTypes extends PXView {
	LicenseTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	FSLicenseType__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ServiceEquipmentTypes extends PXView {
	EquipmentTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	FSEquipmentType__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ServiceInventoryItems extends PXView {
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryItem__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ItemXRefRecords extends PXView {
	AlternateType: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	AlternateID: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class RevenueComponents extends PXView {
	ComponentID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SalesSubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	Qty: PXFieldState;
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultTerm: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DefaultTermUOM: PXFieldState<PXFieldOptions.CommitChanges>;

	OverrideDefaultTerm: PXFieldState<PXFieldOptions.CommitChanges>;
	AmtOption: PXFieldState<PXFieldOptions.CommitChanges>;
	AmtOptionASC606: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedAmt: PXFieldState;
	Percentage: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	showBottomBar: true,
	adjustPageSize: true,
	pageSize: 15
})
export class InventoryFileUrls extends PXView {
	FileURL: PXFieldState<PXFieldOptions.CommitChanges>;
	FileType: PXFieldState;
}
