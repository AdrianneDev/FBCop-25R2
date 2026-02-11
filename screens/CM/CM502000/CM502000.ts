import { createCollection, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, columnConfig, GridPreset, PXActionState } from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CM.TranslationRelease", primaryView: "TranslationReleaseList",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class CM502000 extends PXScreen {
	TranslationReleaseList_referenceNbr_ViewDetails: PXActionState;

	TranslationReleaseList = createCollection(TranslationHistory);

}

@gridConfig({ preset: GridPreset.Processing, fastFilterByAllFields: false })
export class TranslationHistory extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	ReferenceNbr: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	Description: PXFieldState;

	@columnConfig({ hideViewLink: true, allowFastFilter: true })
	TranslDefId: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerID: PXFieldState;
	DateEntered: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Status: PXFieldState;

}
