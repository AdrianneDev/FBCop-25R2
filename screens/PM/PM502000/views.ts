import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnDisplayMode,
	GridFilterBarVisibility,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView
} from "client-controls";

export class Filter extends PXView {
	AllocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: [
		"ProjectID",
		"TaskCD",
		"Customer__CustomerClassID"
	]
})
export class Items extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 35,
	})
	Selected: PXFieldState;
	@linkCommand("ViewProject")
	ProjectID: PXFieldState<PXFieldOptions.Disabled>;
	@linkCommand("ViewTask")
	TaskCD: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Both,
		hideViewLink: true
	})
	AllocationID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	Customer__CustomerClassID: PXFieldState<PXFieldOptions.Disabled>;
}
