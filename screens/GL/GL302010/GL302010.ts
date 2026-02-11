import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	PXPageLoadBehavior,
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	actionConfig,
	GridColumnShowHideMode,
	PXActionState,
	treeConfig,
	GridPreset,
	localizable,
	GridColumnGeneration,
	fieldConfig,
	ControlParameter,
	IWizardConfig,
	IGridColumn
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.GLBudgetEntry", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues, bpEventsIndicator: true })
export class GL302010 extends PXScreen {
	distributeOK: PXActionState;
	manageOK: PXActionState;
	preload: PXActionState;


	@viewInfo({containerName: "Budget Filter"})
	Filter = createSingle(BudgetFilter);
	Tree = createCollection(GLBudgetLine);
	@viewInfo({containerName: "Budget Articles", parameters: [ new ControlParameter("GroupID", "Tree", "GroupID") ]})
	BudgetArticles = createCollection(GLBudgetLine2);

	@viewInfo({containerName: "Dispose Parameters"})
	DistrFilter = createSingle(BudgetDistributeFilter);
	@viewInfo({containerName: "Manage Budget"})
	ManageDialog = createSingle(ManageBudgetDialog);
	@viewInfo({containerName: "Preload Budget Articles Wizard"})
	PreloadFilter = createSingle(BudgetPreloadFilter);

	wizardConfig: IWizardConfig = {
		nextCommand: "WNext",
		saveCommand: "preload",
		buttons: {
			done: "Finish",
		},
		validateInput: true,
	};
	PreloadActionOptions = PreloadActionOptions;

	onFilterBudgetArticlesColumns(col: IGridColumn) {
		// all fields from the BudgetLine2
		const validColumns = [
			"IsGroup", "GroupID", "Released", "AccountID",
			"SubID", "Description", "Amount", "BranchID",
			"AllocatedAmount", "CreatedByID", "LastModifiedByID", "LedgerID", "FinYear"];
		return validColumns.includes(col.field) || (col.generated && col.field?.startsWith("Period"));
	}

}

export class BudgetFilter extends PXView {

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerId: PXFieldState<PXFieldOptions.CommitChanges>;
	FinYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowTree: PXFieldState<PXFieldOptions.CommitChanges>;
	CompareToBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	CompareToLedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CompareToFinYear: PXFieldState<PXFieldOptions.CommitChanges>;
	SubIDFilter: PXFieldState<PXFieldOptions.CommitChanges>;
	TreeNodeFilter: PXFieldState<PXFieldOptions.CommitChanges>;
}


@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "GroupID",
	textField: "Description",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	hideToolbarSearch: true,
	syncPosition: true,
	autoRepaint: ["BudgetArticles"],
})
export class GLBudgetLine extends PXView {

	GroupID: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, generateColumns: GridColumnGeneration.Append })
export class GLBudgetLine2 extends PXView {

	@actionConfig({
		popupCommand: "Refresh"
	})
	Distribute: PXActionState;

	IsGroup: PXFieldState;
	GroupID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.True })
	BranchID: PXFieldState;

	Released: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	@columnConfig({ allowSort: false })
	Description: PXFieldState;

	Amount: PXFieldState;
	AllocatedAmount: PXFieldState;

	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.True })
	CreatedByID: PXFieldState;

	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.True })
	LastModifiedByID: PXFieldState;
}

export class BudgetDistributeFilter extends PXView {

	Method: PXFieldState;
	ApplyToAll: PXFieldState<PXFieldOptions.CommitChanges>;
	ApplyToSubGroups: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ManageBudgetDialog extends PXView {

	Method: PXFieldState<PXFieldOptions.CommitChanges>;
	Message: PXFieldState<PXFieldOptions.Multiline>;
}

@localizable
export class PreloadActionOptions {
	static UpdateExistingArticlesOnly = "Update Existing Articles Only";
	static UpdateExistingArticlesLoadNonexistent = "Update Existing Articles and Load Nonexistent Articles";
	static LoadNonexistentArticlesOnly = "Load Nonexistent Articles Only";
}
export class BudgetPreloadFilter extends PXView {

	branchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ledgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	finYear: PXFieldState<PXFieldOptions.CommitChanges>;
	changePercent: PXFieldState<PXFieldOptions.CommitChanges>;
	fromAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	toAccount: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-segmented-selector",
		controlConfig: {
			wildcard: "?"
		}
	})
	AccountIDFilter: PXFieldState<PXFieldOptions.CommitChanges>;
	SubIDFilter: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({
		controlType: "qp-radio",
		controlConfig: {
			class: "vertical",
			options: [{ value: 1, text: PreloadActionOptions.UpdateExistingArticlesOnly }
				, { value: 2, text: PreloadActionOptions.UpdateExistingArticlesLoadNonexistent }
				, { value: 3, text: PreloadActionOptions.LoadNonexistentArticlesOnly }]
		}
	})
	PreloadAction: PXFieldState<PXFieldOptions.CommitChanges>;
}
