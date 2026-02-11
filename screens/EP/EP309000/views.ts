import {
	controlConfig,
	PXView,
	PXFieldState,
	readOnly
} from "client-controls";

export class EPClockInTimerData extends PXView {
	@controlConfig({ linkCommand: "Open", allowEdit: true })
	@readOnly Summary: PXFieldState;
	@controlConfig({ linkCommand: "Open", allowEdit: true })
	@readOnly EntityName: PXFieldState;
	@controlConfig({ linkCommand: "Open", allowEdit: true })
	@readOnly DocumentNbr: PXFieldState;
	TimeLogTypeID: PXFieldState;
	@readOnly Status: PXFieldState;
	@readOnly TimerDisplay: PXFieldState;
	@readOnly RelatedEntityType: PXFieldState;
	StartDateUTC: PXFieldState;
	TimeSpent: PXFieldState;
	IsClockIn: PXFieldState;
	IsPause: PXFieldState;
	IsStop: PXFieldState;
	IsStart: PXFieldState;
	NoteID: PXFieldState;
}
