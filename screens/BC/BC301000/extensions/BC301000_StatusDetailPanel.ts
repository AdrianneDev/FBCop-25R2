import {
	BC301000
} from "../BC301000";

import {
	PXView,
	PXFieldState,
	gridConfig,
	GridPreset,
	createCollection,
	linkCommand,
} from "client-controls";

export interface BC301000_StatusDetailPanel extends BC301000 { }
export class BC301000_StatusDetailPanel {
	StatusDetailsPanel = createCollection(StatusDetailsPanel);
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
})
export class StatusDetailsPanel extends PXView {
	EntityType: PXFieldState;

	@linkCommand("NavigateDetailLocal")
	LocalID: PXFieldState;

	@linkCommand("NavigateDetailLocal")
	Source: PXFieldState;

	@linkCommand("NavigateDetailExtern")
	ExternID: PXFieldState;
}
