import {
	PXView,
	PXFieldState,
	columnConfig,
	linkCommand,
	gridConfig,
	GridPagerMode,
	GridPreset,
} from "client-controls";

@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: true,
	allowUpdate: false,
	allowDelete: true,
	pagerMode: GridPagerMode.Numeric,
	allowSkipTabs: false,
	autoRepaint: ["ErrorHistory", "ScreenToolbar", "SidePanelNavigationData"],
	fastFilterByAllFields: false,
	quickFilterFields: ["Subject", "MailFrom", "Owner"],
	initNewRow: true,
})
export class APInvoice extends PXView {
	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	@linkCommand("editRecord")
	Subject: PXFieldState;

	@columnConfig({ width: 120 })
	Status: PXFieldState;

	@columnConfig({ width: 130 })
	@linkCommand("viewDocument")
	DocumentLink: PXFieldState;

	@columnConfig({ width: 120 })
	CreatedDateTime: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	MailFrom: PXFieldState;

	@columnConfig({ allowUpdate: true, width: 110 })
	RecognizedRecordDetail__VendorID: PXFieldState;

	RecognizedRecordDetail__Amount: PXFieldState;

	@columnConfig({ allowFastFilter: true, width: 130 })
	Owner: PXFieldState;

	RecognizedRecordDetail__Date: PXFieldState;
	RecognizedRecordDetail__DueDate: PXFieldState;
	RecognizedRecordDetail__VendorRef: PXFieldState;
	RecognizedRecordDetail__DefaultBranchID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	caption: "History List",
	autoAdjustColumns: true,
})
export class ErrorHistory extends PXView {
	@columnConfig({ width: 200 })
	ErrorMessage: PXFieldState;

	@columnConfig({ width: 200 })
	CloudFileId: PXFieldState;

	@columnConfig({ width: 120 })
	CreatedDateTime: PXFieldState;
}
