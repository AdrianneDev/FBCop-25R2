import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, PXActionState, GridPreset, GridNoteFilesShowMode
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CT.ContractPriceUpdate", primaryView: "Filter",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class CT503000 extends PXScreen {

	ViewContract: PXActionState;

	Filter = createSingle(ContractFilter);
	SelectedContractItem = createSingle(ContractItem);
	Items = createCollection(ContractDetail);
}

export class ContractFilter extends PXView {

	ContractItemID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ContractItem extends PXView {

	BasePriceOption: PXFieldState<PXFieldOptions.Readonly>;
	BasePrice: PXFieldState<PXFieldOptions.Readonly>;
	BasePriceVal: PXFieldState<PXFieldOptions.Readonly>;
	RenewalPriceOption: PXFieldState<PXFieldOptions.Readonly>;
	RenewalPrice: PXFieldState<PXFieldOptions.Readonly>;
	RenewalPriceVal: PXFieldState<PXFieldOptions.Readonly>;
	FixedRecurringPriceOption: PXFieldState<PXFieldOptions.Readonly>;
	FixedRecurringPrice: PXFieldState<PXFieldOptions.Readonly>;
	FixedRecurringPriceVal: PXFieldState<PXFieldOptions.Readonly>;
	UsagePriceOption: PXFieldState<PXFieldOptions.Readonly>;
	UsagePrice: PXFieldState<PXFieldOptions.Readonly>;
	UsagePriceVal: PXFieldState<PXFieldOptions.Readonly>;
}

@gridConfig({
	preset: GridPreset.Processing,
	showNoteFiles: GridNoteFilesShowMode.Force
})
export class ContractDetail extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;

	Contract__StrIsTemplate: PXFieldState;

	@linkCommand("ViewContract")
	Contract__ContractCD: PXFieldState;

	Contract__Status: PXFieldState;
	BasePriceOption: PXFieldState;
	BasePrice: PXFieldState;
	BasePriceVal: PXFieldState;
	RenewalPriceOption: PXFieldState;
	RenewalPrice: PXFieldState;
	RenewalPriceVal: PXFieldState;
	FixedRecurringPriceOption: PXFieldState;
	FixedRecurringPrice: PXFieldState;
	FixedRecurringPriceVal: PXFieldState;
	UsagePriceOption: PXFieldState;
	UsagePrice: PXFieldState;
	UsagePriceVal: PXFieldState;
}
