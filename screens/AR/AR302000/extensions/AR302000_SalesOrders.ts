import {
	AR302000
} from "../AR302000";

import {
	PXView,
	createCollection,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	linkCommand,
	columnConfig,
	GridPreset,
	gridConfig,
	viewInfo
} from "client-controls";


export interface AR302000_SalesOrders extends AR302000 { }
export class AR302000_SalesOrders {

	@viewInfo({containerName: "Sales Orders"})
	SOAdjustments = createCollection(SOAdjust);

}

@gridConfig({
	preset: GridPreset.Details
})
export class SOAdjust extends PXView {

	LoadOrders: PXActionState;
	ViewSODocumentToApply: PXActionState;

	@columnConfig({ hideViewLink: true })
	AdjdOrderType: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewSODocumentToApply")
	@columnConfig({
		editorConfig: {
			parameters: (screen: AR302000_SalesOrders) => ({ "SOAdjust.adjdOrderType": screen.SOAdjustments.activeRow.AdjdOrderType.value?.id })
		}
	})
	AdjdOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrder__Status: PXFieldState;
	CuryAdjgAmt: PXFieldState;
	CuryAdjgTransferredToChildrenAmt: PXFieldState;
	CuryAdjgBilledAmt: PXFieldState;
	AdjdOrderDate: PXFieldState;
	SOOrder__DueDate: PXFieldState;
	SOOrder__DiscDate: PXFieldState;
	CuryDocBal: PXFieldState;
	SOOrder__OrderDesc: PXFieldState;
	SOOrder__CuryOrderTotal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SOOrder__CuryID: PXFieldState;

	SOOrder__InvoiceNbr: PXFieldState;
	SOOrder__InvoiceDate: PXFieldState;
}
