import {
	PXView,
	PXFieldState,
	createCollection,
	gridConfig,
	GridPreset,
	columnConfig,
	linkCommand,
	GridColumnGeneration,
	PXActionState,
	viewInfo,
	featureInstalled,
	PXFieldOptions
} from "client-controls";

@featureInstalled("PX.Objects.CS.FeaturesSet+Construction")
export abstract class ComplianceDocumentBase {
	ComplianceViewProject: PXActionState;
	ComplianceViewCostTask: PXActionState;
	ComplianceViewRevenueTask: PXActionState;
	ComplianceViewCostCode: PXActionState;
	ComplianceViewCustomer: PXActionState;
	ComplianceViewVendor: PXActionState;
	ComplianceDocument$BillID$Link: PXActionState;
	ComplianceDocument$ApCheckID$Link: PXActionState;
	ComplianceDocument$ArPaymentID$Link: PXActionState;
	ComplianceDocument$InvoiceID$Link: PXActionState;
	ComplianceViewJointVendor: PXActionState;
	ComplianceDocument$ProjectTransactionID$Link: PXActionState;
	ComplianceDocument$PurchaseOrder$Link: PXActionState;
	ComplianceDocument$Subcontract$Link: PXActionState;
	ComplianceDocument$ChangeOrderNumber$Link: PXActionState;
	ComplianceViewSecondaryVendor: PXActionState;

	@viewInfo({ containerName: "Compliance" })
	ComplianceDocuments = createCollection(ComplianceDocuments);
}


@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	generateColumns: GridColumnGeneration.Append,
	keepPosition: true
})
export class ComplianceDocuments extends PXView {
	ExpirationDate: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	DocumentType: PXFieldState<PXFieldOptions.CommitChanges>;
	CreationDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	DocumentTypeValue: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Required: PXFieldState;
	Received: PXFieldState;
	ReceivedDate: PXFieldState;
	IsProcessed: PXFieldState;
	IsVoided: PXFieldState;
	IsCreatedAutomatically: PXFieldState;
	SentDate: PXFieldState;

	@linkCommand("ComplianceViewProject")
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceViewRevenueTask")
	RevenueTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceViewCostTask")
	CostTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceViewCostCode")
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ComplianceViewCustomer")
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerName: PXFieldState;
	@linkCommand("ComplianceViewVendor")
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorName: PXFieldState;
	IsExpired: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceDocument$ApCheckID$Link")
	ApCheckID: PXFieldState<PXFieldOptions.CommitChanges>;
	ApPaymentMethodID: PXFieldState;
	@linkCommand("ComplianceDocument$InvoiceID$Link")
	InvoiceID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvoiceAmount: PXFieldState;
	@linkCommand("ComplianceDocument$ArPaymentID$Link")
	ArPaymentID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	ArPaymentMethodID: PXFieldState;
	@linkCommand("ComplianceDocument$BillID$Link")
	BillID: PXFieldState<PXFieldOptions.CommitChanges>;
	BillAmount: PXFieldState;

	CertificateNumber: PXFieldState;
	@linkCommand("ComplianceDocument$ChangeOrderNumber$Link")
	ChangeOrderNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	DateIssued: PXFieldState;
	EffectiveDate: PXFieldState;
	InsuranceCompany: PXFieldState;

	JointAmount: PXFieldState;
	JointLienNoticeAmount: PXFieldState<PXFieldOptions>;
	JointVendorExternalName: PXFieldState;
	@linkCommand("ComplianceViewJointVendor")
	JointVendorInternalId: PXFieldState;
	JointLienWaiverAmount: PXFieldState;
	JointReceivedDate: PXFieldState;
	JointRelease: PXFieldState;
	JointReleaseReceived: PXFieldState;

	LienNoticeAmount: PXFieldState<PXFieldOptions.Hidden>;
	LienWaiverAmount: PXFieldState;

	Limit: PXFieldState;
	LinkToPayment: PXFieldState;
	MethodSent: PXFieldState;
	PaymentDate: PXFieldState;
	CheckNumber: PXFieldState;
	Policy: PXFieldState;

	@linkCommand("ComplianceDocument$ProjectTransactionID$Link")
	ProjectTransactionID: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("ComplianceDocument$PurchaseOrder$Link")
	PurchaseOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	PurchaseOrderLineItem: PXFieldState;

	ReceiptDate: PXFieldState;
	ReceiveDate: PXFieldState;
	ReceivedBy: PXFieldState;
	IsReceivedFromJointVendor: PXFieldState;
	IsRequiredJointCheck: PXFieldState;

	@linkCommand("ComplianceViewSecondaryVendor")
	SecondaryVendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	SecondaryVendorName: PXFieldState;

	Selected: PXFieldState;
	SourceType: PXFieldState;
	SponsorOrganization: PXFieldState;

	@linkCommand("ComplianceDocument$Subcontract$Link")
	Subcontract: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractLineItem: PXFieldState;
	ThroughDate: PXFieldState<PXFieldOptions.CommitChanges>;

	CreatedByID: PXFieldState;
	LastModifiedByID: PXFieldState;
}
