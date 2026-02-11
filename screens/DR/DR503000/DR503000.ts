import {
	PXScreen, createSingle, createCollection, graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	gridConfig,
	columnConfig,
	linkCommand,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.DR.DRDraftScheduleProc", primaryView: "Filter" })
export class DR503000 extends PXScreen {
	ViewSchedule: PXActionState;
	ViewDocument: PXActionState;

	Filter = createSingle(SchedulesFilter);
	Items = createCollection(DRScheduleDetail);
}

@gridConfig({ preset: GridPreset.Processing })
export class DRScheduleDetail extends PXView {
	@columnConfig({ allowCheckAll: true, allowNull: false })
	Selected: PXFieldState;

	@linkCommand("ViewSchedule")
	ScheduleID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DefCode: PXFieldState;
	DocumentType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	@columnConfig({hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ComponentID: PXFieldState;
	LineNbr: PXFieldState;

	@columnConfig({ allowNull: false })
	TotalAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DRSchedule__BaseCuryID: PXFieldState;

	@columnConfig({ allowNull: false })
	DefAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DefAcctID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DefSubID: PXFieldState;

	@columnConfig({ allowNull: false })
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	BAccountID: PXFieldState;
}

export class SchedulesFilter extends PXView {
	AccountType: PXFieldState<PXFieldOptions.CommitChanges>;
	DeferredCode: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ComponentID: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
}
