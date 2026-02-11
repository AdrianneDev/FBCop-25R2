import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnDisplayMode,
	PXFieldOptions,
	PXFieldState,
	PXView,
	GridPreset,
	GridFilterBarVisibility
} from "client-controls";

export class Filter extends PXView {
	AllocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: [
		"ContractCD",
		"Customer__CustomerClassID",
	],
})
export class Items extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 35,
	})
	Selected: PXFieldState;
	@linkCommand("ViewProject")
	ContractCD: PXFieldState;
	Description: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Both,
		hideViewLink: true,
	})
	AllocationID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	Customer__CustomerClassID: PXFieldState<PXFieldOptions.Disabled>;
}
