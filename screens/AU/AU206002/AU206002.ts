import { createCollection, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, columnConfig, GridColumnType, PXActionState, GridPreset, GridPagerMode, GridColumnShowHideMode, PXFieldOptions, GridNoteFilesShowMode } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({graphType: "PX.SM.ProjectEntityEndpointMaintenance", primaryView: "Items", hideNotesIndicator: true, hideFilesIndicator: true})
export class AU206002 extends AuBaseScreen {

	Items = createCollection(CustObject);

	ViewSelectEntityEndpoint = createCollection(EntityEndpointInProject);
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
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState<PXFieldOptions.NoLabel>;
}

@gridConfig({
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class EntityEndpointInProject extends PXView  {
	@columnConfig({width: 70, type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 100})	GateVersion: PXFieldState;
	@columnConfig({width: 100})	InterfaceName: PXFieldState;
}
