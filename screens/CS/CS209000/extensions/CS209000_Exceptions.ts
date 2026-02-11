import { CS209000 } from "../CS209000";
import {
	createCollection,
	createSingle,
	PXFieldState,
	gridConfig,
	GridPreset,
	PXView,
	PXFieldOptions,
	columnConfig,
} from "client-controls";

export interface CS209000_Exceptions extends CS209000 {}
export class CS209000_Exceptions {
	CSCalendarExceptions = createCollection(CSCalendarExceptions);
	Filter = createSingle(Filter);
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
})
export class CSCalendarExceptions extends PXView {
	Date: PXFieldState<PXFieldOptions.CommitChanges>;
	DayOfWeek: PXFieldState;
	Description: PXFieldState;
	WorkDay: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }})
	StartTime: PXFieldState;
	@columnConfig({ editorConfig: { timeMode: true }})
	EndTime: PXFieldState;
	UnpaidTime: PXFieldState;
}

export class Filter extends PXView {
	YearID: PXFieldState<PXFieldOptions.CommitChanges>;
}
