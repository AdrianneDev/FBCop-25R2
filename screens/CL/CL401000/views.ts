import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	linkCommand,
	columnConfig,
	GridColumnType,
	TextAlign,
	GridPreset, GridColumnGeneration,
} from "client-controls";

@gridConfig({
	preset: GridPreset.Primary,
	initNewRow: true,
	generateColumns: GridColumnGeneration.Append
})
export class ComplianceDocument extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 150,
	})
	DocumentType: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		textAlign: TextAlign.Left,
		width: 120,
	})
	CreationDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DocumentTypeValue: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		hideViewLink: true,
		width: 200,
	})
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
		width: 100,
	})
	Required: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
		width: 110,
	})
	Received: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	ReceivedDate: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
		width: 120
	})
	IsReceivedFromJointVendor: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Left,
		width: 120
	})
	JointReceivedDate: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
		width: 120
	})
	IsProcessed: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsVoided: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox,
		width: 120,
	})
	IsCreatedAutomatically: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	SentDate: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	EffectiveDate: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsExpired: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	ExpirationDate: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	Limit: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	MethodSent: PXFieldState;
	@linkCommand("ComplianceViewProject")
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceViewCostTask")
	@columnConfig({ textAlign: TextAlign.Left })
	CostTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceViewRevenueTask")
	@columnConfig({ textAlign: TextAlign.Left })
	RevenueTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceViewCostCode")
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceViewCustomer")
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Left })
	CustomerName: PXFieldState;
	@linkCommand("ComplianceViewVendor")
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Left })
	VendorName: PXFieldState;
	@linkCommand("ComplianceViewSecondaryVendor")
	SecondaryVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Left })
	SecondaryVendorName: PXFieldState;
	@linkCommand("ComplianceDocument$PurchaseOrder$Link")
	@columnConfig({ width: 150 })
	PurchaseOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		textAlign: TextAlign.Left,
		hideViewLink: true,
		width: 130,
	})
	PurchaseOrderLineItem: PXFieldState;
	@linkCommand("ComplianceDocument$Subcontract$Link")
	Subcontract: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		textAlign: TextAlign.Left,
		hideViewLink: true,
		width: 100,
	})
	SubcontractLineItem: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceDocument$ChangeOrderNumber$Link")
	ChangeOrderNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceDocument$InvoiceID$Link")
	@columnConfig({ width: 150 })
	InvoiceID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Right })
	InvoiceAmount: PXFieldState;
	@linkCommand("ComplianceDocument$BillID$Link")
	BillID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Right })
	BillAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	LienWaiverAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	LienNoticeAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	SponsorOrganization: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	CertificateNumber: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	InsuranceCompany: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	Policy: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left, hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceDocument$ApCheckID$Link")
	@columnConfig({
		textAlign: TextAlign.Left,
		width: 150,
	})
	ApCheckID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Left })
	CheckNumber: PXFieldState;
	@linkCommand("ComplianceDocument$ArPaymentID$Link")
	@columnConfig({
		textAlign: TextAlign.Left,
		width: 150,
	})
	ArPaymentID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceDocument$ProjectTransactionID$Link")
	@columnConfig({
		textAlign: TextAlign.Left,
		width: 150,
	})
	ProjectTransactionID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Left })
	PaymentDate: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	ReceiptDate: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	DateIssued: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	ThroughDate: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	ReceiveDate: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	ReceivedBy: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	SourceType: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox
	})
	IsRequiredJointCheck: PXFieldState;
	@linkCommand("ComplianceViewJointVendor")
	@columnConfig({ textAlign: TextAlign.Left })
	JointVendorInternalId: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ textAlign: TextAlign.Left })
	JointVendorExternalName: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	JointAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	JointLienWaiverAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Right })
	JointLienNoticeAmount: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Left })
	JointRelease: PXFieldState;
	@columnConfig({
		textAlign: TextAlign.Center,
		type: GridColumnType.CheckBox
	})
	JointReleaseReceived: PXFieldState;
	@columnConfig({ width: 110 })
	ComplianceDocumentID: PXFieldState;
	@columnConfig({hideViewLink: true})
	ApPaymentMethodID: PXFieldState;
	@columnConfig({hideViewLink: true})
	ArPaymentMethodID: PXFieldState;
}
