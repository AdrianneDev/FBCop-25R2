import {
	columnConfig,
	createCollection,
	createSingle,
	CustomEventType,
	graphInfo,
	GridColumnDisplayMode,
	GridColumnType,
	gridConfig,
	handleEvent,
	linkCommand,
	PXActionState,
	PXFieldOptions,
	PXFieldState,
	PXScreen,
	PXView,
	PXViewCollection,
	RowSelectedHandlerArgs,
	viewInfo,
	GridPreset,
	TextAlign,
	Type
} from "client-controls";

enum BPEventStatus {
	Completed = 0,
	Failed = 1,
	CompletedWithErrors = 2,
	NotProcessed = 3,
}

const isValidEventStatus = (value: any): value is BPEventStatus => Type.isNumber(value) && (value >= BPEventStatus.Completed) && (value <= BPEventStatus.NotProcessed);
const eventHasDetails = (status: BPEventStatus) => status === BPEventStatus.Failed || status === BPEventStatus.CompletedWithErrors;

@graphInfo({
	graphType: "PX.BusinessProcess.UI.BusinessProcessEventHistoryMaint",
	primaryView: "Filter",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class SM502030 extends PXScreen {
	// have to use camelCase for the action name to match the action name in the toolbar
	viewEventDetails: PXActionState;

	ViewBPEvent: PXActionState;
	@viewInfo({containerName: "Show Event Data"})
	EventDetails = createSingle(EventDetails);
	@viewInfo({containerName: "History Settings"})
	EventSettings = createSingle(BPEventSetting);
	Filter = createSingle(BPEventHistoryFilter);
	@viewInfo({containerName: "Business Events"})
	Events = createCollection(BPEventHistory);
	@viewInfo({containerName: "Subscribers"})
	EventSubscribers = createCollection(BPEventSubscriber);

	@handleEvent(CustomEventType.RowSelected, {view: "EventSubscribers"})
	onBPEventSubscriberChanged(args: RowSelectedHandlerArgs<PXViewCollection<BPEventSubscriber>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;
		if (model.ExecuteSubscriber) model.ExecuteSubscriber.enabled = ar != null;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Events" })
	onBPEventHistoryChanged(args: RowSelectedHandlerArgs<PXViewCollection<BPEventHistory>>) {
		const scr = (<any>args.screenModel as SM502030);
		const ar = args.viewModel.activeRow;
		if (scr.viewEventDetails) {
			scr.viewEventDetails.enabled =
				isValidEventStatus(ar?.Status?.value) &&
				eventHasDetails(ar?.Status?.value);
		}
	}
}

// Views

export class EventDetails extends PXView {
	Details: PXFieldState;
}

export class BPEventSetting extends PXView {
	DeleteHistoryAutomatically: PXFieldState;
	HistoryRetainCount: PXFieldState;
}

export class BPEventHistoryFilter extends PXView {
	DefinitionId: PXFieldState<PXFieldOptions.CommitChanges>;
	FromDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ToDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	autoRepaint: ["EventSubscribers"],
	allowStoredFilters: true,
	allowUpdate: false
})
export class BPEventHistory extends PXView {
	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState;
	@columnConfig({type: GridColumnType.Icon, textAlign: TextAlign.Center, width: 60})
	LastRunStatus: PXFieldState;
	Status: PXFieldState;
	@linkCommand("ViewBPEvent")
	BPEvent__Name: PXFieldState<PXFieldOptions.CommitChanges>;
	BPEvent__Type: PXFieldState;
	BPEvent__Active: PXFieldState;
	BPEvent__ScreenIdValue: PXFieldState;
	@columnConfig({format: "g"})
	CreatedDateTime: PXFieldState;
	@columnConfig({format: "g"})
	LastModifiedDateTime: PXFieldState;
	ErrorText: PXFieldState;
	@linkCommand("ViewRelatedEntity")
	Source: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false
})
export class BPEventSubscriber extends PXView {
	ExecuteSubscriber: PXActionState;

	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({type: GridColumnType.Icon, textAlign: TextAlign.Center, width: 60 })
	LastRunStatus: PXFieldState;

	@linkCommand("ViewSubscriber")
	@columnConfig({displayMode: GridColumnDisplayMode.Text})
	HandlerID: PXFieldState<PXFieldOptions.CommitChanges>;

	Type: PXFieldState;
	ErrorText: PXFieldState;
}
