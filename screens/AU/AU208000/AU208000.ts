import { createCollection, PXScreen, graphInfo, viewInfo, gridConfig, GridColumnType, PXFieldOptions, PXFieldState, PXView, columnConfig, GridPreset, localizable, GridPagerMode, ScreenUpdateParams, GridColumnShowHideMode, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@localizable
export class CustomizationEditorSiteMapDialogHeaders {
	static AddSiteMapItems = "Add Site Map Item(s)";
	static AddPortalmapItems = "Add Portal Map Item(s)";
}

@graphInfo({
	graphType: "PX.SM.ProjectSiteMapMaintenance",
	primaryView: "ProjectItems",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU208000 extends AuBaseScreen {
	CustomizationEditorSiteMapDialogHeaders = CustomizationEditorSiteMapDialogHeaders;
	ProjectItems = createCollection(CustObject);
	ViewSelectSiteMap = createCollection(SiteMap);
}

@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: false
})
export class CustObject extends PXView  {
	@columnConfig({width: 100})	ObjectName: PXFieldState;
	@columnConfig({width: 108})	Description: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({width: 100})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	preset: GridPreset.Details,
	batchUpdate: true,
	pageSize: 0,
	autoAdjustColumns: true
})
export class SiteMap extends PXView  {
	@columnConfig({width: 100, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 100})	ScreenID: PXFieldState;
	@columnConfig({width: 150})	Title: PXFieldState;
	@columnConfig({width: 100})	LastModifiedDateTime: PXFieldState;
}
