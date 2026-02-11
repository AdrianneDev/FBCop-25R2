import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridPreset, GridPagerMode, GridColumnShowHideMode, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectReportMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU207000 extends AuBaseScreen {

	Items = createCollection(CustObject);
   	@viewInfo({containerName: "Select Report from Database"})
	FilterSelectReport = createSingle(RowDbReport);
}

// Views
@gridConfig({
	preset: GridPreset.Primary,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: false
})
export class CustObject extends PXView  {
	@columnConfig({width: 108})	Name: PXFieldState;
	@columnConfig({width: 108})	Description: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState;
}

export class RowDbReport extends PXView  {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
}
