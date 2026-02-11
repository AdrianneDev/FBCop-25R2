import {
	gridConfig,
	GridPreset,
	PXFieldState,
	PXView
} from "client-controls";

@gridConfig({
	preset: GridPreset.Primary,
})
export class RateTables extends PXView {
	RateTableID: PXFieldState;
	Description: PXFieldState;
}
