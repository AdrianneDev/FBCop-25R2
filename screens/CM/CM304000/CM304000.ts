import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXPageLoadBehavior,
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	columnConfig,
	gridConfig,
	GridPreset,
	headerDescription
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CM.TranslationHistoryMaint",
	primaryView: "TranslHistRecords",
	pageLoadBehavior: PXPageLoadBehavior.GoLastRecord,
	showUDFIndicator: true,
	showActivitiesIndicator: true,
	bpEventsIndicator: true
})
export class CM304000 extends PXScreen {
	ViewBatch: PXActionState;

	TranslHistRecords = createSingle(TranslationHistory);
	TranslHistDetRecords = createCollection(TranslationHistoryDetails);
}

export class TranslationHistory extends PXView {
	@headerDescription
	ReferenceNbr: PXFieldState;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	DateEntered: PXFieldState<PXFieldOptions.Disabled>;
	CuryEffDate: PXFieldState<PXFieldOptions.Disabled>;
	FinPeriodID: PXFieldState<PXFieldOptions.Disabled>;

	@headerDescription
	Description: PXFieldState<PXFieldOptions.Disabled>;

	TranslDefId: PXFieldState<PXFieldOptions.Disabled>;
	BranchID: PXFieldState<PXFieldOptions.Disabled>;
	LedgerID: PXFieldState<PXFieldOptions.Disabled>;
	DestCuryID: PXFieldState<PXFieldOptions.Disabled>;
	BatchNbr: PXFieldState<PXFieldOptions.Disabled>;
	DebitTot: PXFieldState<PXFieldOptions.Disabled>;
	CreditTot: PXFieldState<PXFieldOptions.Disabled>;
	ControlTot: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details
})
export class TranslationHistoryDetails extends PXView {
	@columnConfig({ hideViewLink: true }) BranchID: PXFieldState;
	@columnConfig({ hideViewLink: true }) AccountID: PXFieldState;
	AccountID_Account_description: PXFieldState;
	@columnConfig({ hideViewLink: true }) SubID: PXFieldState;
	CalcMode: PXFieldState;
	SourceAmt: PXFieldState;
	TranslatedAmt: PXFieldState;
	OrigTranslatedAmt: PXFieldState;
	@columnConfig({ hideViewLink: true }) RateTypeID: PXFieldState;
	CuryRate: PXFieldState;
	DebitAmt: PXFieldState;
	CreditAmt: PXFieldState;
}
