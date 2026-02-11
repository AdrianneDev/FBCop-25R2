import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, actionConfig, GridColumnType, PXActionState, TextAlign, GridPreset, treeConfig, localizable } from "client-controls";

@localizable
class ButtonNames {
	static AddToGrid = "Add to Grid";
	static AddStandalonePages = "Add Standalone Pages";
	static ActivateAll = "Activate All";
	static DeactivateAll = "Deactivate All";
}

// Views

export class LocalizationTranslationSet extends PXView  {
	Id: PXFieldState;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	ResourceToCollect: PXFieldState<PXFieldOptions.CommitChanges>;
	IsCollected: PXFieldState;
	CurrentSystemVersion: PXFieldState;
	SystemVersion: PXFieldState;
	SystemTime: PXFieldState;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	textField: "Title",
	iconField: "Icon",
	idField: "NodeID",
	hideToolbarSearch: true,
	mode: "single",
	modifiable: false,
	openedLayers: 1,
	singleClickSelect: true,
	syncPosition: true
})
export class SiteMap extends PXView  {
	@actionConfig({ text: ButtonNames.AddToGrid })
	addToGrid: PXActionState;

	@actionConfig({ text: ButtonNames.AddStandalonePages })
	addStandalonePages: PXActionState;

	NodeID: PXFieldState;
	Title: PXFieldState;
	Icon: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false
})
export class LocalizationTranslationSetItem extends PXView  {
	@actionConfig({ text: ButtonNames.ActivateAll })
	activateAllScreens: PXActionState;

	@actionConfig({ text: ButtonNames.DeactivateAll })
	deactivateAllScreens: PXActionState;

	@columnConfig({width: 80, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsActive: PXFieldState;

	@columnConfig({ width: 80, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsCollected: PXFieldState;

	@columnConfig({ width: 150 })
	ScreenID: PXFieldState;

	@columnConfig({ width: 300 })
	Title: PXFieldState;
}

