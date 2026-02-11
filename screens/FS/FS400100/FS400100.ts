import {
	graphInfo,
	gridConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	createCollection,
	linkCommand,
	PXActionState,
	columnConfig,
	GridPreset,
	GridColumnDisplayMode,
	PXPageLoadBehavior,
	GridAutoGrowMode,
	GridPagerMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.AppointmentInq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class FS400100 extends PXScreen {
	EditDetail: PXActionState;
	Filter = createSingle(AppointmentInqFilter);
	Appointments = createCollection(FSAppointmentFSServiceOrder);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class FSAppointmentFSServiceOrder extends PXView {
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SrvOrdType: PXFieldState;

	SORefNbr: PXFieldState;

	@linkCommand("EditDetail")
	RefNbr: PXFieldState;

	DocDesc: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	CustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	LocationID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	BillCustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	BillLocationID: PXFieldState;

	ScheduledDateTimeBegin: PXFieldState;
	ScheduledDateTimeBegin_Time: PXFieldState;
	ScheduledDateTimeEnd: PXFieldState;
	ActualDateTimeBegin: PXFieldState;
	ActualDateTimeEnd: PXFieldState;
	Status: PXFieldState;
	Finished: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	WFStageID: PXFieldState;

	Confirmed: PXFieldState;
	EstimatedLineTotal: PXFieldState;
	LineTotal: PXFieldState;
	Priority: PXFieldState;
	EstimatedDurationTotal: PXFieldState;
	ActualDurationTotal: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	FSCustomerBillingSetup__BillingCycleID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ServiceContractID: PXFieldState;

	BillServiceContractID: PXFieldState;
	State: PXFieldState;
	City: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	FSGeoZonePostalCode__GeoZoneID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	RoomID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	RouteID: PXFieldState;

	RouteDocumentID: PXFieldState;
	WaitingForParts: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	ProjectID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	DfltProjectTaskID: PXFieldState;
}

export class AppointmentInqFilter extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	SORefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	ServiceContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduleID: PXFieldState<PXFieldOptions.CommitChanges>;
	StaffMemberID: PXFieldState<PXFieldOptions.CommitChanges>;
	SMEquipmentID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromScheduledDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ToScheduledDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
}
