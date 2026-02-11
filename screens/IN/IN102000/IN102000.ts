import {
	PXScreen,
	PXView,
	PXFieldState,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INAccess",
	primaryView: "Group",
})
export class IN102000 extends PXScreen {
	@viewInfo({ containerName: "Restriction Group" })
	Group = createSingle(RelationGroup);

	@viewInfo({ containerName: "Users" })
	Users = createCollection(Users);

	@viewInfo({ containerName: "Warehouses" })
	Site = createCollection(INSite);
}

export class RelationGroup extends PXView {
	GroupName: PXFieldState;
	Description: PXFieldState;
	GroupType: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class Users extends PXView {
	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Username: PXFieldState;

	FullName: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
})
export class INSite extends PXView {
	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteCD: PXFieldState;

	Descr: PXFieldState;
}
