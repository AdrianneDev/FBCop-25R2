import {
	createCollection, createSingle,
	PXScreen, PXView, PXFieldState, PXActionState,
	graphInfo, viewInfo, gridConfig, columnConfig, fieldConfig, linkCommand,
	PXFieldOptions, GridPreset
} from "client-controls";


@graphInfo({
	graphType: "PX.Objects.AR.ARScheduleRun", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class AR504000 extends PXScreen {
	editDetail: PXActionState;

	@viewInfo({containerName: "Selection"})
	Filter = createSingle(Parameters);

	@viewInfo({containerName: "Schedules"})
	Schedule_List = createCollection(Schedule);
}

export class Parameters extends PXView {
	ExecutionDate: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({
		controlType: "qp-radio",
		controlConfig: {
			name: "LimitTypeSelRB"
		}
	})
	LimitTypeSel: PXFieldState<PXFieldOptions.CommitChanges>;

	RunLimit: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	preset: GridPreset.Processing,
	quickFilterFields: ["ScheduleID", "ScheduleName"]
})
export class Schedule extends PXView {
	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@linkCommand("editDetail")
	ScheduleID: PXFieldState;

	ScheduleName: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	RunCntr: PXFieldState;
	RunLimit: PXFieldState;
	NextRunDate: PXFieldState;
	LastRunDate: PXFieldState;
}
