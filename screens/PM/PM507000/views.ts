import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	gridConfig,
	GridPreset,
	GridFilterBarVisibility
} from "client-controls";

export class Filter extends PXView {
	Country: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		nullText: "All"
	})
	DocumentType: PXFieldState<PXFieldOptions.CommitChanges>;
	IsOverride: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class DocumentAddresses extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowSort: false,
		width: 35,
	})
	Selected: PXFieldState;
	@linkCommand("ViewDocument")
	DocumentNbr: PXFieldState;
	DocumentType: PXFieldState;
	Status: PXFieldState;
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	State: PXFieldState;
	PostalCode: PXFieldState;
	CountryID: PXFieldState;
}

