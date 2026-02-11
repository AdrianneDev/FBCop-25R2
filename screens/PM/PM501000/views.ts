import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@gridConfig({
	preset: GridPreset.Processing,
})
export class Items extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 35
	})
	Selected: PXFieldState;
	RefNbr: PXFieldState<PXFieldOptions.Disabled>;
	Date: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled>;
}
