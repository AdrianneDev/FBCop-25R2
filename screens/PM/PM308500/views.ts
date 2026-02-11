import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset
} from "client-controls";

export class Document extends PXView {
	RefNbr: PXFieldState;
	Status: PXFieldState;
	Hold: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	DelayDays: PXFieldState;
	ExtRefNbr: PXFieldState;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState;
	ProjectIssueID: PXFieldState<PXFieldOptions.CommitChanges>;
	RFIID: PXFieldState<PXFieldOptions.CommitChanges>;
	ChangeOrderNbr: PXFieldState;
	CostChangeOrderNbr: PXFieldState;
	CostTotal: PXFieldState<PXFieldOptions.Disabled>;
	LineTotal: PXFieldState<PXFieldOptions.Disabled>;
	MarkupTotal: PXFieldState<PXFieldOptions.Disabled>;
	GrossMarginPct: PXFieldState<PXFieldOptions.Disabled>;
	PriceTotal: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
}

export class DocumentSettings extends PXView {
	Text: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class Details extends PXView {
	@columnConfig({ hideViewLink: true })
	CostTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostAccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitCost: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtCost: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	RevenueTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	RevenueInventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	RevenueAccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	RevenueCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	LineMarkupPct: PXFieldState<PXFieldOptions.CommitChanges>;
	LineAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsCommitment: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class Markups extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	Amount: PXFieldState;
	MarkupAmount: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
}
