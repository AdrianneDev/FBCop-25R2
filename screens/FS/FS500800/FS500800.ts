import {
	graphInfo,
	gridConfig,
	columnConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.CloseRouteProcess", primaryView: "Filter" })
export class FS500800 extends PXScreen {
	OpenRoute: PXActionState;
	Filter = createSingle(RouteFilter);
	RouteDocs = createCollection(FSRouteDocument);
}

@gridConfig({
	preset: GridPreset.Processing
})
export class FSRouteDocument extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	RefNbr: PXFieldState;
	RouteID: PXFieldState;
	FSRoute__RouteShort: PXFieldState;
	Status: PXFieldState;
	Date: PXFieldState;
	TimeBegin_Time: PXFieldState;
	TimeEnd_Time: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	DriverID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	AdditionalDriverID: PXFieldState;

	VehicleID: PXFieldState;
	AdditionalVehicleID1: PXFieldState;
	AdditionalVehicleID2: PXFieldState;
	TotalNumAppointments: PXFieldState;
	TotalServices: PXFieldState;
	TotalDuration: PXFieldState;
	TotalServicesDuration: PXFieldState;
}

export class RouteFilter extends PXView {
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowClosedRoutes: PXFieldState<PXFieldOptions.CommitChanges>;
}
