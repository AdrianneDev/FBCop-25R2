import { createCollection, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, GridPreset, GridPagerMode, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({graphType: "PX.SM.ProjectWikiArticlesMaintenance", primaryView: "Items", hideFilesIndicator: true, hideNotesIndicator: true})
export class AU206001 extends AuBaseScreen {

	Items = createCollection(CustObject);
   	@viewInfo({containerName: "Wiki Pages"})
	ViewSelectWikiArticle = createCollection(WikiDescriptor);
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
export class WikiDescriptor extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 200})	Name: PXFieldState;
	@columnConfig({width: 200})	WikiTitle: PXFieldState;
	LastModifiedByID_Modifier_Username: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}
