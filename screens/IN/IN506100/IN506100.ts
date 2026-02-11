import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
	PXPageLoadBehavior,
	columnConfig,
	PXActionState,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INUpdateMCAssignment",
	primaryView: "UpdateSettings",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class IN506100 extends PXScreen {
	SelectItems: PXActionState;

	@viewInfo({ containerName: "Selection" })
	UpdateSettings = createSingle(UpdateMCAssignmentSettings);

	@viewInfo({ containerName: "Details" })
	ResultPreview = createCollection(UpdateMCAssignmentResult);

	@viewInfo({containerName: "Inventory Item List"})
	SelectedItems = createCollection(InventoryItemsFilter);
}

export class UpdateMCAssignmentSettings extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	EndFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false,
	batchUpdate: false,
})
export class UpdateMCAssignmentResult extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	InventoryID: PXFieldState;
	Descr: PXFieldState;
	OldMC: PXFieldState;
	MCFixed: PXFieldState;
	NewMC: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class InventoryItemsFilter extends PXView {
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	Descr: PXFieldState;
}
