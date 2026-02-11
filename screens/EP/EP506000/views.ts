import { gridConfig, GridNoteFilesShowMode, GridPagerMode, GridPreset, PXActionState, PXFieldState, PXView } from "client-controls";

@gridConfig({
	preset: GridPreset.Attributes,
	caption: "",
	syncPosition: true,
	generateColumns: 0,
	autoAdjustColumns: true,
	pageSize: 0,
	columns: [
		{field: "ClassIcon", allowFocus: true, allowUpdate: false},
		{field: "Subject", allowFocus: true, allowUpdate: false},
		{field: "StartDate", allowFocus: true, allowUpdate: false},
	],
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true }
	},
	allowUpdate: false,
	allowDelete: false,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	pagerMode: GridPagerMode.InfiniteScroll,
})
export class ReminderList extends PXView {
	ClassIcon: PXFieldState;
	Subject: PXFieldState;
	StartDate: PXFieldState;
}
export class DeferFilter extends PXView {
	Type: PXFieldState;
	DeferCurrent: PXActionState;
}
