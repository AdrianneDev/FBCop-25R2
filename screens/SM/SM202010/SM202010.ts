import {
	createCollection, PXScreen, graphInfo, PXActionState,
	gridConfig, PXView, PXFieldState, TextAlign,
	GridColumnType, columnConfig, treeConfig, GridPreset,
	viewInfo, ControlParameter
} from "client-controls";
import { Messages } from "src/screens/common/messages";

@graphInfo({ graphType: "PX.SM.WikiPageMapMaintenance", primaryView: "Children" })
export class SM202010 extends PXScreen {
	Folders = createCollection(WikiPage);

	@viewInfo({ parameters: [new ControlParameter("parent", "Folders", "PageID")] })
	Children = createCollection(WikiPage2);
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "PageID",
	textField: "Title",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	openedLayers: 1,
	images: {
		parent: {
			normal: "tree@Folder",
		},
	},
	selectFirstNode: true,
	syncPosition: true,
})
export class WikiPage extends PXView  {
	PageID: PXFieldState;
	Title: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowFilter: false,
	keepPosition: true,
	topBarItems: {
		DeletePages: { config: { commandName: "DeletePages", text: Messages.DeleteRow, images: { normal: "main@RecordDel" } } },
		ViewArticle: { config: {commandName: "ViewArticle", text: "View Article"} },
		RowUp: { config: {commandName: "RowUp", text: Messages.Up, images: { normal: "main@ArrowUp" } } },
		RowDown: { config: {commandName: "RowDown", text: Messages.Down, images: { normal: "main@ArrowDown" } } },
	},
	actionsConfig: {
		delete: {hidden: true},
		exportToExcel: { hidden: true }
	}
})
export class WikiPage2 extends PXView  {
	DeletePages: PXActionState;
	ViewArticle: PXActionState;
	RowUp: PXActionState;
	RowDown: PXActionState;

	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox, allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ width: 200 })
	Name: PXFieldState;

	@columnConfig({ width: 200 })
	Title: PXFieldState;

	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	Folder: PXFieldState;

	@columnConfig({ width: 60 })
	// eslint-disable-next-line id-denylist
	Number: PXFieldState;

	@columnConfig({ width: 60 })
	WikiID: PXFieldState;

}
