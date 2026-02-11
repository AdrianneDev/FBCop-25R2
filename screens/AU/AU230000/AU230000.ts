import { createCollection, PXScreen, graphInfo, PXActionState, viewInfo, PXView, PXFieldState, gridConfig, linkCommand, columnConfig, GridColumnType, GridPreset, GridPagerMode, GridColumnShowHideMode, PXFieldOptions, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectUserFieldsMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU230000 extends AuBaseScreen {
	actionEdit: PXActionState;

	Items = createCollection(CustObject);
   	@viewInfo({containerName: "User-Defined Fields"})
	ViewSelectUserFields = createCollection(CSAttribute);
   	@viewInfo({containerName: "Edit Attribute"})
	EditUserFieldScreens = createCollection(CSScreenAttribute);
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
	@linkCommand("actionEdit")
	@columnConfig({width: 98})	AttributeID: PXFieldState;
	@columnConfig({width: 148})	Description: PXFieldState;
	@columnConfig({width: 200})	ScreenID: PXFieldState;
	@columnConfig({width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({width: 90})	LastModifiedDateTime: PXFieldState;
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
export class CSAttribute extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 200})	AttributeID: PXFieldState;
	@columnConfig({width: 200})	Description: PXFieldState;
}

@gridConfig({
	allowInsert: false,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class CSScreenAttribute extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 200})	ScreenId: PXFieldState;
	@columnConfig({width: 200})	TypeValueDesc: PXFieldState;
}
