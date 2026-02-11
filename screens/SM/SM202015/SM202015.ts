import { createCollection, createSingle, PXScreen, graphInfo,
	PXView, viewInfo, PXFieldState, PXFieldOptions,
	treeConfig, gridConfig, columnConfig, GridPreset,
	ControlParameter, GridNoteFilesShowMode
 } from "client-controls";

@graphInfo({graphType: "PX.SM.WikiAccessRightsMaintenance", primaryView: "RolesRecords", })
export class SM202015 extends PXScreen {
	@viewInfo({containerName: "Role Information"})
	RolesRecords = createSingle(RolesFilter);

	@viewInfo({ parameters: [new ControlParameter("parent", "Folders", "PageID")] })
	Children = createCollection(WikiPage2);

	Folders = createCollection(WikiPage);
}

export class RolesFilter extends PXView {
	Rolename: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	Isinherited: PXFieldState;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "PageID",
	textField: "Title",
	valueField: "PageID",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	syncPosition: true,
	hideToolbarSearch: true,
	openedLayers: 1,
	autoRepaint: ["Children"],
})
export class WikiPage extends PXView {
	PageID: PXFieldState;
	Title: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class WikiPage2 extends PXView {
	@columnConfig({allowUpdate: false, width: 200})	Name: PXFieldState;
	@columnConfig({allowUpdate: false, width: 200})	Title: PXFieldState;
	@columnConfig({width: 200})	AccessRights: PXFieldState;
	@columnConfig({width: 200})	ParentAccessRights: PXFieldState;
}
