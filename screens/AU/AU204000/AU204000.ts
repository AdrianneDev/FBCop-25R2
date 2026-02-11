import {
	PXScreen,
	PXActionState,
	PXFieldState,
	PXView,
	PXFieldOptions,

	GridColumnShowHideMode,
	GridPreset,
	GridPagerMode,

	createCollection,
	createSingle,
	graphInfo,
	viewInfo,
	gridConfig,
	linkCommand,
	columnConfig,
	GridNoteFilesShowMode,
	customDataHandler
} from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";


@graphInfo({
	graphType: "PX.SM.ProjectCodeMaintenance",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU204000 extends AuBaseScreen {
	edit: PXActionState;

	Items = createCollection(CustObject);

   	@viewInfo({containerName: "Create Code File"})
	FilterNewFile = createSingle(RowNewFile);
}

// Views
@gridConfig({
	preset: GridPreset.Primary,
	pagerMode: GridPagerMode.InfiniteScroll,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	autoAdjustColumns: true,
	adjustPageSize: false,
	wrapToolbar: true,
})
export class CustObject extends PXView  {
	@linkCommand("edit")
	@columnConfig({width: 108})	Name: PXFieldState;
	@columnConfig({width: 108})	Description: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
	@columnConfig({allowShowHide: GridColumnShowHideMode.False, visible: false}) Content: PXFieldState;
}

export class RowNewFile extends PXView  {
	FileTemplateName: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseDac: PXFieldState;
	BaseGraph: PXFieldState;
	FileClassName: PXFieldState;
	GenerateDacMembers: PXFieldState;
}
