import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridPreset, GridPagerMode, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectMobileSiteMapMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU220000 extends AuBaseScreen {

	Items = createCollection(CustObject);

	@viewInfo({containerName: "Update Existing Screen"})
	FilterSelectAddedMobileSiteMap = createSingle(AddedMobileSiteMapScreen);

   	@viewInfo({containerName: "Add New Screen"})
	FilterSelectExistingScreenExceptAdded = createSingle(ExistingExceptAddedMobileSiteMapScreen);
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
	@columnConfig({width: 108})	Operation: PXFieldState;
	@columnConfig({width: 108})	ScreenID: PXFieldState;
	@columnConfig({width: 108})	Title: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState;
}

export class AddedMobileSiteMapScreen extends PXView  {
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ExistingExceptAddedMobileSiteMapScreen extends PXView  {
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
}
