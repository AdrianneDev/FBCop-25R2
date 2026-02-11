import {
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	createSingle,
	linkCommand,
	PXFieldOptions,
	GridPreset,
	GridNoteFilesShowMode,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

@graphInfo({ graphType: "PX.SM.PreferencesEmailMaint", primaryView: "Prefs" })
export class SM204001 extends PXScreen {
	Prefs = createSingle(Prefs);
}

export class Prefs extends PXView {
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultEMailAccountID: PXFieldState;
	EmailTagPrefix: PXFieldState;
	EmailTagSuffix: PXFieldState;
	ArchiveEmailsOlderThan: PXFieldState;
	RepeatOnErrorSending: PXFieldState;
	SuspendEmailProcessing: PXFieldState<PXFieldOptions.CommitChanges>;
	SendUserEmailsImmediately: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailProcessingLogging: PXFieldState;
	EmailProcessingLoggingRetentionPeriod: PXFieldState;
	NotificationSiteUrl: PXFieldState;
}
