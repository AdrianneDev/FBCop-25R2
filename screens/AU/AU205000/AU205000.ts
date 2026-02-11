import { createCollection, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, GridPreset, GridPagerMode, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectLocaleMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU205000 extends AuBaseScreen {

	Items = createCollection(CustObject);

   	@viewInfo({containerName: "Add Locale"})
	SystemLocales = createCollection(Locale);
}

// Views

@gridConfig({
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	adjustPageSize: false,
	preset: GridPreset.Primary,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class CustObject extends PXView  {
	@columnConfig({width: 108})	Name: PXFieldState;
	@columnConfig({width: 108})	Description: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState;
}

@gridConfig({
	allowInsert: false,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class Locale extends PXView  {
	@columnConfig({width: 50, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 120})	LocaleName: PXFieldState;
	@columnConfig({width: 150})	TranslatedName: PXFieldState;
}
