import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, GridPreset, PXPageLoadBehavior, gridConfig,
	controlConfig, fieldConfig
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.MasterFinPeriodMaint",
	primaryView: "FiscalYear",
	hideNotesIndicator: false,
	hideFilesIndicator: false,
	pageLoadBehavior: PXPageLoadBehavior.GoLastRecord
})
export class GL201000 extends PXScreen {

	FiscalYear = createSingle(FiscalYear);
	Periods = createCollection(Periods);
	GenerateParams = createSingle(GenerateParams);
	SaveDialog = createSingle(SaveDialog);

}

export class FiscalYear extends PXView {

	Year: PXFieldState;
	StartDate: PXFieldState;
	FinPeriods: PXFieldState;
	CustomPeriods: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoInsert: true,
})
export class Periods extends PXView {

	FinPeriodID: PXFieldState;
	StartDateUI: PXFieldState;
	EndDateUI: PXFieldState<PXFieldOptions.CommitChanges>;
	Length: PXFieldState;
	Descr: PXFieldState;
	Status: PXFieldState;
	IsAdjustment: PXFieldState<PXFieldOptions.CommitChanges>;
	APClosed: PXFieldState;
	ARClosed: PXFieldState;
	INClosed: PXFieldState;
	Closed: PXFieldState;
	CAClosed: PXFieldState;
	FAClosed: PXFieldState;

}

export class GenerateParams extends PXView {

	FirstFinYear: PXFieldState;
	LastFinYear: PXFieldState;
	FromYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ToYear: PXFieldState<PXFieldOptions.CommitChanges>;

}

export class SaveDialog extends PXView {

	@controlConfig({ rows: 5 })
	Message: PXFieldState<PXFieldOptions.Multiline>;

	@fieldConfig({
		controlType: "qp-radio",
		controlConfig: {
			class: "vertical"
		},
	})
	Method: PXFieldState<PXFieldOptions.CommitChanges>;

	MoveDayOfWeek: PXFieldState<PXFieldOptions.CommitChanges>;

}
