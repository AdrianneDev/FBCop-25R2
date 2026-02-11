import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	gridConfig,
	columnConfig,
	createCollection,
	graphInfo,
	viewInfo,

	GridColumnShowHideMode,
	GridPreset,
	GridPagerMode,
	GridNoteFilesShowMode,
	GridFastFilterVisibility
} from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectRoleMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU205200 extends AuBaseScreen {

	Items = createCollection(CustObject);

   	@viewInfo({containerName: "Add Access Rights for Screen"})
	ScreensWithRoles = createCollection(SelectedScreenForAccessRights);
}

// Views

@gridConfig({
	preset: GridPreset.Primary,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	allowInsert: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: false
})
export class CustObject extends PXView  {
	@columnConfig({width: 108})	Name: PXFieldState;
	@columnConfig({width: 108})	Description: PXFieldState;
	@columnConfig({width: 50})	AccessRightsMergeRule: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 0,
	pagerMode: GridPagerMode.InfiniteScroll,
	allowDelete: false,
	allowInsert: false,
	fastFilterByAllFields: false,
	showFastFilter: GridFastFilterVisibility.ToolBar
})
export class SelectedScreenForAccessRights extends PXView  {
	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({allowFastFilter: true})
	ScreenID: PXFieldState;
	@columnConfig({allowFastFilter: true})
	ScreenTitle: PXFieldState;
	@columnConfig({width: 200})
	LastModifiedDateTime: PXFieldState;
}
