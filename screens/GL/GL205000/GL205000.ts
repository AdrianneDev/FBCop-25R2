import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, PXView, PXFieldState, gridConfig,
	treeConfig, PXFieldOptions, columnConfig, GridPreset, ControlParameter
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.GLBudgetTreeMaint", primaryView: "Details"})
export class GL205000 extends PXScreen {
	@viewInfo({ containerName: "Budget Tree" })
	Tree = createCollection(GLBudgetTree);

	@viewInfo({ containerName: "Subarticles", parameters: [new ControlParameter("groupID", "Tree", "GroupID")] })
	Details = createCollection(GLBudgetTree2);

	@viewInfo({ containerName: "Preload Accounts" })
	PreloadFilter = createSingle(AccountsPreloadFilter);
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "GroupID",
	textField: "Description",
	modifiable: false,
	mode: "single",
	openedLayers: 4,
	singleClickSelect: true,
	selectFirstNode: true,
	hideToolbarSearch: true,
	syncPosition: true,
	topBarItems: {
		Left: { index: 0, config: { commandName: "Left" } },
		Right: { index: 1, config: { commandName: "Right" }},
		Up: { index: 2, config: { commandName: "Up" } },
		Down: { index: 3, config: { commandName: "Down" } },
		DeleteGroup: { index: 4, config: { commandName: "DeleteGroup" }	}
	}
})
export class GLBudgetTree extends PXView {

	DeleteGroup: PXActionState;
	Left: PXActionState;
	Right: PXActionState;
	Up: PXActionState;
	Down: PXActionState;

	GroupID: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	actionsConfig:
	{
		exportToExcel: { hidden: true },
		delete: { hidden: true },
	}
})
export class GLBudgetTree2 extends PXView {

	deleteNode: PXActionState;
	showPreload: PXActionState;
	configureSecurity: PXActionState;

	IsGroup: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	Description: PXFieldState;
	AccountMask: PXFieldState;
	SubMask: PXFieldState;
	Secured: PXFieldState;
}

export class AccountsPreloadFilter extends PXView {
	fromAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	toAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	SubIDFilter: PXFieldState;
}
