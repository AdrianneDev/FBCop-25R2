import "../sp-common.scss";
import {
	createCollection, createSingle, graphInfo, PXView, PXFieldOptions,
	PXFieldState, linkCommand, columnConfig, GridNoteFilesShowMode,
	gridConfig,
	GridPreset
} from "client-controls";
import { PortalScreen } from "../sp-base";
import { PayMethodViewBase } from "../sp-paymethod";

export class ARPaymentView extends PayMethodViewBase {
	RefNbr: PXFieldState<PXFieldOptions.Disabled>;
	Status: PXFieldState;
	AdjDate: PXFieldState;
	DocDesc: PXFieldState;
	CuryID: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	CashAccountID: PXFieldState;
	CustomerPaymentMethod__Descr: PXFieldState;
	ExtRefNbr: PXFieldState;
	PaymentMethodID: PXFieldState;
	DocType: PXFieldState<PXFieldOptions.Disabled>;
	CuryDocDisc: PXFieldState;
	get PayMethodDescr() {
		return this.CustomerPaymentMethod__Descr;
	}

	get PayMethodID() {
		return this.PaymentMethodID;
	}
}

@gridConfig({
	preset: GridPreset.Empty,
	initNewRow: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	wrapToolbar: true,
	adjustPageSize: true,
	allowUpdate: false,
	allowDelete: false,
	allowInsert: false,
	topBarItems: {
		refresh: { config: { hidden: true, visibleOnToolbar: false } },
		adjust: { config: { hidden: true, visibleOnToolbar: false } },
		exportToExcel: { config: { hidden: true, visibleOnToolbar: false } },
	}
})
export class ARPostView extends PXView {
	@linkCommand("viewInvoiceDetails") SourceRefNbr: PXFieldState;
	@columnConfig({ hideViewLink: true }) ARRegisterAlias__CustomerID: PXFieldState;
	ARRegisterAlias__DocDate: PXFieldState;
	ARRegisterAlias__DueDate: PXFieldState;
	ARRegisterAlias__InvoiceTotal: PXFieldState;
	CuryBalanceAmt: PXFieldState;
	@columnConfig({ hideViewLink: true }) ARRegisterAlias__CuryID: PXFieldState;
	CuryPPDAmt: PXFieldState;
	ARInvoice__DiscDate: PXFieldState;
	CuryAmt: PXFieldState;
	@linkCommand("ViewInvoices") ARInvoice__CuryPaymentTotal: PXFieldState;
}


@graphInfo({ graphType: "PX.Objects.Portals.SPPaymentDetailsMaint", primaryView: "CurrentDocument" })
export class SP334000 extends PortalScreen {
	CurrentDocument = createSingle(ARPaymentView);
	ARPost = createCollection(ARPostView);
}
