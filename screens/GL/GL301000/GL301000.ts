import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, columnConfig, gridConfig, viewInfo,
	CurrencyInfo, PXActionState, linkCommand, GridColumnShowHideMode, GridPreset, handleEvent, CustomEventType, RowSelectedHandlerArgs,
	PXViewCollection, controlConfig, headerDescription, CurrentRowChangedHandlerArgs
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.JournalEntry",
	primaryView: "BatchModule",
	bpEventsIndicator: true,
	udfTypeField: "Module",
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class GL301000 extends PXScreen {

	@viewInfo({ containerName: "Batch Summary" })
	BatchModule = createSingle(Batch);

	@viewInfo({ containerName: "Details -> Transaction Details" })
	GLTranModuleBatNbr = createCollection(GLTran);

	@viewInfo({ containerName: "Batch Summary -> Rate Selection" })
	_Batch_CurrencyInfo_ = createSingle(CurrencyInfo);

	@handleEvent(CustomEventType.RowSelected, { view: "BatchModule" })
	onBatchSelected(args: RowSelectedHandlerArgs<Batch>) {
		const model = args.viewModel;

		model.OrigBatchNbr.visible = !!model?.OrigBatchNbr?.value?.id;
		model.AutoReverse.visible = model?.AutoReverseCopy?.value !== true;
		model.AutoReverseCopy.visible = model?.AutoReverseCopy?.value === true;
		model.SkipTaxValidation.visible = model?.Module?.value === "GL";
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "GLTranModuleBatNbr" })
	onCurrentGLTranChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GLTran>>) {
		const model = args.viewModel;
		const activeRow = args.viewModel.activeRow;

		if (model.ReclassificationHistory) model.ReclassificationHistory.enabled = !!activeRow?.IncludedInReclassHistory?.value;
	}

}

export class Batch extends PXView {

	GLReversingBatches: PXActionState;

	Module: PXFieldState;
	BatchNbr: PXFieldState;
	Status: PXFieldState;
	DateEntered: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	@controlConfig( {rows: 2} )
	Description: PXFieldState<PXFieldOptions.Multiline>;

	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	LedgerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	AutoReverse: PXFieldState<PXFieldOptions.CommitChanges>;

	AutoReverseCopy: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateTaxTrans: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipTaxValidation: PXFieldState<PXFieldOptions.CommitChanges>;
	BatchType: PXFieldState<PXFieldOptions.Disabled>;

	@controlConfig({ allowEdit: true })
	OrigBatchNbr: PXFieldState;

	@controlConfig({ linkCommand: "GLReversingBatches" })
	ReverseCount: PXFieldState;

	CuryDebitTotal: PXFieldState;
	CuryCreditTotal: PXFieldState;
	CuryControlTotal: PXFieldState;
	DataField: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class GLTran extends PXView {

	ViewDocument: PXActionState;
	ReclassificationHistory: PXActionState;
	ViewPMTran: PXActionState;
	ViewReclassBatch: PXActionState;
	viewOrigBatch: PXActionState;

	LineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	AccountID_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;

	FinPeriodID: PXFieldState;
	TranPeriodID: PXFieldState;

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID_description: PXFieldState<PXFieldOptions.Hidden>;
	TaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaskID_description: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPMTran")
	PMTranID: PXFieldState;
	RefNbr: PXFieldState;
	TranDate: PXFieldState;
	Qty: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	CuryDebitAmt: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Default>;
	CuryCreditAmt: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Default>;
	TranDesc: PXFieldState;
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState<PXFieldOptions.Hidden>;

	ReferenceID: PXFieldState;

	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.Server })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true, allowShowHide: GridColumnShowHideMode.Server })
	TaxCategoryID: PXFieldState<PXFieldOptions.CommitChanges>;

	NonBillable: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	CuryReclassRemainingAmt: PXFieldState;

	@linkCommand("ViewReclassBatch")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	ReclassBatchNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	OrigModule: PXFieldState;

	@linkCommand("viewOrigBatch")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	OrigBatchNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server })
	OrigLineNbr: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	IncludedInReclassHistory: PXFieldState<PXFieldOptions.Hidden>;
}
