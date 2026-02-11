import {
	PXScreen,
	PXView,
	PXFieldState,
	createCollection,
	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridColumnType,
	GridPreset,
	GridPagerMode,
	GridColumnShowHideMode,
	GridNoteFilesShowMode
} from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectMobileSiteMapWorkspaceMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU220011 extends AuBaseScreen {

	Items = createCollection(CustObject);

   	@viewInfo({containerName: "Mobile Workspaces"})
	ViewSelectWorkspaces = createCollection(MobileSiteMapWorkspaces);
}

// Views
@gridConfig({
	preset: GridPreset.Primary,
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
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	batchUpdate: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	autoAdjustColumns: true
})
export class MobileSiteMapWorkspaces extends PXView  {
	@columnConfig({width: 100, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	Name: PXFieldState;
	DisplayName: PXFieldState;
	Icon: PXFieldState;
	@columnConfig({width: 100, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
}
