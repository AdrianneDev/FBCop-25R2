import { PortalScreen } from "../sp-base";
import "../sp-common.scss";
import "./SP314001.css";

import {
	createCollection, createSingle, graphInfo, PXView, PXFieldOptions,
	PXFieldState, linkCommand, columnConfig, GridFilterBarVisibility,
	GridPreset,
	gridConfig
} from "client-controls";

export class CurrentDocument extends PXView {
	RefNbr: PXFieldState<PXFieldOptions.Disabled>;
	CustomerID: PXFieldState;
	DocDate: PXFieldState;
	DueDate: PXFieldState;
	curyOrigDocAmt: PXFieldState;
	CuryDocBal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Empty,
	adjustPageSize: true,
	pageSize: 20,
	showFilterBar: GridFilterBarVisibility.False,
	mergeToolbarWith: "ScreenToolbar",
	topBarItems: {
		refresh: { config: { hidden: true, visibleOnToolbar: false } },
		adjust: { config: { hidden: true, visibleOnToolbar: false } },
		exportToExcel: { config: { hidden: true, visibleOnToolbar: false } },
	}
})
export class AdjustmentsLine extends PXView {
	@linkCommand("viewPaymentDetails") AdjgRefNbr: PXFieldState;
	AdjgDocDate: PXFieldState;
	CuryAdjdAmt: PXFieldState;
	@columnConfig({ hideViewLink: true }) ARPayment__CashAccountID: PXFieldState;
	@columnConfig({ hideViewLink: true }) ARPayment__CuryID: PXFieldState;
	ARPayment__Status: PXFieldState;
}

@graphInfo({ graphType: "PX.Objects.Portals.SPInvoiceDetailsMaint", primaryView: "CurrentDocument" })
export class SP314001 extends PortalScreen {
	CurrentDocument = createSingle(CurrentDocument);
	Adjustments = createCollection(AdjustmentsLine);
}
