import {
	SM204030
} from "../SM204030";

import {
	PXView,
	createCollection,
	createSingle,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	gridConfig,
	GridPreset,
	controlConfig,
	IDatetimeEditControlConfig
} from "client-controls";

export interface SM204030_SynchronizationStatus extends SM204030 { }

export class SM204030_SynchronizationStatus {
	ResetContacts: PXActionState;
	ResetTasks: PXActionState;
	ResetEvents: PXActionState;
	ResetEmails: PXActionState;

	CurrentItem = createSingle(EMailSyncAccountFilter);
	OperationLog = createCollection(EMailSyncLog);
}

export class EMailSyncAccountFilter extends PXView {
	ServerID: PXFieldState<PXFieldOptions.Disabled>;
	Address: PXFieldState<PXFieldOptions.Disabled>;
	ContactsExportDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	ContactsExportDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactsImportDate_Date: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	ContactsImportDate_Time: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	TasksExportDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	TasksExportDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	TasksImportDate_Date: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	TasksImportDate_Time: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	EventsExportDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	EventsExportDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	EventsImportDate_Date: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	EventsImportDate_Time: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	EmailsExportDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	EmailsExportDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	EmailsImportDate_Date: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	EmailsImportDate_Time: PXFieldState<PXFieldOptions.Disabled | PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class EMailSyncLog extends PXView {
	ClearLog: PXActionState;
	ResetWarning: PXActionState;

	ServerID: PXFieldState;
	Address: PXFieldState;
	Level: PXFieldState;
	Date: PXFieldState;
	Message: PXFieldState;
}
