import { createCollection, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, columnConfig, GridColumnType, GridPreset, GridPagerMode, GridColumnShowHideMode, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectFilterMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU205100 extends AuBaseScreen {

	Items = createCollection(CustObject);
   	@viewInfo({containerName: "Add Shared Filter"})
	SystemFilters = createCollection(FilterHeader);
}

// Views
@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	adjustPageSize: false,
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
	preset: GridPreset.Details,
	allowInsert: false,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class FilterHeader extends PXView  {
	@columnConfig({width: 50, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 160})	FilterName: PXFieldState;
	@columnConfig({width: 120})	UserName: PXFieldState;
	@columnConfig({width: 120})	ScreenID: PXFieldState;
}
