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
	treeConfig,
	gridConfig,

	linkCommand,
	GridPreset,
	PXPageLoadBehavior,
	fieldConfig,
	controlConfig,
} from "client-controls";
import { EquipmentItemClassOptions } from "../IN202500/IN202500";

@graphInfo({
	graphType: "PX.Objects.IN.INItemClassMaint",
	primaryView: "itemclass",
	pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord
})
export class IN201000 extends PXScreen {
	EquipmentItemClassMode = EquipmentItemClassOptions;

	@viewInfo({ containerName: "Item Class" })
	itemclass = createSingle(ItemClass);

	@viewInfo({ containerName: "Item Class Settings" })
	itemclasssettings = createSingle(ItemClassSettings);

	@viewInfo({ containerName: "Item Class Cury Settings" })
	itemclasscurysettings = createSingle(ItemClassCurySettings);

	@viewInfo({ containerName: "Production Order Default Settings" })
	productionOrderDefaultSettings = createSingle(ProductionOrderDefaultSettings);

	@viewInfo({ containerName: "Item Class UOM Settings" })
	classunits = createCollection(ItemClassUnits);

	@viewInfo({ containerName: "Replenishment" })
	replenishment = createCollection(Replenishment);

	@viewInfo({ containerName: "Inventory Planning Settings" })
	inventoryPlanningSettings = createSingle(InventoryPlanningSettings);

	@viewInfo({ containerName: "Restriction Groups" })
	Groups = createCollection(RestrictionGroups);

	@viewInfo({ containerName: "Mapping" })
	Mapping = createCollection(Mapping);

	@viewInfo({ containerName: "Model Template Component Records" })
	ModelTemplateComponentRecords = createCollection(ModelTemplateComponentRecords);

	@viewInfo({ containerName: "Tree View and Primary View Synchronization Helper" })
	TreeViewAndPrimaryViewSynchronizationHelper = createSingle(TreeViewAndPrimaryViewSynchronizationHelper);

	@viewInfo({ containerName: "Item Class Nodes" })
	ItemClassNodes = createCollection(ItemClassNodes);
}

export class ItemClass extends PXView {
	ItemClassCD: PXFieldState;
	Descr: PXFieldState;
	ChkServiceManagement: PXFieldState;
}

export class ItemClassSettings extends PXView {
	StkItem: PXFieldState<PXFieldOptions.CommitChanges>;
	NegQty: PXFieldState;
	ExportToExternal: PXFieldState;
	ItemType: PXFieldState<PXFieldOptions.CommitChanges>;
	ValMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	PlanningMethod: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	TaxCategoryID: PXFieldState;

	TaxCalcMode: PXFieldState;

	@controlConfig({ allowEdit: true })
	PostClassID: PXFieldState;

	PostToExpenseAccount: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	LotSerClassID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PriceClassID: PXFieldState;

	@controlConfig({ allowEdit: true })
	AvailabilitySchemeID: PXFieldState;

	CountryOfOrigin: PXFieldState;
	CommodityCodeType: PXFieldState<PXFieldOptions.CommitChanges>;
	HSTariffCode: PXFieldState;
	UndershipThreshold: PXFieldState;
	OvershipThreshold: PXFieldState;

	@controlConfig({ allowEdit: true })
	BaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;

	DecimalBaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	SalesUnit: PXFieldState<PXFieldOptions.CommitChanges>;

	DecimalSalesUnit: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	PurchaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;

	DecimalPurchaseUnit: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "WorkGroupID",
				dataMember: "_EPCompanyTree_Tree_",
				textField: "Description",
				valueField: "Description",
				mode: "single",
				hideRootNode: "true"
			}
		}
	})
	PriceWorkgroupID: PXFieldState;

	@controlConfig({ allowEdit: true })
	PriceManagerID: PXFieldState;

	MinGrossProfitPct: PXFieldState;
	MarkupPct: PXFieldState;

	DefaultRowMatrixAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultColumnMatrixAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;

	DemandCalculation: PXFieldState;

	DefaultBillingRule: PXFieldState;
	RequireRoute: PXFieldState;
	EquipmentItemClass: PXFieldState<PXFieldOptions.CommitChanges>;
	Mem_ShowComponent: PXFieldState;

	PreferredItemClasses: PXFieldState;
	PriceOfSuggestedItems: PXFieldState;
}

export class ItemClassCurySettings extends PXView {
	@controlConfig({ allowEdit: true })
	DfltSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class TreeViewAndPrimaryViewSynchronizationHelper extends PXView {
	Descr: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.Disabled>;
}

@treeConfig({
	idField: "ItemClassID",
	textField: "SegmentedClassCD",
	descriptionField: "Descr",
	mode: "single",
	dynamic: true,
	openedLayers: 1,
	modifiable: false,
	hideRootNode: true,
	syncPosition: true,
	singleClickSelect: true,
	onSelect: "GoToNodeSelectedInTree",
})
export class ItemClassNodes extends PXView {
	ItemClassID: PXFieldState;
	SegmentedClassCD: PXFieldState;
	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	adjustPageSize: true,
})
export class ItemClassUnits extends PXView {
	UnitType: PXFieldState;
	ItemClassID: PXFieldState;
	InventoryID: PXFieldState;
	FromUnit: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitMultDiv: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitRate: PXFieldState<PXFieldOptions.CommitChanges>;
	SampleToUnit: PXFieldState;
}

export class ProductionOrderDefaultSettings extends PXView {
	ReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	AMSourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	AMMinOrdQty: PXFieldState;
	AMMaxOrdQty: PXFieldState;
	AMLotSize: PXFieldState;
	AMMFGLeadTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	initNewRow: true,
})
export class Replenishment extends PXView {
	@controlConfig({ allowEdit: true })
	ReplenishmentClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	ReplenishmentPolicyID: PXFieldState;

	ReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentSourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	TransferLeadTime: PXFieldState;
	TransferERQ: PXFieldState;
	ForecastModelType: PXFieldState;
	ForecastPeriodType: PXFieldState;
	HistoryDepth: PXFieldState;
	LaunchDate: PXFieldState;
	TerminationDate: PXFieldState;
	ServiceLevelPct: PXFieldState;
}

export class InventoryPlanningSettings extends PXView {
	ReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	AMSourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	AMSafetyStock: PXFieldState;
	AMMinQty: PXFieldState;
	AMMinOrdQty: PXFieldState;
	AMMaxOrdQty: PXFieldState;
	AMLotSize: PXFieldState;
	AMMFGLeadTime: PXFieldState;
	AMDaysSupply: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
})
export class RestrictionGroups extends PXView {
	ViewGroupDetails: PXActionState;

	Included: PXFieldState;
	GroupName: PXFieldState;
	SpecificType: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState;
	GroupType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class Mapping extends PXView {
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("CRAttribute_ViewDetails")
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;

	Description: PXFieldState;
	SortOrder: PXFieldState;
	Required: PXFieldState<PXFieldOptions.CommitChanges>;
	ControlType: PXFieldState;
	AttributeCategory: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class ModelTemplateComponentRecords extends PXView {
	ComponentCD: PXFieldState;
	Active: PXFieldState;
	Optional: PXFieldState;
	Qty: PXFieldState;
	Descr: PXFieldState;
	ClassID: PXFieldState;
}
