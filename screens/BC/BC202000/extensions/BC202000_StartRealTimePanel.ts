import {
	BC202000
} from "../BC202000";

import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	createSingle,
} from "client-controls";

export interface BC202000_StartRealTimePanel extends BC202000 { }
export class BC202000_StartRealTimePanel {
	StartRealTimePanel = createSingle(StartRealTimePanel);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
})
export class StartRealTimePanel extends PXView {
	RealTimeURL: PXFieldState<PXFieldOptions.CommitChanges>;
}
