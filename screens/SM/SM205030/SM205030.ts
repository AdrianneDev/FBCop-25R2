import {
	createCollection, PXScreen, graphInfo, PXActionState,
	PXView, PXFieldState, gridConfig, columnConfig, GridPreset,
	GridColumnType, linkCommand, TextAlign, actionConfig,
	GridColumnDisplayMode,
	GridNoteFilesShowMode
} from "client-controls";

@graphInfo({
	graphType: "PX.SM.AUScheduleInq",
	primaryView: "Schedule",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class SM205030 extends PXScreen {
	AUScheduleExt_Delete: PXActionState;
	AUScheduleExt_New: PXActionState;

	@actionConfig({ popupCommand: "Refresh" })
	AUScheduleExt_View: PXActionState;

	Schedule = createCollection(AUSchedule);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	defaultAction: "AUScheduleExt_View",
	allowUpdate: false,
	preserveSortsAndFilters: false,
	autoRepaint: ["Schedule"],
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class AUSchedule extends PXView {
	ViewScreen: PXActionState;
	ViewHistory: PXActionState;
	RunSchedule: PXActionState;

	@columnConfig({ type: GridColumnType.Icon, textAlign: TextAlign.Center, width: 60 })
	LastRunStatus: PXFieldState;

	@linkCommand("AUScheduleExt_View")
	@columnConfig({textField: "Description", displayMode: GridColumnDisplayMode.Text, textAlign: TextAlign.Left, width: 300})
	ScheduleID: PXFieldState;

	@columnConfig({hideViewLink: true})
	ScreenID: PXFieldState;

	@columnConfig({ width: 50 })
	IsActive: PXFieldState;

	@columnConfig({ width: 80 })
	StartDate: PXFieldState;

	@columnConfig({ width: 80 })
	EndDate: PXFieldState;

	@columnConfig({ width: 270 })
	TimeZoneID: PXFieldState;

	@columnConfig({ width: 150 })
	LastRunDate: PXFieldState;

	@columnConfig({ width: 320 })
	LastRunResult: PXFieldState;

	@columnConfig({ width: 150 })
	NextRunDateTime: PXFieldState;
}
