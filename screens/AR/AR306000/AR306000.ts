import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs,
	PXViewCollection, PXPageLoadBehavior, PXView, PXFieldState, gridConfig, headerDescription, ICurrencyInfo, disabled,
	PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset
} from "client-controls";

@graphInfo({graphType: "PX.Objects.AR.ARDunningLetterMaint", primaryView: "Document" })
export class AR306000 extends PXScreen {

	ViewDocument: PXActionState;

	Document = createSingle(ARDunningLetter);
	CurrentCustomer = createSingle(Customer);
	Details = createCollection(ARDunningLetterDetail);
}

export class ARDunningLetter extends PXView  {

	Status: PXFieldState<PXFieldOptions.Disabled>;
	DunningLetterLevel: PXFieldState;
	DunningLetterDate: PXFieldState;
	DunningFee: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.NoLabel | PXFieldOptions.Disabled>;
	FeeRefNbr: PXFieldState<PXFieldOptions.Disabled>;
}

export class Customer extends PXView  {

	AcctCD: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class ARDunningLetterDetail extends PXView  {

	Revoke: PXActionState;

	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	DueDate: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	OrigDocAmt: PXFieldState;

	@columnConfig({ allowNull: false, textAlign: TextAlign.Right })
	OverdueBal: PXFieldState;

	ARDunningLetter__DunningLetterDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DunningLetterLevel: PXFieldState;
}
