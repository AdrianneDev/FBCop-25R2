import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, createCollection, createSingle, PXScreen,
	graphInfo, fieldConfig, PXActionState, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APScheduleRun", primaryView: "Filter", hideFilesIndicator: true, hideNotesIndicator: true })
export class AP504000 extends PXScreen {

	ViewSchedule: PXActionState;

	Filter = createSingle(Parameters);
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

	RunLimit: PXFieldState;
}

@gridConfig({ preset: GridPreset.Processing })
export class Schedule extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@linkCommand("ViewSchedule")
	ScheduleID: PXFieldState;

	ScheduleName: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
	RunCntr: PXFieldState;
	RunLimit: PXFieldState;
	NextRunDate: PXFieldState;
	LastRunDate: PXFieldState;
}
