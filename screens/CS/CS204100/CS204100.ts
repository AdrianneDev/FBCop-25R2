import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	headerDescription,
	GridPagerMode,
	GridPreset,
	GridNoteFilesShowMode,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CS.SalesTerritoryMaint",
	primaryView: "SalesTerritory",
})
export class CS204100 extends PXScreen {
	SalesTerritory = createSingle(SalesTerritory);
	CountryStates = createCollection(State);
	Countries = createCollection(Country);
	EmptyView = createCollection(State);
}

export class SalesTerritory extends PXView {
	SalesTerritoryID: PXFieldState;
	@headerDescription
	Name: PXFieldState;
	IsActive: PXFieldState;
	SalesTerritoryType: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll,
	allowInsert: false,
	allowDelete: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	quickFilterFields: ["StateID", "Name"],
})
export class State extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	StateID: PXFieldState;
	Name: PXFieldState;
	SalesTerritoryID: PXFieldState<PXFieldOptions.Hidden>;
	SalesTerritoryID_Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	syncPosition: true,
	adjustPageSize: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	pageSize: 270,
	allowInsert: false,
	allowDelete: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	quickFilterFields: ["CountryID", "Description"],
})
export class Country extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	CountryID: PXFieldState;
	Description: PXFieldState;
	SalesTerritoryID: PXFieldState<PXFieldOptions.Hidden>;
	SalesTerritoryID_Description: PXFieldState;
}
