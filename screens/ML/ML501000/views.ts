import { PXView, PXFieldState, gridConfig, columnConfig, GridColumnType, TextAlign, GridPreset } from "client-controls";

@gridConfig({
	preset: GridPreset.Inquiry
})
export class MLEventGroup extends PXView  {
	@columnConfig({width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	Selected: PXFieldState;
	Type: PXFieldState;
	Count: PXFieldState;
	LastEventUtc: PXFieldState;
}