import {
	createCollection,
	PXScreen,
	graphInfo,
	viewInfo,
	PXView,
	PXFieldState,
	gridConfig,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.EP.ClockInClockOut.EPTimeLogTypeMaint", primaryView: "TimeLogTypes"})
export class EP209000 extends PXScreen {
	@viewInfo({containerName: "Time Log Types"})
	TimeLogTypes = createCollection(TimeLogType);
}

@gridConfig({
	preset: GridPreset.Primary
})
export class TimeLogType extends PXView  {
	TimeLogTypeID: PXFieldState;
	Description: PXFieldState;
	EarningTypeID: PXFieldState;
}
