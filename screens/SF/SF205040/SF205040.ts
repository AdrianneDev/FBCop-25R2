import {
	graphInfo,
	PXView,
	PXFieldState,
	gridConfig,
	PXScreen,
	columnConfig,
	createCollection,
	PXFieldOptions,
	createSingle,
	linkCommand,
	PXActionState,
	GridPreset,
	CustomEventType,
	RowSelectedHandlerArgs,
	handleEvent,
	PXViewCollection
} from "client-controls";

@graphInfo({
	graphType: "PX.Salesforce.SFRealtimeSyncStateMaint",
	primaryView: "Filter",
})
export class SF205040 extends PXScreen {
	GoToSalesforce: PXActionState;
	ShowEntity: PXActionState;

	Records = createCollection(SFSyncRecord);
	Filter = createSingle(SFSyncFilter);

	@handleEvent(CustomEventType.RowSelected, { view: "Records" })
	onRecordSelected(args: RowSelectedHandlerArgs<PXViewCollection<SFSyncRecord>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model?.ResetSync) {
			model.ResetSync.enabled = !!ar;
		}
	}
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false,
	fastFilterByAllFields: false,
})
export class SFSyncRecord extends PXView {
	ResetSync: PXActionState;

	@columnConfig({ allowCheckAll: true, width: 10 })
	Selected: PXFieldState;
	EntityType: PXFieldState;
	LocalID: PXFieldState;
	@linkCommand<SF205040>("ShowEntity")
	DisplayName: PXFieldState;
	LocalTS: PXFieldState;
	@linkCommand<SF205040>("GoToSalesforce")
	RemoteID: PXFieldState;
	@columnConfig({ format: "g" })
	RemoteTS: PXFieldState;
	Operation: PXFieldState;
	Status: PXFieldState;
	LastErrorMessage: PXFieldState;
	@columnConfig({ format: "g" })
	LastAttemptTS: PXFieldState;
	AttemptCount: PXFieldState;
}

export class SFSyncFilter extends PXView {
	Entity: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	ErrorsOnly: PXFieldState<PXFieldOptions.CommitChanges>;
}
