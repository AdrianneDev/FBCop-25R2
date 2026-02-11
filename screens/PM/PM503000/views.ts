import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	GridColumnDisplayMode,
	PXView
} from "client-controls";

export class Filter extends PXView {
	InvoiceDate: PXFieldState<PXFieldOptions.CommitChanges>;
	InvFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	StatementCycleId: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	TemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class Items extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 35
	})
	Selected: PXFieldState;
	@linkCommand("viewDocumentProject")
	ContractCD: PXFieldState;
	@columnConfig({ width: 350 })
	Description: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState<PXFieldOptions.Disabled>;
	CustomerID_Customer_acctName: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true
	})
	OwnerID: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ hideViewLink: true })
	DefaultBranchID: PXFieldState<PXFieldOptions.Disabled>;
	FromDate: PXFieldState<PXFieldOptions.Disabled>;
	NextDate: PXFieldState<PXFieldOptions.Disabled>;
	@columnConfig({ width: 130 })
	BillingResult: PXFieldState<PXFieldOptions.Disabled>;
	LastDate: PXFieldState<PXFieldOptions.Disabled>;
}
