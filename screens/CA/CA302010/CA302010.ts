import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXPageLoadBehavior, PXView, PXFieldState, gridConfig, GridPreset, PXFieldOptions,
	linkCommand, columnConfig, PXActionState, handleEvent, CustomEventType, CellCssHandlerArgs
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CAReconEnq", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class CA302010 extends PXScreen {

	ViewDoc: PXActionState;

	@viewInfo({ containerName: "Create Reconciliation" })
	cashAccountFilter = createSingle(CashAccountFilter);

	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(CAEnqFilter);

	@viewInfo({ containerName: "Reconciliation Statements" })
	CAReconRecords = createCollection(CARecon);

	@handleEvent(CustomEventType.GetCellCss, { view: "CAReconRecords", column: "CashAccountID_CashAccount_descr" })
	getUpperCaseCss(args: CellCssHandlerArgs) {
		return "upperCaseText";
	}
}

export class CashAccountFilter extends PXView {

	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class CAEnqFilter extends PXView {

	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Inquiry, initNewRow: true })
export class CARecon extends PXView {

	Status: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;

	CashAccountID_CashAccount_descr: PXFieldState;

	@linkCommand("ViewDoc")
	ReconNbr: PXFieldState;

	ReconDate: PXFieldState;
	LastReconDate: PXFieldState;
	CuryBegBalance: PXFieldState;
	CuryReconciledDebits: PXFieldState;
	CuryReconciledCredits: PXFieldState;
	CuryBalance: PXFieldState;
	CountDebit: PXFieldState;
	CountCredit: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

}
