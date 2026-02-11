import {
	graphInfo,
	gridConfig,
	linkCommand,
	createSingle,
	createCollection,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.RouteAppointmentGPSLocationInq", primaryView: "Filter" })
export class FS404080 extends PXScreen {
	EditAppointment: PXActionState;
	OpenLocationScreen: PXActionState;
	Filter = createSingle(RouteAppointmentGPSLocationFilter);
	RouteAppointmentGPSLocationRecords = createCollection(AppointmentData);
}

export class RouteAppointmentGPSLocationFilter extends PXView {
	RouteID: PXFieldState<PXFieldOptions.CommitChanges>;
	RouteDocumentID: PXFieldState<PXFieldOptions.CommitChanges>;
	ServiceID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTo: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class AppointmentData extends PXView {
	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	RouteID: PXFieldState;

	RouteDocumentID: PXFieldState;

	@linkCommand("EditAppointment")
	RefNbr: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	CustomerID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	@linkCommand("OpenLocationScreen")
	LocationID: PXFieldState;

	ActualDateTimeBegin: PXFieldState;
	Address: PXFieldState;
	GPSStartCoordinate: PXFieldState;
	GPSStartAddress: PXFieldState;
	GPSCompleteCoordinate: PXFieldState;
	GPSCompleteAddress: PXFieldState;
}
