import { createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, PXActionState, columnConfig, GridPreset } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CM.TranslationEnq", primaryView: "Filter", })
export class CM401000 extends PXScreen {

	viewTranslatedBatch: PXActionState;
	ViewDetails: PXActionState;

	Filter = createSingle(TranslationEnqFilter);
	TranslationHistoryRecords = createCollection(TranslationHistory);

}

export class TranslationEnqFilter extends PXView {
	TranslDefId: PXFieldState<PXFieldOptions.CommitChanges>;
	Unreleased: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	Released: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Inquiry })
export class TranslationHistory extends PXView {

	@linkCommand("ViewDetails")
	ReferenceNbr: PXFieldState;

	Status: PXFieldState;
	Description: PXFieldState;
	DateEntered: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TranslDefId: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	CuryEffDate: PXFieldState;

	@linkCommand("ViewTranslatedBatch")
	BatchNbr: PXFieldState;

}
