import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXActionState, PXFieldOptions,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CABankTranRuleMaintPopup", primaryView: "Rule", hideNotesIndicator: true, hideFilesIndicator: true })
export class CA204550 extends PXScreen {

	SaveClose: PXActionState;
	SaveAndApply: PXActionState;

	Rule = createSingle(Rule);
}

export class Rule extends PXView {

	Description: PXFieldState;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;

	BankDrCr: PXFieldState<PXFieldOptions.CommitChanges>;
	BankTranCashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	TranCuryID: PXFieldState;
	TranCode: PXFieldState;

	BankTranDescription: PXFieldState;
	MatchDescriptionCase: PXFieldState;
	UseDescriptionWildcards: PXFieldState;

	PayeeName: PXFieldState;
	UsePayeeNameWildcards: PXFieldState;

	AmountMatchingMode: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryTranAmt: PXFieldState;
	CuryMinTranAmt: PXFieldState;
	MaxCuryTranAmt: PXFieldState;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	DocumentEntryTypeID: PXFieldState;

}

