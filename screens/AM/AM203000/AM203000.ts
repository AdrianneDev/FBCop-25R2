import {
	PXScreen,
	viewInfo,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.MPSType", primaryView: "AMMPSTypeRecords", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM203000 extends PXScreen {
	AMMPSTypeRecords = createCollection(AMMPSTypeRecords);
}

@gridConfig({
	preset: GridPreset.Primary,
	initNewRow: true,
})
export class AMMPSTypeRecords extends PXView {
	MPSTypeID: PXFieldState;
	Descr: PXFieldState;
	MPSNumberingID: PXFieldState;
	Dependent: PXFieldState;
}
