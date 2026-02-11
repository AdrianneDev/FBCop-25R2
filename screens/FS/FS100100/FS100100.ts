import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.SetupMaint", primaryView: "SetupRecord" })
export class FS100100 extends PXScreen {
	SetupRecord = createSingle(FSSetup);
}

export class FSSetup extends PXView {
	PostBatchNumberingID: PXFieldState;
	EmpSchdlNumberingID: PXFieldState;
	EquipmentNumberingID: PXFieldState;
	LicenseNumberingID: PXFieldState;
	EnableEmpTimeCardIntegration: PXFieldState<PXFieldOptions.CommitChanges>;
	ManageRooms: PXFieldState<PXFieldOptions.CommitChanges>;
	EnableDfltStaffOnServiceOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	EnableDfltResEquipOnServiceOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowWorkflowStageField: PXFieldState;
	CustomerMultipleBillingOptions: PXFieldState<PXFieldOptions.CommitChanges>;
	AlertBeforeCloseServiceOrder: PXFieldState;
	FilterInvoicingManually: PXFieldState;
	TrackAppointmentLocation: PXFieldState;
	DfltSrvOrdType: PXFieldState;
	DfltSOSrvOrdType: PXFieldState;
	DfltCasesSrvOrdType: PXFieldState;
	DenyWarnBySkill: PXFieldState;
	DenyWarnByGeoZone: PXFieldState;
	DenyWarnByLicense: PXFieldState;
	DenyWarnByAppOverlap: PXFieldState;
	ROWWApiEndPoint: PXFieldState;
	ROWWLicensekey: PXFieldState;
	ROLunchBreakDuration: PXFieldState<PXFieldOptions.CommitChanges>;
	ROLunchBreakStartTimeFrame_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	ROLunchBreakEndTimeFrame_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	CalendarID: PXFieldState<PXFieldOptions.CommitChanges>;
	AppResizePrecision: PXFieldState;
	AppAutoConfirmGap: PXFieldState;
	DfltCalendarPageSize: PXFieldState;
	ShowServiceOrderDaysGap: PXFieldState;
	MapApiKey: PXFieldState;
	GPSRefreshTrackingTime: PXFieldState;
	HistoryTimeAccuracy: PXFieldState;
	HistoryDistanceAccuracy: PXFieldState;
	EnableGPSTracking: PXFieldState;
	DfltCalendarViewMode: PXFieldState;
	TimeRange: PXFieldState;
	TimeFilter: PXFieldState;
	DfltCalendarStartTime_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	DfltCalendarEndTime_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	DayResolution: PXFieldState;
	WeekResolution: PXFieldState;
	MonthResolution: PXFieldState;
}