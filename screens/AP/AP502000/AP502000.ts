import {
	PXView, PXFieldState, gridConfig, PXPageLoadBehavior, PXFieldOptions, linkCommand, columnConfig, PXActionState, GridPreset,
	createCollection, createSingle, PXScreen, graphInfo, GridColumnDisplayMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AP.APApproveBills",
	primaryView: "Filter",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class AP502000 extends PXScreen {

	viewDocument: PXActionState;

	Filter = createSingle(ApproveBillsFilter);
	APDocumentList = createCollection(APInvoice);

}

export class ApproveBillsFilter extends PXView {
	SelectionDate: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowApprovedForPayment: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowNotApprovedForPayment: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowPayInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	PayInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	Days: PXFieldState<PXFieldOptions.Disabled>;
	ShowDueInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	DueInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowDiscountExpiresInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	DiscountExpiresInLessThan: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryApprovedTotal: PXFieldState<PXFieldOptions.Disabled>;
	CuryDocsTotal: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Processing })
export class APInvoice extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	PaySel: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("viewDocument")
	RefNbr: PXFieldState;

	DocDesc: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	VendorID_Vendor_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Both })
	SuppliedByVendorID: PXFieldState;

	SeparateCheck: PXFieldState;
	PayDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DueDate: PXFieldState;
	DiscDate: PXFieldState;
	CuryDocBal: PXFieldState;
	CuryDiscBal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayLocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PayTypeID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PayAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	InvoiceNbr: PXFieldState;

}
