import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createCollection,
	createSingle,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	PXActionState,
	linkCommand,
	GridPreset,
	GridFilterBarVisibility,
	GridNoteFilesShowMode,
	CustomEventType,
	RowSelectedHandlerArgs,
	handleEvent,
	PXViewCollection
} from "client-controls";

@graphInfo({
	graphType: "PX.DataSync.HubSpot.HSSyncRecordMaint",
	primaryView: "Filter",
	bpEventsIndicator: false,
	udfTypeField: "",
})
export class HS205040 extends PXScreen {
	GoToHubSpot: PXActionState;
	ShowEntity: PXActionState;

	Filter = createSingle(HSSyncRecordFilter);
	Records = createCollection(HSSyncRecord);

	@handleEvent(CustomEventType.RowSelected, { view: "Records" })
	onRecordSelected(args: RowSelectedHandlerArgs<PXViewCollection<HSSyncRecord>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model?.ResetSync) {
			model.ResetSync.enabled = !!ar;
		}
	}
}

export class HSSyncRecordFilter extends PXView {
	Entity: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	ErrorsOnly: PXFieldState<PXFieldOptions.CommitChanges>;
	SyncRecordID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowUpdate: false,
	quickFilterFields: [
		"DisplayName",
		"RemoteName",
		"LastErrorMessageSimplified",
	],
})
export class HSSyncRecord extends PXView {
	ResetSync: PXActionState;

	@columnConfig({
		allowCheckAll: true,
		width: 10,
	})
	Selected: PXFieldState;
	SyncRecordID: PXFieldState<PXFieldOptions.Hidden>;
	EntityType: PXFieldState;
	@linkCommand<HS205040>("ShowEntity") DisplayName: PXFieldState;
	LocalTS: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand<HS205040>("GoToHubSpot")
	RemoteName: PXFieldState<PXFieldOptions.CommitChanges>;
	RemoteTS: PXFieldState<PXFieldOptions.Hidden>;
	SyncStatus: PXFieldState;
	LastSource: PXFieldState;
	LastOperation: PXFieldState;
	LastErrorMessage: PXFieldState<PXFieldOptions.Hidden>;
	LastErrorMessageSimplified: PXFieldState;
	LastAttemptTS: PXFieldState<PXFieldOptions.Hidden>;
	AttemptCount: PXFieldState<PXFieldOptions.Hidden>;
}
