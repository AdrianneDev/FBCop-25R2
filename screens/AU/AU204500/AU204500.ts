import {
	PXScreen,
	PXActionState,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridColumnType,
	GridPreset,
	GridPagerMode,

	createCollection,
	createSingle,
	graphInfo,
	viewInfo,
	gridConfig,
	linkCommand,
	columnConfig,
	GridNoteFilesShowMode
} from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.ProjectFileMaintenance",
	primaryView: "Items",
	hideNotesIndicator: true,
	hideFilesIndicator: true
})
export class AU204500 extends AuBaseScreen {
	edit: PXActionState;

	Items = createCollection(CustObject);

   	@viewInfo({containerName: "Website Files"})
	ViewSelectFile = createCollection(RowWesiteFile);

	@viewInfo({containerName: "Edit File"})
	FilterFileEdit = createSingle(DlgFileContent);

	@viewInfo({containerName: "Modified Files Detected"})
	ViewCheckinFiles = createCollection(RowCheckinFile);
}

// Views

@gridConfig({
	preset: GridPreset.Primary,
	pagerMode: GridPagerMode.InfiniteScroll,
	adjustPageSize: false,
	allowInsert: false
})
export class CustObject extends PXView  {
	@linkCommand("edit")
	@columnConfig({width: 200})	Name: PXFieldState;
	@columnConfig({width: 100, type: GridColumnType.CheckBox})	IsThirdParty: PXFieldState;
	@columnConfig({width: 200})	Description: PXFieldState;
	@columnConfig({allowUpdate: false})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false})	LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class RowWesiteFile extends PXView  {
	@columnConfig({type: GridColumnType.CheckBox, allowCheckAll: true})	Selected: PXFieldState;
	@columnConfig({width: 300})	Path: PXFieldState;
	Modified: PXFieldState;
	Size: PXFieldState;
}

export class DlgFileContent extends PXView  {
	Content: PXFieldState<PXFieldOptions.Multiline>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	showTopBar: false
})
export class RowCheckinFile extends PXView  {
	ActionFileCheckIn: PXActionState;
	ActionRemoveConflicts: PXActionState;

	@columnConfig({type: GridColumnType.CheckBox})	Selected: PXFieldState;
	@columnConfig({type: GridColumnType.CheckBox})	Conflict: PXFieldState;
	@columnConfig({width: 400})	Path: PXFieldState;
}
