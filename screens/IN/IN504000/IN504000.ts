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
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,
	PXPageLoadBehavior,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.PIGenerator",
	primaryView: "GeneratorSettings",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class IN504000 extends PXScreen {
	@viewInfo({containerName: "Settings"})
	GeneratorSettings = createSingle(PIGeneratorSettings);

	@viewInfo({containerName: "Details"})
	PreliminaryResultRecs = createCollection(PIPreliminaryResult);

	@viewInfo({containerName: "Selected Locations"})
	LocationsToLock = createCollection(INLocation);

	@viewInfo({containerName: "Excluded Locations"})
	ExcludedLocations = createCollection(ExcludedLocation);

	@viewInfo({containerName: "Selected Inventory Items"})
	InventoryItemsToLock = createCollection(InventoryItem);

	@viewInfo({containerName: "Excluded Inventory Items"})
	ExcludedInventoryItems = createCollection(ExcludedInventoryItem);
}

export class PIGeneratorSettings extends PXView {
	PIClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	Method: PXFieldState<PXFieldOptions.Disabled>;
	SelectedMethod: PXFieldState<PXFieldOptions.Disabled>;
	CycleID: PXFieldState<PXFieldOptions.CommitChanges>;
	ABCCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	MovementClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	RandomItemsLimit: PXFieldState<PXFieldOptions.CommitChanges>;
	ByFrequency: PXFieldState<PXFieldOptions.CommitChanges>;
	BlankLines: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxLastCountDate: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details, //PrimaryInquiry in aspx, but it does not fit well here. To review
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class PIPreliminaryResult extends PXView {
	LineNbr: PXFieldState;
	TagNumber: PXFieldState;
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	LotSerialNbr: PXFieldState;
	ExpireDate: PXFieldState;
	BookQty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseUnit: PXFieldState;

	Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ItemClassID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class INLocation extends PXView {
	LocationCD: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class ExcludedLocation extends PXView {
	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	Descr: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class InventoryItem extends PXView {
	@columnConfig({ hideViewLink: true })
	InventoryCD: PXFieldState;

	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class ExcludedInventoryItem extends PXView {
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	Descr: PXFieldState<PXFieldOptions.Disabled>;
}
