import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig,
	GridPreset, GridColumnDisplayMode, GridNoteFilesShowMode,
} from "client-controls";

import { AP503000 } from "./AP503000";

export class PayBillsFilter extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayDate: PXFieldState<PXFieldOptions.CommitChanges>;
	PayFinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowPayInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	PayInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	Days: PXFieldState<PXFieldOptions.Disabled>;
	ShowDueInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	DueInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowDiscountExpiresInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountExpiresInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	TakeDiscAlways: PXFieldState<PXFieldOptions.CommitChanges>;
	GLBalance: PXFieldState<PXFieldOptions.Disabled>;
	CashBalance: PXFieldState<PXFieldOptions.Disabled>;
	CurySelTotal: PXFieldState<PXFieldOptions.Disabled>;
	SelCount: PXFieldState<PXFieldOptions.Disabled>;
	APQuickBatchGeneration: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
	adjustPageSize: false,
	pageSize: 100,
	mergeToolbarWith: "",
	actionsConfig: { insert: { hidden: false } },
	allowInsert: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class APAdjust extends PXView {


	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	AdjdDocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorConfig: {
			parameters: (screen: AP503000) => ({
				"APAdjust.adjdDocType": screen.APDocumentList.activeRow.AdjdDocType.value
			})
		}
	})
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState;

	@columnConfig({
		hideViewLink: true,
		editorConfig: {
			parameters: (screen: AP503000) => ({
				"APAdjust.adjdDocType": screen.APDocumentList.activeRow.AdjdDocType.value,
				"APAdjust.adjdRefNbr": screen.APDocumentList.activeRow.AdjdRefNbr.value.id,
			})
		}
	})
	AdjdLineNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorID_Vendor_acctName: PXFieldState;
	PaymentProjectID: PXFieldState;

	@columnConfig({
		editorConfig: {
			parameters: (screen: AP503000) => ({
				"APTran.projectID": screen.APDocumentList.activeRow.PaymentProjectID.value.id,
			})
		}
	})
	APTran__TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTran__CostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTran__AccountID: PXFieldState;

	APTran__InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APInvoice__VendorLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	APInvoice__SuppliedByVendorID: PXFieldState;

	SeparateCheck: PXFieldState;
	APInvoice__IsRetainageDocument: PXFieldState;
	@linkCommand("ViewOriginalDocument")
	APInvoice__OrigRefNbr: PXFieldState;

	APInvoice__PayDate: PXFieldState;
	APInvoice__DueDate: PXFieldState;
	APInvoice__DiscDate: PXFieldState;
	APInvoice__DocDate: PXFieldState;
	CuryAdjgAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	APInvoice__IsJointPayees: PXFieldState;

	@columnConfig({ allowSort: false })
	JointPayeeExternalName: PXFieldState;

	@columnConfig({ allowSort: false })
	CuryJointAmountOwed: PXFieldState;

	@columnConfig({ allowSort: false })
	CuryJointBalance: PXFieldState;

	CuryAdjgDiscAmt: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APInvoice__CuryID: PXFieldState;

	APInvoice__InvoiceNbr: PXFieldState;
	APInvoice__DocDesc: PXFieldState;

}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress
})
export class APAdjust2 extends PXView {
	AdjdDocType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewInvoice")
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AdjdLineNbr: PXFieldState;

	VendorID_Vendor_acctName: PXFieldState;

	APTran__ProjectID: PXFieldState;

	@columnConfig({
		editorConfig: {
			parameters: (screen: AP503000) => ({
				"APTran.projectID": screen.APExceptionsList.activeRow.APTran__ProjectID.value.id,
			})
		}
	})
	APTran__TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTran__CostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APTran__AccountID: PXFieldState;

	APTran__InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APInvoice__VendorLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	APInvoice__SuppliedByVendorID: PXFieldState;

	SeparateCheck: PXFieldState;
	APInvoice__IsRetainageDocument: PXFieldState;

	@linkCommand("ViewInvoice")
	APInvoice__OrigRefNbr: PXFieldState;

	APInvoice__PayDate: PXFieldState;
	APInvoice__DueDate: PXFieldState;
	APInvoice__DiscDate: PXFieldState;
	APInvoice__DocDate: PXFieldState;

	CuryAdjgAmt: PXFieldState<PXFieldOptions.CommitChanges>;

	CuryAdjgDiscAmt: PXFieldState;

	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APInvoice__CuryID: PXFieldState;

	APInvoice__InvoiceNbr: PXFieldState;
	APInvoice__DocDesc: PXFieldState;
}
