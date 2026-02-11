import {
	PXScreen,
	PXView,
	PXFieldState,

	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INPICycleMaint",
	primaryView: "PICycles",
})
export class IN208700 extends PXScreen {
	@viewInfo({ containerName: "PI Cycle" })
	PICycles = createCollection(INPICycle);
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class INPICycle extends PXView {
	CycleID: PXFieldState;
	Descr: PXFieldState;
	CountsPerYear: PXFieldState;
}