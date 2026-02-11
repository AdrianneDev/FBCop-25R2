import {
	PXScreen, createCollection, graphInfo,
	PXView, PXFieldState, PXActionState,
	PXFieldOptions,
	linkCommand, gridConfig, columnConfig, GridPreset, GridFilterBarVisibility
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.DR.DRSchedulePrimary", primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true })
export class DR201510 extends PXScreen {
	ViewSchedule: PXActionState;
	ViewDoc: PXActionState;

	Items = createCollection(DRSchedule);
}

@gridConfig({ preset: GridPreset.Inquiry, syncPosition: true, allowDelete: false, allowInsert: false, mergeToolbarWith: "ScreenToolbar", showFilterBar: GridFilterBarVisibility.OnDemand })
export class DRSchedule extends PXView {
	@linkCommand("ViewSchedule")
	ScheduleNbr: PXFieldState;

	Status: PXFieldState;

	BAccountType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState;

	DocumentTypeEx: PXFieldState;

	@linkCommand("ViewDoc")
	RefNbr: PXFieldState;
}
