import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FS.CalendarWeekCodeMaint",
	primaryView: "CalendarWeekCodeRecords",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class FS205900 extends PXScreen {
	CalendarWeekCodeRecords = createCollection(FSWeekCodeDate);
	CalendarWeekCodeGenerationOptions = createSingle(CalendarWeekCodeGeneration);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false,
	allowImport: true,
})
export class FSWeekCodeDate extends PXView {
	WeekCodeDate: PXFieldState<PXFieldOptions.CommitChanges>;
	WeekCode: PXFieldState<PXFieldOptions.CommitChanges>;
	WeekCodeP1: PXFieldState;
	WeekCodeP2: PXFieldState;
	WeekCodeP3: PXFieldState;
	WeekCodeP4: PXFieldState;
	Mem_DayOfWeek: PXFieldState;
	Mem_WeekOfYear: PXFieldState;
	BeginDateOfWeek: PXFieldState;
	EndDateOfWeek: PXFieldState;
}

export class CalendarWeekCodeGeneration extends PXView {
	DefaultStartDate: PXFieldState;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	InitialWeekCode: PXFieldState;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
}
