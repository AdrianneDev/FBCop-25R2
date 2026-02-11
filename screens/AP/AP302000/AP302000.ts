import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, controlConfig,
	linkCommand, columnConfig, PXActionState, CurrencyInfo, viewInfo, gridConfig, GridPreset, GridColumnDisplayMode, ISelectorControlConfig
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.AP.APPaymentEntry",
	primaryView: "Document",
	udfTypeField: "DocType",
	showUDFIndicator: true,
	bpEventsIndicator: true,
	showActivitiesIndicator: true
})
export class AP302000 extends PXScreen {
	ViewDocumentToApply: PXActionState;
	ViewCurrentBatch: PXActionState;
	ViewApplicationDocument: PXActionState;
	ViewPPDVATAdj: PXActionState;
	ViewVoucherBatch: PXActionState;
	ViewWorkBook: PXActionState;
	NewVendor: PXActionState;
	EditVendor: PXActionState;
	LoadPOOrders: PXActionState;
	AddJointPayee: PXActionState;
	ValidatePayment: PXActionState;

	@viewInfo({containerName: "Payment Summary"})
	Document = createSingle(Document);

	@viewInfo({containerName: "Documents to Apply"})
	Adjustments = createCollection(Adjustments);

	@viewInfo({containerName: "Application History"})
	APPost = createCollection(APPost);

	@viewInfo({containerName: "Current Document"})
	CurrentDocument = createSingle(CurrentDocument);

	@viewInfo({containerName: "Remittance -> Remittance Contact"})
	Remittance_Contact = createSingle(Contact);

	@viewInfo({containerName: "Remittance -> Remittance Address"})
	Remittance_Address = createSingle(Address);

	@viewInfo({containerName: "Charges"})
	PaymentCharges = createCollection(PaymentCharges);

	@viewInfo({ containerName: "Payment Summary -> Rate Selection" })
	CurrencyInfo = createSingle(CurrencyInfo);

}

export class Document extends PXView {

	DocType: PXFieldState;

	@controlConfig<ISelectorControlConfig>({
		fastFilterFields: ["RefNbr", "APPayment__ExtRefNbr", "VendorID", "VendorID_Vendor_acctName", "APInvoice__InvoiceNbr", "DocDesc"]
	})
	RefNbr: PXFieldState;

	Status: PXFieldState;
	AdjDate: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	ExtRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({allowEdit: true})
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	VendorLocationID: PXFieldState<PXFieldOptions.CommitChanges>;

	PaymentMethodID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState;
	DepositAfter: PXFieldState;
	DocDesc: PXFieldState<PXFieldOptions.Multiline>;
	CuryOrigDocAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryPOApplAmt: PXFieldState<PXFieldOptions.Disabled>;
	CuryUnappliedBal: PXFieldState;
	CuryInitDocBal: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryApplAmt: PXFieldState;
	CuryChargeAmt: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({ preset: GridPreset.Details })
export class Adjustments extends PXView {
	LoadInvoices: PXActionState;
	AddJointPayeesFromDialog: PXActionState;

	@columnConfig({ hideViewLink: true })
	AdjdBranchID: PXFieldState;

	AdjdDocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewDocumentToApply")
	@columnConfig({
		editorConfig: {
			parameters: (screen: AP302000) => ({
				"APPayment.vendorID": screen.Document.VendorID.value.id,
				"APAdjust.adjdDocType": screen.Adjustments.activeRow.AdjdDocType.value
			})
		},
	})
	@controlConfig<ISelectorControlConfig>({
		fastFilterFields: ["AdjRefNbr", "RefNbr", "InvoiceNbr", "Description"]
	})
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		hideViewLink: true,
		editorConfig: {
			parameters: (screen: AP302000) => ({
				"APAdjust.adjdDocType": screen.Adjustments.activeRow.AdjdDocType.value,
				"APAdjust.adjdRefNbr": screen.Adjustments.activeRow.AdjdRefNbr.value.id
			})
		}
	})
	AdjdLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	APTran__InventoryID: PXFieldState;
	PaymentProjectID: PXFieldState;
	@columnConfig({
			editorConfig: {
				parameters: (screen: AP302000) => ({
					"APTran.projectID": screen.Adjustments.activeRow.PaymentProjectID.value.id,
				})
			}
		})
	APTran__TaskID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	APTran__CostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTran__AccountID: PXFieldState;

	CuryAdjgAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgPPDAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryAdjgWhTaxAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjdDocDate: PXFieldState;
	APInvoice__DueDate: PXFieldState;
	APInvoice__DiscDate: PXFieldState;
	AdjdCuryRate: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;
	CuryWhTaxBal: PXFieldState;
	APInvoice__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AdjdCuryID: PXFieldState;

	AdjdFinPeriodID: PXFieldState;
	APInvoice__InvoiceNbr: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both, hideViewLink: true })
	APInvoice__SuppliedByVendorID: PXFieldState;

	HasExpiredComplianceDocuments: PXFieldState;
	StubNbr: PXFieldState<PXFieldOptions.CommitChanges>;

}


