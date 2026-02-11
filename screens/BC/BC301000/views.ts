import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	gridConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

export class MasterView extends PXView {
	BindingID: PXFieldState<PXFieldOptions.CommitChanges>;
	EntityType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Primary,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	actionsConfig: {
		delete: { hidden: true },
	},
})
export class DetailsView extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 60,
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, })
	SyncID: PXFieldState;

	ConnectorType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("NavigateEntity")
	EntityType: PXFieldState;

	BindingID: PXFieldState;

	@linkCommand("NavigateLocal")
	LocalID: PXFieldState;

	@linkCommand("NavigateLocal")
	Source: PXFieldState;

	@linkCommand("NavigateExtern")
	ExternID: PXFieldState;

	ExternDescription: PXFieldState;
	@columnConfig({ allowFastFilter: true, })
	Status: PXFieldState;

	PendingSync: PXFieldState;
	BCEntity__PrimarySystem: PXFieldState;
	BCEntity__Direction: PXFieldState;

	@columnConfig({ format: "g", })
	LocalTS: PXFieldState;

	@columnConfig({ format: "g", })
	ExternTS: PXFieldState;

	ExternHash: PXFieldState;
	LastErrorMessage: PXFieldState;
	LastOperation: PXFieldState;

	@columnConfig({ format: "g", })
	LastOperationTS: PXFieldState;

	AttemptCount: PXFieldState;
	BCEntity__IsActive: PXFieldState;

	@columnConfig({ format: "g" })
	LocalCreatedTS: PXFieldState;

	@columnConfig({ format: "g" })
	ExternCreatedTS: PXFieldState;
}
