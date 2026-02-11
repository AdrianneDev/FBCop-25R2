import { PXView, PXFieldState, PXActionState, gridConfig, PXFieldOptions, columnConfig, GridColumnType, TextAlign, GridPreset, GridNoteFilesShowMode } from "client-controls";

// Views

export class MobileSiteMapWorkspaces extends PXView  {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
	DisplayName: PXFieldState;
	Icon: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	autoAdjustColumns: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	topBarItems: {
		moveUpItem: { config: {commandName: "moveUpItem", images: { normal: "main@ArrowUp" } } },
		moveDownItem: { config: {commandName: "moveDownItem", images: { normal: "main@ArrowDown" } } }
	}
})
export class MobileSiteMapWorkspaceItems extends PXView  {
	moveUpItem: PXActionState;
	moveDownItem: PXActionState;
	@columnConfig({allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})	IsActive: PXFieldState;
	@columnConfig({width: 150, hideViewLink: true })	ItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 150})	DisplayName: PXFieldState;
	@columnConfig({width: 150})	ItemType: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	autoAdjustColumns: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	topBarItems: {
		moveUpWidget: { config: { commandName: "moveUpWidget", images: { normal: "main@ArrowUp" } } },
		moveDownWidget: { config: { commandName: "moveDownWidget", images: { normal: "main@ArrowDown" } } },
	}
})

export class MobileSiteMapWorkspaceWidgets extends PXView {
	moveUpWidget: PXActionState;
	moveDownWidget: PXActionState;
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ width: 150 }) DashboardID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 150 }) WidgetID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	keepPosition: true,
	autoAdjustColumns: false,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	topBarItems: {
		moveUpWidgetV2: { config: { commandName: "moveUpWidgetV2", images: { normal: "main@ArrowUp" } } },
		moveDownWidgetV2: { config: { commandName: "moveDownWidgetV2", images: { normal: "main@ArrowDown" } } },
	}
})
export class MobileSiteMapWorkspaceWidgetsV2 extends PXView {
	moveUpWidgetV2: PXActionState;
	moveDownWidgetV2: PXActionState;
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ width: 150 }) DashboardID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 150 }) WidgetID: PXFieldState;
}
