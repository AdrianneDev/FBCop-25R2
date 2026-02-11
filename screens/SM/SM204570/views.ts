import { PXView, PXFieldState, gridConfig, treeConfig, fieldConfig, PXFieldOptions, columnConfig, PXActionState, GridPreset } from "client-controls";


// Views

export class RowSrcBrowserFilter extends PXView  {

	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	AspxCode: PXFieldState;
	@fieldConfig({
		controlType: "qp-code-editor",
		controlConfig: { language: "html" },
	})
	HtmlCode: PXFieldState;
	@fieldConfig({
		controlType: "qp-code-editor",
		controlConfig: { language: "typescript" },
	})
	TypeScriptCode: PXFieldState;
	GraphName: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	TableOfContent: PXFieldState;
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	ReadonlyEventSource: PXFieldState;
	TableName: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	GeneratedDacSource: PXFieldState;
	FindText: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({
		controlType: "qp-code-editor",
	})
	SourceFile: PXFieldState;
	ActiveTabIndex: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showTopBar: false,
	actionsConfig: {
		actionConvertPage: { hidden: true },
		actionViewFile: { hidden: true },
	},
	adjustPageSize: true
})
export class RowFindResults extends PXView  {
	actionConvertPage: PXActionState;
	actionViewFile: PXActionState;
	@columnConfig({width: 250})	Name: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 50})	Line: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 600})	Content: PXFieldState<PXFieldOptions.CommitChanges>;
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: 'NodeID',
	descriptionField: 'Name',
	textField: 'Name',
	modifiable: false,
	mode: 'single',
	singleClickSelect: true,
	selectFirstNode: false,
	syncPosition: true,
	keepPosition: true,
	openedLayers: 1,
})
export class Functions extends PXView {
	@columnConfig({ width: 250 }) Name: PXFieldState;
	RawName: PXFieldState;
	NodeID: PXFieldState;
	ParentID: PXFieldState;
}

export class RowSrcBrowserFilter2 extends PXView  {
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	SourceFile: PXFieldState;
}
