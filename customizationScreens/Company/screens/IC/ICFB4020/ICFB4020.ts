import { 
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, 
	gridConfig, GridPreset, PXFieldOptions 
} from "client-controls";

@graphInfo({
	graphType: "ICFBCurrency.Graph.ICFBInventoryBookSummaryInq", 
	primaryView: "Filter"
})
export class ICFB4020 extends PXScreen {
	Filter = createSingle(ICFBInventoryBookFilter);
	
	@gridConfig({ 
		preset: GridPreset.Details
	})
	InventoryBookResult = createCollection(ICFBInventoryBookResult);
}

export class ICFBInventoryBookFilter extends PXView {
	OrgBAccountID: PXFieldState;
	AsOfDate: PXFieldState;
	Currency: PXFieldState;
	ItemClassID: PXFieldState;
	SiteID: PXFieldState;
	LocationID: PXFieldState;
	LotSerialNbr: PXFieldState;
}

export class ICFBInventoryBookResult extends PXView {
	InventoryCD: PXFieldState;
	Description: PXFieldState;
	BaseUnit: PXFieldState;
	Qty: PXFieldState;
	UnitCost: PXFieldState;
	Amount: PXFieldState;
	AmountInPHP: PXFieldState;
	Currency: PXFieldState;
	ItemClassID: PXFieldState;
	SiteCD: PXFieldState;
	Location: PXFieldState;
	LotSerialNbr: PXFieldState;
}
