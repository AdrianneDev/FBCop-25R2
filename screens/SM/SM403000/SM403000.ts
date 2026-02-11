import {
	graphInfo,
	createSingle,
	controlConfig,
	gridConfig,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.LocationTrackingInq", primaryView: "Filter" })
export class SM403000 extends PXScreen {
	Filter = createSingle(FSGPSTrackingHistoryFilter);
	LocationTrackingRecords = createCollection(GPSTrackingHistory);
}

export class FSGPSTrackingHistoryFilter extends PXView {
	Date: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class GPSTrackingHistory extends PXView {
	ExecutionDate: PXFieldState;
	Username: PXFieldState;
	FullName: PXFieldState;
	@controlConfig({ allowNull: true }) Latitude: PXFieldState;
	@controlConfig({ allowNull: true }) Longitude: PXFieldState;
	Altitude: PXFieldState;
	Distance: PXFieldState;
}
