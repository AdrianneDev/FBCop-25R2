import {
	columnConfig,
	gridConfig,
	GridColumnDisplayMode,
	GridFilterBarVisibility,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
	TextAlign
} from "client-controls";

@gridConfig({
	preset: GridPreset.Processing,
})
export class FilteredItems extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	TimeCardCD: PXFieldState;
	EquipmentID: PXFieldState;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		textAlign: TextAlign.Left,
		width: 170
	})
	WeekID: PXFieldState;
	TimeSetupCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeRunCalc: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ width: 80 })
	TimeSuspendCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeTotalCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableSetupCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableRunCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableSuspendCalc: PXFieldState<PXFieldOptions.Disabled>;
	TimeBillableTotalCalc: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
		textAlign: TextAlign.Left,
		width: 130
	})
	EPApproval__ApprovedByID: PXFieldState;
	EPApproval__ApproveDate: PXFieldState;
}
