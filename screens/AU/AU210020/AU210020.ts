import { createCollection, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, columnConfig, GridColumnType, GridPreset, GridPagerMode, GridColumnShowHideMode, PXFieldOptions, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectWebhookMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU210020 extends AuBaseScreen {
	Items = createCollection(CustObject);
	Webhooks = createCollection(WebHook);
}

@gridConfig({
	allowInsert: false,
	allowImport: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	adjustPageSize: false,
	preset: GridPreset.Primary,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class CustObject extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox}) IsSystem: PXFieldState;
	@columnConfig({width: 250})	Name: PXFieldState;
	@columnConfig({width: 350})	Handler: PXFieldState;
	@columnConfig({width: 350})	Description: PXFieldState;
	@columnConfig({allowUpdate: false, width: 200})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 150})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class WebHook extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox, allowCheckAll: true}) Selected: PXFieldState;
	@columnConfig({width: 250})	Name: PXFieldState;
	@columnConfig({width: 350, hideViewLink: true})	Handler: PXFieldState;
}
