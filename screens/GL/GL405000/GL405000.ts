import {
	createCollection, PXScreen, graphInfo, PXActionState, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridPreset,
	CustomEventType, handleEvent, RowCssHandlerArgs, GridColumnShowHideMode,
	PXViewCollection
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.Reclassification.UI.ReclassificationHistoryInq", primaryView: "TransView",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL405000 extends PXScreen {

	ViewOrigBatch: PXActionState;
	ViewBatch: PXActionState;

	TransView = createCollection(GLTran);

	@handleEvent(CustomEventType.GetRowCss, { view: "TransView" })
	getRecordsRowCss(args: RowCssHandlerArgs<PXViewCollection<GLTran>>) {
		const tran = args?.selector?.row;
		return tran?.IsCurrent?.value === true ? "bold-highlight-row" : undefined;
	}
}

@gridConfig({ preset: GridPreset.Inquiry })
export class GLTran extends PXView {

	@columnConfig({ allowCheckAll: true, suppressExport: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewOrigBatch")
	OrigBatchNbr: PXFieldState;

	ActionDesc: PXFieldState;

	@columnConfig({ allowSort: false, allowFilter: false })
	SplitIcon: PXFieldState;

	@linkCommand("ViewBatch")
	BatchNbr: PXFieldState;

	LineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;

	AccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;

	CuryDebitAmt: PXFieldState;
	CuryCreditAmt: PXFieldState;
	CuryReclassRemainingAmt: PXFieldState;
	TranDesc: PXFieldState;
	TranDate: PXFieldState;
	FinPeriodID: PXFieldState;
	ReclassSeqNbr: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	IsCurrent: PXFieldState;
}
