import {
	createCollection, PXScreen, graphInfo, PXActionState, viewInfo, PXView, PXFieldState,
	gridConfig, linkCommand, columnConfig, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.GLBudgetRelease", primaryView: "BudgetArticles",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL505510 extends PXScreen {

	editDetail: PXActionState;

	@viewInfo({ containerName: "Budget Articles" })
	BudgetArticles = createCollection(GLBudgetLine);
}

@gridConfig({
	preset: GridPreset.Processing,
	batchUpdate: true,
	quickFilterFields: ["FinYear", "AccountID", "Description"]
})
export class GLBudgetLine extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;

	@linkCommand("editDetail")
	FinYear: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	Description: PXFieldState;
	Amount: PXFieldState;
	ReleasedAmount: PXFieldState;
}
