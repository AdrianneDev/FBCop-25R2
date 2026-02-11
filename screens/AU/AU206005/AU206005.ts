import { createCollection, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, GridPreset, GridPagerMode, GridNoteFilesShowMode } from "client-controls";

@graphInfo({graphType: "PX.SM.ProjectDeletedRecordsTrackingMaintenance", primaryView: "Items", hideNotesIndicator: true, hideFilesIndicator: true })
export class AU206005 extends PXScreen {
	Items = createCollection(CustObject);

   	@viewInfo({containerName: "Tables"})
	TrackingTables = createCollection(Table);
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
	@columnConfig({width: 250})	Name: PXFieldState;
	@columnConfig({width: 108})	Description: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class Table extends PXView  {
	@columnConfig({width: 100, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 300, hideViewLink: true})	TableName: PXFieldState;
}
