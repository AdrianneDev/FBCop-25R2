import {
	autoRefresh, readOnly, PXView, gridConfig, PXFieldOptions,
	PXFieldState, linkCommand, columnConfig,
	GridPreset
} from "client-controls";


@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
	allowStoredFilters: true,
})
export class InventoryItemView extends PXView {
	@linkCommand("viewDetails") @columnConfig({ allowFilter: false }) InventoryCD: PXFieldState;
	@columnConfig({ allowFastFilter: true, allowFilter: false }) Descr: PXFieldState<PXFieldOptions.Multiline>;
	@columnConfig({ allowFilter: false }) ImageUrl: PXFieldState;
	@columnConfig({ hideViewLink: true, allowFilter: false }) SiteCD: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowFilter: false }) Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	@autoRefresh @columnConfig({ hideViewLink: true }) @readOnly UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowFilter: false }) IAStatus: PXFieldState;
	SiteQtyAvail: PXFieldState;
	CuryUnitPrice: PXFieldState;
	@columnConfig({ allowFilter: false }) CuryUnitPriceWithSymbol: PXFieldState;
	@columnConfig({ allowFilter: false }) Discount: PXFieldState;
	CategoryID: PXFieldState;
	@columnConfig({ allowFilter: false }) Data: PXFieldState;
}
