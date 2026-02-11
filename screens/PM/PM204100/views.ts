import {
	columnConfig,
	gridConfig,
	GridPreset,
	PXFieldState,
	PXView
} from "client-controls";

@gridConfig({ preset: GridPreset.Primary })
export class RateTypes extends PXView {
	@columnConfig({ width: 150 })
	RateTypeID: PXFieldState;
	@columnConfig({ width: 400 })
	Description: PXFieldState;
}
