import {
	gridConfig,
	GridPreset,
	linkCommand,
	PXFieldOptions,
	PXFieldState,
	PXView,
	columnConfig
} from "client-controls";

export class Item extends PXView {
	ClassID: PXFieldState;
	IsActive: PXFieldState;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	IsAdvance: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ItemSettings extends PXView {
	IsCostBudgetEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	IsRevenueBudgetEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPurchaseOrderEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class Mapping extends PXView {
	IsActive: PXFieldState;
	@linkCommand("CRAttribute_ViewDetails")
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.Multiline>;
	SortOrder: PXFieldState;
	Required: PXFieldState;
	CSAttribute__IsInternal: PXFieldState;
	ControlType: PXFieldState;
	@columnConfig({ fullState: true })
	DefaultValue: PXFieldState;
}
