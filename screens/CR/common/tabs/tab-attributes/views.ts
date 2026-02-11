import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	columnConfig,
	GridFilterBarVisibility,
} from "client-controls";

@gridConfig({
	preset: GridPreset.Details,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CSAttributeGroup extends PXView {
	IsActive: PXFieldState;
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	SortOrder: PXFieldState;
	Required: PXFieldState;
	@columnConfig({ fullState: true })
	DefaultValue: PXFieldState;
	CSAttribute__IsInternal: PXFieldState;
	CSAttribute__ContainsPersonalData: PXFieldState;
	ControlType: PXFieldState;
}
