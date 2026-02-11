import {
	PXView,
	PXFieldState,
	linkCommand,
	columnConfig,
	graphInfo,
	PXScreen,
	createCollection,
	createSingle,
	gridConfig,
	PXActionState,
	PXFieldOptions,
	GridPreset,
	GridNoteFilesShowMode,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CS.Email.EmailsSyncMaint",
	primaryView: "Filter",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class SM204030 extends PXScreen {
	ViewEmployee: PXActionState;

	Filter = createSingle(EMailAccountSyncFilter);

	@linkCommand("Status")
	SelectedItems = createCollection(EMailSyncAccount);

	@handleEvent(CustomEventType.RowSelected, { view: "SelectedItems" })
	onItemSelected(args: RowSelectedHandlerArgs<PXViewCollection<EMailSyncAccount>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model?.Status) {
			model.Status.enabled = !!ar;
		}
	}
}

export class EMailAccountSyncFilter extends PXView {
	ServerID: PXFieldState<PXFieldOptions.CommitChanges>;
	PolicyName: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class EMailSyncAccount extends PXView {
	Status: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	ServerID: PXFieldState;
	Address: PXFieldState;
	EmailAccountID: PXFieldState;
	@linkCommand<SM204030>("ViewEmployee") EmployeeID: PXFieldState;
	EmployeeCD: PXFieldState;
	PolicyName: PXFieldState;
}