@gridConfig({ preset: GridPreset.Details })
export class APPost extends PXView {

	ReverseApplication: PXActionState;

	@columnConfig({ hideViewLink: true })
	APRegister__BranchID: PXFieldState;

	@linkCommand("ViewCurrentBatch")
	BatchNbr: PXFieldState;

	SourceDocType: PXFieldState;

	@linkCommand("ViewApplicationDocument")
	SourceRefNbr: PXFieldState;

	LineNbr: PXFieldState;

	APTran__InventoryID: PXFieldState;
	PaymentProjectID: PXFieldState;
	@columnConfig({
			editorConfig: {
				parameters: (screen: AP302000) => ({
					"APTran.projectID": screen.APPost.activeRow.PaymentProjectID.value.id,
				})
			}
		})
	APTran__TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTran__CostCodeID: PXFieldState;

	@columnConfig({hideViewLink: true})
	APTran__AccountID: PXFieldState;

	CuryAmt: PXFieldState;
	CuryPPDAmt: PXFieldState;
	CuryWhTaxAmt: PXFieldState;
	FinPeriodID: PXFieldState;
	ApplicationDate: PXFieldState;
	APRegister__DocDate: PXFieldState;
	APInvoice__DueDate: PXFieldState;
	APInvoice__DiscDate: PXFieldState;
	CuryBalanceAmt: PXFieldState;
	CuryDiscBalanceAmt: PXFieldState;
	APRegister__DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APRegister__CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APRegister__FinPeriodID: PXFieldState;

	APInvoice__InvoiceNbr: PXFieldState;
	APAdjust2__TaxInvoiceNbr: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both, hideViewLink: true })
	APInvoice__SuppliedByVendorID: PXFieldState;

	APAdjust2__PendingPPD: PXFieldState;

	@linkCommand("ViewPPDVATAdj")
	@columnConfig({ allowFilter: false, allowSort: false })
	APAdjust2__PPDVATAdjDescription: PXFieldState;

	APAdjust2__HasExpiredComplianceDocuments: PXFieldState;
	APAdjust2__StubNbr: PXFieldState;

}

export class CurrentDocument extends PXView {

	@controlConfig({allowEdit: true})
	BatchNbr: PXFieldState;

	DisplayCuryInitDocBal: PXFieldState;

	@controlConfig({ displayMode: "id" }) // it works
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;

	APAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	APSubID: PXFieldState;
	DocDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	Cleared: PXFieldState<PXFieldOptions.CommitChanges>;
	ClearDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DepositAsBatch: PXFieldState<PXFieldOptions.CommitChanges>;
	Deposited: PXFieldState;
	DepositDate: PXFieldState;

	@controlConfig({ allowEdit: true })
	DepositNbr: PXFieldState;

	@controlConfig({ linkCommand: "ViewOriginalDocument" })
	OrigRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	PrintCheck: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	BatchPaymentRefNbr: PXFieldState<PXFieldOptions.Disabled>;

	ExternalPaymentStatus: PXFieldState;
	ExternalPaymentUpdateTime: PXFieldState;
	ExternalPaymentDisbursementType: PXFieldState;
	ExternalPaymentSentDate: PXFieldState;
	ExternalPaymentCheckNbr: PXFieldState;
	ExternalPaymentTraceNbr: PXFieldState;
	ExternalPaymentBatchNbr: PXFieldState;
	ExternalPaymentCardNbr: PXFieldState;
	PaymentCannotbeVoidedMessage: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details })
export class PaymentCharges extends PXView {

	@columnConfig({ hideViewLink: true })
	EntryTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;

	CuryTranAmt: PXFieldState<PXFieldOptions.CommitChanges>;

}
