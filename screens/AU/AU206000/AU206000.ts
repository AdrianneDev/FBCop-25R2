import { createCollection, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, GridPreset, GridPagerMode, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectGIMaintenance",
	primaryView: "ProjectItems",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU206000 extends AuBaseScreen {

	ProjectItems = createCollection(CustObject);

   	@viewInfo({containerName: "Generic Inquiries"})
	ViewSelectGiDesign = createCollection(GIDesign);
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
export class GIDesign extends PXView  {
	@columnConfig({width: 100, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 300})	Name: PXFieldState;
	LastModifiedByID_Modifier_Username: PXFieldState;
	LastModifiedDateTime: PXFieldState;
}
