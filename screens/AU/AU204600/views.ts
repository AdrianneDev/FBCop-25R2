import { PXView, PXFieldState, gridConfig, fieldConfig, linkCommand, columnConfig, GridColumnType, PXActionState, GridPreset, GridFastFilterVisibility } from "client-controls";


// Views

@gridConfig({
	syncPosition: true,
	allowInsert: false,
	autoAdjustColumns: true,
	showFastFilter: GridFastFilterVisibility.False,
	mergeToolbarWith: "ScreenToolbar",
	preset: GridPreset.Primary
})
export class CustObject extends PXView  {

	@linkCommand("edit")
	@columnConfig({width: 200})	Name: PXFieldState;
	@columnConfig({width: 150})	ScreenId: PXFieldState;
	@columnConfig({width: 200})	Description: PXFieldState;
	@columnConfig({allowUpdate: false})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false})	LastModifiedDateTime: PXFieldState;
}

@gridConfig({
	autoAdjustColumns: true,
	showFastFilter: GridFastFilterVisibility.False,
	preset: GridPreset.Details
})
export class RowWesiteFile extends PXView  {

	@columnConfig({width: 100, type: GridColumnType.CheckBox})	Selected: PXFieldState;
	@columnConfig({width: 500})	Path: PXFieldState;
	Modified: PXFieldState;
	Size: PXFieldState;
}

export class DlgFileContent extends PXView  {
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	Content: PXFieldState;
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
