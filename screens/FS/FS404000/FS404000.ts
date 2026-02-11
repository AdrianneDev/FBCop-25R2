import {
	graphInfo,
	createSingle,
	gridConfig,
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

@graphInfo({ graphType: "PX.Objects.FS.RoutePendingInq", primaryView: "Filter" })
export class FS404000 extends PXScreen {
	OpenRouteClosing: PXActionState;
	Filter = createSingle(RouteWrkSheetFilter);
	Routes = createCollection(FSRouteDocument);
}

export class RouteWrkSheetFilter extends PXView {
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class FSRouteDocument extends PXView {
	RefNbr: PXFieldState;
	RouteID: PXFieldState;
	FSRoute__RouteShort: PXFieldState;
	TripNbr: PXFieldState;
	Status: PXFieldState;
	Date: PXFieldState;
	TimeBegin_Time: PXFieldState;
	TimeEnd_Time: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	DriverID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	AdditionalDriverID: PXFieldState<PXFieldOptions.CommitChanges>;

	VehicleID: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalNumAppointments: PXFieldState;
	TotalServices: PXFieldState;
	TotalDuration: PXFieldState;
	TotalServicesDuration: PXFieldState;
	TotalTravelTime: PXFieldState;
}
