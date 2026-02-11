import {
	PXScreen,
	viewInfo,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.ShiftMaint", primaryView: "ShiftRecords", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM205000 extends PXScreen {
	ShiftRecords = createCollection(ShiftRecords);
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class ShiftRecords extends PXView {
	ShiftCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	DiffType: PXFieldState;
	ShftDiff: PXFieldState;
	AMCrewSize: PXFieldState;
}
