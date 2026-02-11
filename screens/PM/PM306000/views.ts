import {
	PXFieldState,
	columnConfig,
	linkCommand,
	PXFieldOptions,
	gridConfig,
	PXView,
	GridPreset,
	GridColumnDisplayMode
} from "client-controls";

export class Filter extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCode: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	wrapToolbar: true,
	adjustPageSize: false
})
export class Items extends PXView {
	POLineCommitment__RelatedDocumentTypeExt: PXFieldState;
	@linkCommand("PMCommitment$RefNoteID$Link")
	RefNoteID: PXFieldState;
	@linkCommand("ViewVendor")
	POLineCommitment__VendorID: PXFieldState;
	POLineCommitment__VendorName: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 130,
	 })
	POOrder__OwnerID: PXFieldState;
	Type: PXFieldState;
	Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;
	@linkCommand("ViewProject")
	ProjectID: PXFieldState;
	PMProject__Description: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectTaskID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountGroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;
	@linkCommand("ViewExternalCommitment")
	ExtRefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;
	ProjectCuryID: PXFieldState;
	OrigQty: PXFieldState;
	OrigAmount: PXFieldState;
	CommittedCOQty: PXFieldState;
	CommittedCOAmount: PXFieldState;
	Qty: PXFieldState;
	Amount: PXFieldState;
	OpenQty: PXFieldState;
	OpenAmount: PXFieldState;
	ReceivedQty: PXFieldState;
	InvoicedQty: PXFieldState;
	InvoicedAmount: PXFieldState;
	CommittedVarianceQty: PXFieldState;
	CommittedVarianceAmount: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
	})
	PMProject__OwnerID: PXFieldState;
	POOrder__OrderDate: PXFieldState;
}
