import {
	PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, createCollection, createSingle,
	PXScreen, graphInfo, PXPageLoadBehavior, PXActionState, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APReleaseChecks", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AP505200 extends PXScreen {

	viewDocument: PXActionState;
	Reprint: PXActionState;
	VoidReprint: PXActionState;
	Release: PXActionState;

	Filter = createSingle(ReleaseChecksFilter);
	APPaymentList = createCollection(APPayment);

}

export class ReleaseChecksFilter extends PXView {
	PayTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	PayAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	CuryID: PXFieldState<PXFieldOptions.Disabled>;
	GLBalance: PXFieldState<PXFieldOptions.Disabled>;
	CashBalance: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Processing })
export class APPayment extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ allowSort: false })
	PrintCheck: PXFieldState;

	BranchID: PXFieldState;
	ExtRefNbr: PXFieldState;
	DocDate: PXFieldState;
	DocType: PXFieldState;

	@linkCommand("viewDocument")
	RefNbr: PXFieldState;

	VendorID: PXFieldState;
	VendorID_Vendor_acctName: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
}
