import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXPageLoadBehavior, PXView, PXFieldState, controlConfig, gridConfig, GridPreset,
	headerDescription, PXFieldOptions, columnConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARDiscountSequenceMaint", primaryView: "Sequence",
	pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord, showUDFIndicator: true
})
export class AR209500 extends PXScreen {

	@viewInfo({ containerName: "Discount Sequence Summary" })
	Sequence = createSingle(DiscountSequence);

	Discount = createSingle(ARDiscount);

	@viewInfo({ containerName: "Update Discounts" })
	UpdateSettings = createSingle(UpdateSettingsFilter);

	@viewInfo({ containerName: "Discount Breakpoints" })
	Details = createCollection(DiscountDetail);

	@viewInfo({ containerName: "Items" })
	Items = createCollection(DiscountItem);

	@viewInfo({ containerName: "Customers" })
	Customers = createCollection(DiscountCustomer);

	@viewInfo({ containerName: "Customer Price Classes" })
	CustomerPriceClasses = createCollection(DiscountCustomerPriceClass);

	@viewInfo({ containerName: "Item Price Classes" })
	InventoryPriceClasses = createCollection(DiscountInventoryPriceClass);

	@viewInfo({ containerName: "Branches" })
	Branches = createCollection(DiscountBranch);

	@viewInfo({ containerName: "Warehouses" })
	Sites = createCollection(DiscountSite);

	@viewInfo({ containerName: "Free Item" })
	CurrentSequence = createSingle(DiscountSequence2);
}

export class DiscountSequence extends PXView {

	DiscountID: PXFieldState;
	DiscountSequenceID: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPromotion: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	@controlConfig({ rows: 1 })
	Description: PXFieldState<PXFieldOptions.Multiline>;

	DiscountedFor: PXFieldState<PXFieldOptions.CommitChanges>;
	BreakBy: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	Prorate: PXFieldState;
	EndDate: PXFieldState;
	ShowFreeItem: PXFieldState;

}

export class DiscountSequence2 extends PXView {

	@controlConfig({ allowEdit: true })
	FreeItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	PendingFreeItemID: PXFieldState;

	@controlConfig({ allowEdit: true })
	LastFreeItemID: PXFieldState;

	UpdateDate: PXFieldState<PXFieldOptions.Disabled>;

}

export class ARDiscount extends PXView {

	showListOfItems: PXFieldState;
	ShowCustomers: PXFieldState;
	ShowCustomerPriceClass: PXFieldState;
	ShowInventoryPriceClass: PXFieldState;
	ShowBranches: PXFieldState;
	ShowSites: PXFieldState;
}

export class UpdateSettingsFilter extends PXView {

	FilterDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details, initNewRow: true
})
export class DiscountDetail extends PXView {

	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	Quantity: PXFieldState;
	Amount: PXFieldState;
	Discount: PXFieldState;
	DiscountPercent: PXFieldState;
	FreeItemQty: PXFieldState;
	PendingQuantity: PXFieldState;
	PendingAmount: PXFieldState;
	PendingDiscount: PXFieldState;
	PendingDiscountPercent: PXFieldState;
	PendingFreeItemQty: PXFieldState;
	StartDate: PXFieldState;
	LastQuantity: PXFieldState;
	LastAmount: PXFieldState;
	LastDiscount: PXFieldState;
	LastDiscountPercent: PXFieldState;
	LastFreeItemQty: PXFieldState;
	LastDate: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class DiscountItem extends PXView {

	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	InventoryItem__Descr: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class DiscountCustomer extends PXView {

	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;

	Customer__AcctName: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class DiscountCustomerPriceClass extends PXView {

	@columnConfig({ format: ">aaaaaaaaaa", hideViewLink: true })
	CustomerPriceClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	ARPriceClass__Description: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class DiscountInventoryPriceClass extends PXView {

	@columnConfig({ format: ">aaaaaaaaaa", hideViewLink: true })
	InventoryPriceClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	INPriceClass__Description: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class DiscountBranch extends PXView {

	@columnConfig({ format: ">aaaaaaaaaa", hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	Branch__AcctName: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class DiscountSite extends PXView {

	@columnConfig({ format: ">aaaaaaaaaa", hideViewLink: true })
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;

	INSite__Descr: PXFieldState;
}
