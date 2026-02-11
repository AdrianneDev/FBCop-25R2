import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

// Views

export class DashboardV2 extends PXView  {
	Name: PXFieldState;
	DefaultOwnerRole: PXFieldState<PXFieldOptions.CommitChanges>;
	AllowCopy: PXFieldState;
	SitemapTitle: PXFieldState;
	WorkspaceID: PXFieldState;
	SubcategoryID: PXFieldState;
	ExposeViaMobile: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	syncPosition: true,
	allowDelete: false,
	allowInsert: false,
	quickFilterFields: ["RoleName", "RoleDescr"]
})
export class Role extends PXView  {
	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False }) ScreenID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False }) CacheName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false, visible: false, allowShowHide: GridColumnShowHideMode.False }) MemberName: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ allowUpdate: false, width: 230 }) RoleName: PXFieldState;
	@columnConfig({ allowUpdate: false, width: 70, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) Guest: PXFieldState;
	@columnConfig({ allowUpdate: false, width: 300 }) RoleDescr: PXFieldState;
	@columnConfig({ allowNull: false, textAlign: TextAlign.Left }) RoleRight: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoAdjustColumns: true
})
export class DashboardParameterV2 extends PXView  {
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState;
	@columnConfig({ allowNull: false, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) Required: PXFieldState;
	Name: PXFieldState;
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;
	FieldName: PXFieldState;
	DisplayName: PXFieldState;
}

export class WidgetV2 extends PXView  {
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox }) IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerName: PXFieldState;
	Caption: PXFieldState;
	Column: PXFieldState;
	Row: PXFieldState;
	WidgetType: PXFieldState;
	Source: PXFieldState;
	Type: PXFieldState;

	// For Copy-Paste
	@columnConfig({ visible: false })
	Width: PXFieldState;
	@columnConfig({ visible: false })
	Height: PXFieldState;
	@columnConfig({ visible: false })
	Settings: PXFieldState;
}
