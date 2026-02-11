import {
	PXScreen, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, columnConfig, gridConfig, GridPreset, GridFilterBarVisibility,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.EntryTypeMaint", primaryView: "EntryType" })
export class CA203000 extends PXScreen {
	EntryType = createCollection(CAEntryType);
}

@gridConfig({
	preset: GridPreset.Primary,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	fastFilterByAllFields: false,
})
export class CAEntryType extends PXView {

	@columnConfig({ allowFastFilter: true })
	EntryTypeId: PXFieldState<PXFieldOptions.CommitChanges>;

	DrCr: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	Descr: PXFieldState;

	Module: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ReferenceID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	UseToReclassifyPayments: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	Consolidate: PXFieldState;
}
