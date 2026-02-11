import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	linkCommand,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	columnConfig,
	GridPreset,
	GridColumnDisplayMode,
	GridNoteFilesShowMode
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.RouteScheduleProcess", primaryView: "Filter" })
export class FS500200 extends PXScreen {
	OpenScheduleScreenBySchedules: PXActionState;
	OpenScheduleScreenByGenerationLogError: PXActionState;
	OpenServiceContractScreenBySchedules: PXActionState;
	OpenServiceContractScreenByGenerationLogError: PXActionState;
	Filter = createSingle(RouteServiceContractFilter);
	RouteContractSchedules = createCollection(FSRouteContractScheduleFSServiceContract);
	ContractHistoryRecords = createCollection(FSContractGenerationHistory);
	ErrorMessageRecords = createCollection(FSGenerationLogError);
}

export class RouteServiceContractFilter extends PXView {
	RouteID: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ToDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PreassignedDriver: PXFieldState;
	PreassignedVehicle: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class FSRouteContractScheduleFSServiceContract extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	CustomerID: PXFieldState;

	@linkCommand("OpenServiceContractScreenBySchedules")
	ServiceContractRefNbr: PXFieldState;

	CustomerContractNbr: PXFieldState;
	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerLocationID: PXFieldState;

	CustomerLocationID_description: PXFieldState;
	RecurrenceDescription: PXFieldState;

	@linkCommand("OpenScheduleScreenBySchedules")
	RefNbr: PXFieldState;

	StartDate: PXFieldState;
	EndDate: PXFieldState;
	LastGeneratedElementDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class FSContractGenerationHistory extends PXView {
	GenerationID: PXFieldState;
	LastGeneratedElementDate: PXFieldState;
	LastProcessedDate: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
})
export class FSGenerationLogError extends PXView {
	ClearAll: PXActionState;
	GenerationID: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both })
	FSServiceContract__CustomerID: PXFieldState;

	@linkCommand("OpenServiceContractScreenByGenerationLogError")
	FSServiceContract__RefNbr: PXFieldState;

	@linkCommand("OpenScheduleScreenByGenerationLogError")
	FSSchedule__RefNbr: PXFieldState;

	ErrorDate: PXFieldState;
	ErrorMessage: PXFieldState;
}
