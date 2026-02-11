import {
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXScreen,
	createSingle,
	createCollection,
	PXFieldOptions,
	columnConfig,
	GridColumnShowHideMode,
	linkCommand,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({ graphType: "PX.SM.EmailSendReceiveMaint", primaryView: "Filter", hideFilesIndicator: true, hideNotesIndicator: true })
export class SM507010 extends PXScreen {
	Filter = createSingle(EmailProcessingFilter);
	FilteredItems = createCollection(EMailAccount);
}
@gridConfig({
	preset: GridPreset.Processing,
	allowUpdate: false,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class EMailAccount extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@linkCommand("ViewDetails")
	Description: PXFieldState;
	Address: PXFieldState;
	InboxCount: PXFieldState;
	EMailAccountStatistics__LastReceiveDateTime: PXFieldState;
	OutboxCount: PXFieldState;
	EMailAccountStatistics__LastSendDateTime: PXFieldState;
}

export class EmailProcessingFilter extends PXView {
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
}
