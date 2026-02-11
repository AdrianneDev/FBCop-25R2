import {
	PXScreen, createSingle, createCollection, graphInfo, PXPageLoadBehavior,
	PXView, PXFieldState, PXFieldOptions, controlConfig, gridConfig, GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.OrganizationFinPeriodMaint", primaryView: "OrgFinYear",
	hideFilesIndicator: false, hideNotesIndicator: false,
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class GL201100 extends PXScreen {

	OrgFinYear = createSingle(OrgFinYear);
	OrgFinPeriods = createCollection(OrgFinPeriods);

	NewCalendarParams = createSingle(NewCalendarParams);

	GenerateParams = createSingle(GenerateParams);

}

export class OrgFinYear extends PXView {

	OrganizationID: PXFieldState;

	Year: PXFieldState;
	StartDate: PXFieldState;
	FinPeriods: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly })
export class OrgFinPeriods extends PXView {

	FinPeriodID: PXFieldState;
	StartDateUI: PXFieldState;
	EndDateUI: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	Status: PXFieldState;
	APClosed: PXFieldState;
	ARClosed: PXFieldState;
	INClosed: PXFieldState;
	CAClosed: PXFieldState;
	FAClosed: PXFieldState;
	MasterFinPeriodID: PXFieldState;

}

export class NewCalendarParams extends PXView {

	OrganizationID: PXFieldState;
	StartYear: PXFieldState<PXFieldOptions.CommitChanges>;
	StartMasterFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState;

}

export class GenerateParams extends PXView {

	OrganizationID: PXFieldState;
	FirstFinYear: PXFieldState;
	LastFinYear: PXFieldState;
	FromYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ToYear: PXFieldState<PXFieldOptions.CommitChanges>;

}
