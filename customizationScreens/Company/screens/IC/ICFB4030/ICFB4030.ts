import { 
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, 
	gridConfig, GridPreset, PXActionState 
} from "client-controls";

@graphInfo({
	graphType: "ICFBCurrency.Graph.ICFBInventoryBookDetailedInq", 
	primaryView: "Filter"
})
export class ICFB4030 extends PXScreen {
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
	DocDate: PXFieldState;
	InventoryCD: PXFieldState;
	Description: PXFieldState;
	BaseUnit: PXFieldState;
	QtyIn: PXFieldState;
	QtyOut: PXFieldState;
	Qty: PXFieldState;
	UnitCost: PXFieldState;
	CuryRate: PXFieldState;
	Amount: PXFieldState;
	UnitCostInPHP: PXFieldState;
	AmountInPHP: PXFieldState;
	Currency: PXFieldState;
	ItemClassID: PXFieldState;
	SiteCD: PXFieldState;
	Location: PXFieldState;
	LotSerialNbr: PXFieldState;
	AgedDays: PXFieldState;
}
