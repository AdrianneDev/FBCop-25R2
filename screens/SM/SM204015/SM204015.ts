import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.SM.EMailSyncServerMaint",
	primaryView: "Servers",
	bpEventsIndicator: true,
})
export class SM204015 extends PXScreen {
	Servers = createSingle(EMailSyncServer);
	SyncAccounts = createCollection(EMailSyncAccount);
}

export class EMailSyncServer extends PXView {
	AccountCD: PXFieldState;
	Address: PXFieldState;
	ServerType: PXFieldState<PXFieldOptions.CommitChanges>;
	AuthenticationMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	AzureTenantID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	OAuthApplicationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Password: PXFieldState;
	IsActive: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultPolicyName: PXFieldState;
	ServerUrl: PXFieldState;
	LoggingLevel: PXFieldState;
	ConnectionMode: PXFieldState;
	SyncProcBatch: PXFieldState;
	SyncUpdateBatch: PXFieldState;
	SyncSelectBatch: PXFieldState;
	SyncAttachmentSize: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class EMailSyncAccount extends PXView {
	@columnConfig({ allowUpdate: false })
	SyncAccount: PXFieldState;
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowUpdate: false, width: 150 })
	EmployeeCD: PXFieldState;
	@columnConfig({ allowUpdate: false, width: 150 })
	EmployeeStatus: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Address: PXFieldState;
	@columnConfig({ allowUpdate: false })
	PolicyName: PXFieldState;
}
