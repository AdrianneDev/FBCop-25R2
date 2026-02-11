import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,

	linkCommand,
	treeConfig,
	fieldConfig,
	GridPreset,
	GridNoteFilesShowMode,
	localizable,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INCategoryMaint",
	primaryView: "SelectedFolders",
})
export class IN204060 extends PXScreen {
	@viewInfo({ containerName: "Selected Folders" })
	SelectedFolders = createSingle(SelectedFolders);

	Folders = createCollection(Folders);

	@viewInfo({ containerName: "Current Category" })
	CurrentCategory = createSingle(CurrentCategory);

	Members = createCollection(Members);
}

export class SelectedFolders extends PXView {
	FolderID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@localizable("screens/IN/IN204060.cs/TreeActionDisplayNames")
export class TreeActionDisplayNames {
	static Up = "Move Node Up";
	static Down = "Move Node Down";
	static Add = "Add Category";
	static Delete = "Delete Category";
}

@treeConfig({
	idField: "CategoryID",
	textField: "Description",
	mode: "single",
	openedLayers: 1,
	dynamic: true,
	modifiable: false,
	syncPosition: true,
	keepPosition: true,
	selectFirstNode: true,
	hideRootNode: true,
	hideToolbarSearch: true,
	singleClickSelect: true,
	autoRepaint: ["SelectedFolders", "ParentFolders", "CurrentCategory", "Members"],
	topBarItems: {
		AddCategory: { config: {
			commandName: "AddCategory",
			text: TreeActionDisplayNames.Add,
			toolTip: TreeActionDisplayNames.Add,
			images: {normal: "main@RecordAdd"}
		} },
		Up: { config: {
			commandName: "Up",
			text: TreeActionDisplayNames.Up,
			toolTip: TreeActionDisplayNames.Up,
			images: { normal: "main@ArrowUp" }
		} },
		Down: { config: {
			commandName: "Down",
			text: TreeActionDisplayNames.Down,
			toolTip: TreeActionDisplayNames.Down,
			images: { normal: "main@ArrowDown" }
		} },
		DeleteCategory: { config: {
			commandName: "DeleteCategory",
			text: TreeActionDisplayNames.Delete,
			toolTip: TreeActionDisplayNames.Delete,
			images: { normal: "main@RecordDel" }
		} }
	},
})
export class Folders extends PXView {
	Up: PXActionState;
	Down: PXActionState;
	AddCategory: PXActionState;
	DeleteCategory: PXActionState;

	CategoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
}

export class CurrentCategory extends PXView {
	Description: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "CategoryID",
				textField: "Description",
				dataMember: "ParentFolders",
				mode: "single",
				openedLayers: 1
			}
		}
	})
	ParentID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@localizable("screens/IN/IN204060.cs/GridActionDisplayNames")
class GridActionDisplayNames {
	static Copy = "Copy selected records";
	static Cut = "Cut selected records";
	static Paste = "Paste records";
	static AddItems = "Add Items";
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	topBarItems: {
		Copy: { index: 0, config: {
			commandName: "Copy",
			toolTip: GridActionDisplayNames.Copy,
			images: { normal: "main@Copy" }
		} },
		Cut: { index: 1, config: {
			commandName: "Cut",
			toolTip: GridActionDisplayNames.Cut,
			images: { normal: "main@Cut" }
		} },
		Paste: { index: 2, config: {
			commandName: "Paste",
			toolTip: GridActionDisplayNames.Paste,
			images: { normal: "main@Paste" }
		} },
		AddItemsbyClass: { index: 3, config: {
			commandName: "AddItemsbyClass",
			text: GridActionDisplayNames.AddItems
		} },
	},
})
export class Members extends PXView {
	Copy: PXActionState;
	Cut: PXActionState;
	Paste: PXActionState;
	AddItemsbyClass: PXActionState;

	@columnConfig({ allowCheckAll: true })
	CategorySelected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("viewDetails")
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	InventoryItem__Descr: PXFieldState<PXFieldOptions.Disabled>;
	InventoryItem__ItemClassID: PXFieldState<PXFieldOptions.Disabled>;
	InventoryItem__ItemStatus: PXFieldState<PXFieldOptions.Disabled>;
}
