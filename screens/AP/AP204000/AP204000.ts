import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, controlConfig, graphInfo, PXScreen, createSingle, createCollection, PXActionState, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APDiscountMaint", primaryView: "Filter", hideFilesIndicator: true, hideNotesIndicator: true })
export class AP204000 extends PXScreen {

	ViewAPDiscountSequence: PXActionState;

	Filter = createSingle(Vendor);
	CurrentDiscounts = createCollection(APDiscount);

}

export class Vendor extends PXView {

	@controlConfig({ allowEdit: true, displayMode: "both" })
	AcctCD: PXFieldState<PXFieldOptions.CommitChanges>;

	LineDiscountTarget: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class APDiscount extends PXView {

	@linkCommand("ViewAPDiscountSequence")
	@columnConfig({ allowUpdate: false })
	DiscountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	Description: PXFieldState;

	@columnConfig({ allowUpdate: false })
	Type: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	ApplicableTo: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowUpdate: false })
	IsManual: PXFieldState;

	@columnConfig({ allowUpdate: false })
	ExcludeFromDiscountableAmt: PXFieldState;

	@columnConfig({ allowUpdate: false })
	SkipDocumentDiscounts: PXFieldState;

	@columnConfig({ allowUpdate: false })
	IsAutoNumber: PXFieldState;

	@columnConfig({ allowUpdate: false })
	LastNumber: PXFieldState;
}
