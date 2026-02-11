import {
	graphInfo, PXScreen, PXView, PXFieldState, createCollection, gridConfig, columnConfig,
	PXFieldOptions, PXPageLoadBehavior,	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.AutocompleteGenerator.UI.AutocompleteSuggesterTrainingProcess",
	primaryView: "Users",
	bpEventsIndicator: false,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class SM508000 extends PXScreen {
	Users = createCollection(Users);

}

@gridConfig({ preset: GridPreset.Processing, allowUpdate: false })
export class Users extends PXView {
	ProcessingStatus: PXFieldState<PXFieldOptions.Hidden>;
	ProcessingMessage: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({allowSort: false, allowCheckAll: true})
	Selected: PXFieldState;
	Username: PXFieldState;
	CreatedDateTime: PXFieldState;
	SuccessString: PXFieldState;
}
