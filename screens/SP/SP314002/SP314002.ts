import {
	controlConfig,
	GridCell,
	linkCommand,
	QpGridCustomElement,
	QpGridEventArgs,
	readOnly,
	ScreenUpdateParams,
	viewInfo
} from "client-controls";
import { autoinject, computedFrom, observable } from "aurelia-framework";
import { Messages as SysMessages } from "client-controls/services/messages";
import {
	createCollection, createSingle, graphInfo, commitChanges, PXView, localizable, GridAutoGrowMode, PXActionState,
	PXFieldState, PXFieldOptions, columnConfig, GridNoteFilesShowMode, gridConfig, GridPreset
} from "client-controls";
import { PaymentMethodView, PayMethodsPortalScreen } from "../sp-base-pm";

export class ARPayment extends PXView {
	OrigDocAmt: GridCell;
	CuryID: GridCell;
	CuryDiscBal: GridCell;
	CuryOrigDocAmt: GridCell;
	CuryOrigDocAmt_Text: GridCell;
	DocDesc: PXFieldState<PXFieldOptions.CommitChanges>;
	NewCard: PXFieldState<PXFieldOptions.CommitChanges>;
	NewEFT: PXFieldState<PXFieldOptions.CommitChanges>;
	SaveCard: PXFieldState<PXFieldOptions.CommitChanges>;
	SaveEFT: PXFieldState<PXFieldOptions.CommitChanges>;
	PaymentMethodID: PXFieldState;
	@controlConfig({ displayMode: "text" })
	PMInstanceID: PXFieldState<PXFieldOptions.CommitChanges>;
	CashAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SPPayInvoiceMaintState extends PXView {
	DocumentCount: GridCell;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	showRowSelectors: false,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	pageSize: 20,
})
export class ARAdjust extends PXView {
	@linkCommand("viewInvoice") AdjdRefNbr: PXFieldState;
	@columnConfig({hideViewLink: true }) AdjdCustomerID: PXFieldState;
	@commitChanges CuryAdjgAmt: PXFieldState;
	CuryAdjgDiscAmt: PXFieldState;
	@columnConfig({hideViewLink: true }) AdjdCuryID: PXFieldState;
	CuryAdjgPPDAmt: PXFieldState;
	@linkCommand("removeAdjustment") Remove: PXFieldState;

	@readOnly @controlConfig({ linkCommand: "viewInvoice", displayMode: "id", allowEdit: true }) ARInvoice__RefNbr: PXFieldState;
	ARInvoice__DocType: PXFieldState;
	ARInvoice__DocDate: PXFieldState;
	ARInvoice__ExtRefNbr: PXFieldState;
	ARInvoice__DocDesc: PXFieldState;
	ARInvoice__DueDate: PXFieldState;
	ARInvoice__DiscDate: PXFieldState;
	@controlConfig({ displayMode: "text", allowEdit: false  }) ARInvoice__CustomerID: PXFieldState;
	ARInvoice__CustomerID_Customer_acctName: PXFieldState;
	ARInvoice__CuryOrigDiscAmt: PXFieldState;
	ARInvoice__CuryOrigDiscAmt_Text: PXFieldState;
	ARInvoice__CuryOrigDocAmt_Text: PXFieldState;
	ARInvoice__CuryDocBal_Text: PXFieldState;

	get passedDue() {
		return this.ARInvoice__DueDate.value != null
			&& new Date(this.ARInvoice__DueDate.value) <= new Date();
	}
}

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
})
export class SOAdjust extends PXView {
	ViewSODocumentToApply: PXActionState;

	@columnConfig({ hideViewLink: true })
	AdjdOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	@linkCommand("removeSOAdjustment") Remove: PXFieldState;

