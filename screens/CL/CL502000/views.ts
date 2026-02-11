import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	GridColumnType,
	GridPreset,
	gridConfig,
} from "client-controls";

export class ProcessLienWaiversFilter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectId: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorId: PXFieldState<PXFieldOptions.CommitChanges>;
	LienWaiverType: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ShouldShowProcessed: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintWithDeviceHub: PXFieldState<PXFieldOptions.CommitChanges>;
	DefinePrinterManually: PXFieldState<PXFieldOptions.CommitChanges>;
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfCopies: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class ComplianceDocument extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 35,
	})
	Selected: PXFieldState;
	CreationDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DocumentTypeValue: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Status: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox })
	Required: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox })
	Received: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox, width: 120 })
	IsReceivedFromJointVendor: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox, width: 100 })
	IsProcessed: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox })
	IsVoided: PXFieldState;
	@columnConfig({ type: GridColumnType.CheckBox })
	IsCreatedAutomatically: PXFieldState;
	ProjectID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;
	CustomerName: PXFieldState;
	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;
	VendorName: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Subcontract: PXFieldState;
	Subcontract__OrderTotal: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PurchaseOrder: PXFieldState;
	POOrder__OrderTotal: PXFieldState;
	ComplianceDocumentAPDocumentReference__Type: PXFieldState;
	ComplianceDocumentAPDocumentReference__ReferenceNumber: PXFieldState;
	BillAmount: PXFieldState;
	LienWaiverAmount: PXFieldState;
	LienNoticeAmount: PXFieldState;
	ComplianceDocumentAPPaymentReference__Type: PXFieldState;
	ComplianceDocumentAPPaymentReference__ReferenceNumber: PXFieldState;
	PaymentDate: PXFieldState;
	ThroughDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	JointVendorInternalId: PXFieldState;
	JointVendorExternalName: PXFieldState;
	JointAmount: PXFieldState;
	JointLienWaiverAmount: PXFieldState;
	JointLienNoticeAmount: PXFieldState;
	ComplianceDocumentID: PXFieldState;
}
