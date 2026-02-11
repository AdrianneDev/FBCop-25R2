import { createCollection, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, columnConfig, GridColumnType, GridPreset, GridPagerMode, GridColumnShowHideMode, PXFieldOptions, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectBpEventMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU210010 extends AuBaseScreen {

	Items = createCollection(CustObject);
   	@viewInfo({containerName: "Business Events"})
	ViewSelectBpEvent = createCollection(BPEvent);
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
	@columnConfig({width: 250})	Name: PXFieldState;
	@columnConfig({width: 108})	Description: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	allowInsert: false,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class BPEvent extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 200})	Name: PXFieldState;
	@columnConfig({width: 200})	Type: PXFieldState;
}
