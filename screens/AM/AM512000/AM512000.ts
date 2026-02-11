import {
	PXScreen,
	viewInfo,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	controlConfig,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.APSMaintenanceProcess", primaryView: "ProcessingRecords" })
export class AM512000 extends PXScreen {
	Filter = createSingle(Filter);
	ProcessingRecords = createSingle(ProcessingRecords);
}

export class Filter extends PXView {
	IsWorkCenterCalendarProcess: PXFieldState;
	IsHistoryCleanupProcess: PXFieldState;
}

export class ProcessingRecords extends PXView {
	WorkCenterCalendarProcessLastRunDateTime: PXFieldState;
	@controlConfig({ displayMode: "id" }) WorkCenterCalendarProcessLastRunByID: PXFieldState;
	BlockSizeSyncProcessLastRunDateTime: PXFieldState;
	@controlConfig({ displayMode: "id" }) BlockSizeSyncProcessLastRunByID: PXFieldState;
	LastBlockSize: PXFieldState;
	CurrentBlockSize: PXFieldState;
	HistoryCleanupProcessLastRunDateTime: PXFieldState;
	@controlConfig({ displayMode: "id" }) HistoryCleanupProcessLastRunByID: PXFieldState;
	WorkCalendarProcessLastRunDateTime: PXFieldState;
	@controlConfig({ displayMode: "id" }) WorkCalendarProcessLastRunByID: PXFieldState;
}
