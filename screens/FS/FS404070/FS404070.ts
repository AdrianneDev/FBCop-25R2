import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.RouteAppointmentForecastingInq", primaryView: "Filter" })
export class FS404070 extends PXScreen {
	Filter = createSingle(RouteAppointmentForecastingFilter);
	RouteAppointmentForecastingRecords = createCollection(FSRouteAppointmentForecasting);
}

@gridConfig({
	preset: GridPreset.Inquiry
})
export class FSRouteAppointmentForecasting extends PXView {
	StartDate: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	RouteID: PXFieldState;

	FSSchedule__RefNbr: PXFieldState;
	ServiceContractID: PXFieldState;
	FSServiceContract__CustomerContractNbr: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	CustomerID: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	CustomerLocationID: PXFieldState;
}

export class RouteAppointmentForecastingFilter extends PXView {
	RouteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ServiceID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DateBegin: PXFieldState<PXFieldOptions.CommitChanges>;
	DateEnd: PXFieldState<PXFieldOptions.CommitChanges>;
}