	@linkCommand("ViewSODocumentToApply")
	AdjdOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrder__Status: PXFieldState;
	@commitChanges CuryAdjgAmt: PXFieldState;
	CuryAdjgTransferredToChildrenAmt: PXFieldState;
	CuryAdjgBilledAmt: PXFieldState;
	AdjdOrderDate: PXFieldState;
	SOOrder__DueDate: PXFieldState;
	SOOrder__DiscDate: PXFieldState;
	CuryDocBal: PXFieldState;
	CuryDocBal_Text: PXFieldState;
	@readOnly @controlConfig({ editCommand: "viewOrder", displayMode: "id", allowEdit: true }) SOOrder__OrderNbr: PXFieldState;
	@readOnly SOOrder__OrderType: PXFieldState;
	@readOnly SOOrder__OrderDesc: PXFieldState;
	@readOnly SOOrder__CuryOrderTotal: PXFieldState;
	@readOnly SOOrder__CustomerOrderNbr: PXFieldState;
	@readOnly SOOrder__ShipDate: PXFieldState;
	@readOnly SOOrder__OrderQty: PXFieldState;
	@readOnly SOOrder__UnbilledOrderQty: PXFieldState;
	@readOnly SOOrder__OpenOrderQty: PXFieldState;
	@readOnly SOOrder__CuryOrderTotal_Text: PXFieldState;
	@readOnly SOOrder__CuryUnbilledOrderTotal_Text: PXFieldState;
	@readOnly SOOrder__CuryOpenOrderTotal_Text: PXFieldState;
	@readOnly SOOrder__CuryPaidAmt_Text: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrder__CuryID: PXFieldState;

	Customer__LegalName: PXFieldState;
	Location__Descr: PXFieldState;

	SOOrder__InvoiceNbr: PXFieldState;
	SOOrder__InvoiceDate: PXFieldState;
	get passedDue() {
		return this.SOOrder__DueDate.value != null && new Date(this.SOOrder__DueDate.value) <= new Date();
	}
}


@localizable
class Messages {
	static Documents = "Documents";
	static PaymentMethod = "Payment Method";
	static PaymentDescription = "Payment Description";
	static Pay = "Pay";
	static InvoiceTotal = "Invoice Total";
	static CashDiscount = "Cash Discount";
	static AmountPaid = "Amount Paid";
	static AmountToPay = "Balance";
	static Due = "Due Date";
	static ValidTill = "Cash Discount Date";
	static ProceedToPayment = "Proceed to Pay";
	static PaymentAmount = "Payment Amount";
	static Exp = "Exp. Date";
	static DocumentListEmpty = "No documents were selected for payment";
}

@graphInfo({ graphType: "PX.Objects.Portals.SPPayInvoiceMaint", primaryView: "Document" })
@autoinject
export class SP314002 extends PayMethodsPortalScreen {
	msg = Messages;
	SysMessages = SysMessages;
	Pay: PXActionState;
	RemoveAdjustment: PXActionState;
	RemoveSOAdjustment: PXActionState;

	Document = createSingle(ARPayment);
	Adjustments = createCollection(ARAdjust);
	SOAdjustments = createCollection(SOAdjust);
	@viewInfo({ syncAlways: true })
	PayState = createSingle(SPPayInvoiceMaintState);

	@observable({ changeHandler: "selectedPaymentMethodChanged"})
	protected selectedPaymentMethod: PaymentMethodView | undefined;

	@computedFrom("Document.CuryOrigDocAmt_Text", "Document.CuryOrigDocAmt_Text.value")
	get currencySign() {
		return this.Document.CuryOrigDocAmt_Text.value?.charAt(0);
	}

	private initializingWizard = false;

	async attached() {
		await super.attached();
	}

	protected async selectedPaymentMethodChanged() {
		if (this.initializingWizard) return; // not a change from UI

		this.Document.PaymentMethodID.updateValue(this.selectedPaymentMethod?.PaymentMethodID?.value ?? null);
		this.Document.PMInstanceID.updateValue(this.selectedPaymentMethod?.PMInstanceID?.value ?? null);
		this.Document.CashAccountID.updateValue(this.selectedPaymentMethod?.CashAccountID?.value ?? null);

		await this.screenService.update("UpdatePaymentMethod", new ScreenUpdateParams({ blockPage: false, views: ["PaymentMethodSection", "Document"] }));
	}

	protected paymentMethodsDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;
		try {
			this.initializingWizard = true;
			if (!this.Document.PMInstanceID.value) {
				this.selectedPaymentMethod = undefined;
				return;
			};
			this.selectedPaymentMethod = this.PaymentMethods.records.find(x =>
				x.PMInstanceID.value.id === this.Document.PMInstanceID.value.id);
		}
		finally {
			this.initializingWizard = false;
		}
	}
}
