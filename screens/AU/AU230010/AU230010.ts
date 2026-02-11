import {
	createCollection,
	graphInfo,
	viewInfo,
	PXView,
	PXFieldState,
	gridConfig,
	columnConfig,
	GridColumnType,
	GridPreset,
	GridPagerMode,
	GridColumnShowHideMode,
	GridNoteFilesShowMode,
	linkCommand } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectScreenConfigurationMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU230010 extends AuBaseScreen {

	Items = createCollection(CustObject);
	@viewInfo({containerName: "Screens Configuration"})
	ViewSelectScreenConfiguration = createCollection(ScreenConfiguration);
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
	@linkCommand("viewScreen")
	@columnConfig({ width: 108, allowUpdate: false }) ScreenID: PXFieldState;
	@columnConfig({ width: 100 }) Title: PXFieldState;
	@columnConfig({width: 130})	UserDefinedFields: PXFieldState;
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
export class ScreenConfiguration extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@linkCommand("viewDialogScreen")
	@columnConfig({ width: 200 }) ScreenId: PXFieldState;
	@columnConfig({ width: 200 }) Title: PXFieldState;
}