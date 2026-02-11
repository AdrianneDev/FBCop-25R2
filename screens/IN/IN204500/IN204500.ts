import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,
	createSingle,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
	fieldConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INItemSiteMaint",
	primaryView: "itemsiterecord",
	showActivitiesIndicator: true,
	showUDFIndicator: true,
})
export class IN204500 extends PXScreen {
	ViewBOM: PXActionState;
	ViewPlanningBOM: PXActionState;
	UpdateReplenishment: PXActionState;

	@viewInfo({ containerName: "Item/Warehouse Summary" })
	itemsiterecord = createSingle(INItemSite);

	@viewInfo({ containerName: "General" })
	itemsitesettings = createSingle(INItemSiteGeneral);

	@viewInfo({ containerName: "Replenishment Settings" })
	PlanningReplenishmentSettings = createSingle(INItemSiteReplenishmentSettings);

	@viewInfo({ containerName: "Preferred Vendor" })
	preferedVendorFields = createSingle(INItemSitePreferredVendor);

	@viewInfo({ containerName: "Vendor Inventory" })
	PreferredVendorItem = createSingle(POVendorInventory);

	@viewInfo({ containerName: "Subitem Replenishment Info" })
	subitemrecords = createCollection(SubitemReplenishment);
}

export class INItemSite extends PXView {
	InventoryID: PXFieldState;
	SiteID: PXFieldState;
	SiteStatus: PXFieldState;
	ProductManagerOverride: PXFieldState<PXFieldOptions.CommitChanges>;

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
	ProductWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;

	ProductManagerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class INItemSiteGeneral extends PXView {
	DfltShipLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltReceiptLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltPutawayLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ABCCodeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ABCCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ABCCodeIsFixed: PXFieldState;
	MovementClassOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MovementClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	MovementClassIsFixed: PXFieldState;
	CountryOfOrigin: PXFieldState;
	OverrideInvtAcctSub: PXFieldState<PXFieldOptions.CommitChanges>;
	InvtAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvtSubID: PXFieldState;
	PlanningMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	StdCostOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	LastStdCost_Label: PXFieldState;
	LastStdCost: PXFieldState<PXFieldOptions.Disabled>;
	StdCost_Label: PXFieldState;
	StdCost: PXFieldState<PXFieldOptions.Disabled>;
	StdCostDate: PXFieldState<PXFieldOptions.Disabled>;
	PendingStdCost_Label: PXFieldState;
	PendingStdCost: PXFieldState<PXFieldOptions.CommitChanges>;
	PendingStdCostDate: PXFieldState;

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
	PriceWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceManagerID: PXFieldState;
	Commissionable: PXFieldState;
	MarkupPctOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MarkupPct: PXFieldState;
	RecPriceOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	RecPrice_Label: PXFieldState;
	RecPrice: PXFieldState;
	LastCost_Label: PXFieldState;
	LastCost: PXFieldState;
	AvgCost_Label: PXFieldState;
	AvgCost: PXFieldState;
	MinCost_Label: PXFieldState;
	MinCost: PXFieldState;
	MaxCost_Label: PXFieldState;
	MaxCost: PXFieldState;
}

export class INItemSiteReplenishmentSettings extends PXView {
	ReplenishmentClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentPolicyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentPolicyID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentSourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxShelfLife: PXFieldState;
	MaxShelfLifeOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	LaunchDate: PXFieldState;
	LaunchDateOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	TerminationDate: PXFieldState;
	TerminationDateOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	ServiceLevelPct: PXFieldState;
	ServiceLevelOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	SafetyStock: PXFieldState;
	SafetyStockOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MinQty: PXFieldState;
	MinQtyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxQty: PXFieldState;
	MaxQtyOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	TransferERQ: PXFieldState;
	TransferERQOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	DemandPerDayAverage: PXFieldState<PXFieldOptions.Disabled>;
	DemandPerDaySTDEV: PXFieldState<PXFieldOptions.Disabled>;
	LeadTimeAverage: PXFieldState<PXFieldOptions.Disabled>;
	LeadTimeSTDEV: PXFieldState<PXFieldOptions.Disabled>;
	SafetyStockSuggested: PXFieldState<PXFieldOptions.Disabled>;
	MinQtySuggested: PXFieldState<PXFieldOptions.Disabled>;
	LastForecastDate: PXFieldState<PXFieldOptions.Disabled>;
}

export class INItemSitePreferredVendor extends PXView {
	PreferredVendorOverride: PXFieldState<PXFieldOptions.CommitChanges>;
	PreferredVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	PreferredVendorLocationID: PXFieldState;
	InventoryItem__DefaultSubItemID: PXFieldState;
}

export class POVendorInventory extends PXView {
	VLeadTime: PXFieldState<PXFieldOptions.Disabled>;
	AddLeadTimeDays: PXFieldState<PXFieldOptions.Disabled>;
	MinOrdFreq: PXFieldState<PXFieldOptions.Disabled>;
	MinOrdQty: PXFieldState<PXFieldOptions.Disabled>;
	MaxOrdQty: PXFieldState<PXFieldOptions.Disabled>;
	LotSize: PXFieldState<PXFieldOptions.Disabled>;
	ERQ: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class SubitemReplenishment extends PXView {
	UpdateReplenishment: PXActionState;

	SubItemID: PXFieldState;
	SafetyStock: PXFieldState;
	MinQty: PXFieldState;
	MaxQty: PXFieldState;
	TransferERQ: PXFieldState;
	SafetyStockSuggested: PXFieldState;
	MinQtySuggested: PXFieldState;
	MaxQtySuggested: PXFieldState;
	DemandPerDayAverage: PXFieldState;
	DemandPerDaySTDEV: PXFieldState;
	ItemStatus: PXFieldState;
}
