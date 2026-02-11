import { controlConfig, gridConfig, GridPreset, readOnly } from "client-controls";
import {
	PXView,
	PXFieldState, PXFieldOptions, columnConfig} from "client-controls";
import { SummaryFilterView } from "../ar-document/view-models";

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
	allowStoredFilters: true,
})
export class OrdersLine extends PXView {
	@columnConfig({ allowCheckAll: true, allowNull: false, allowUpdate: true, allowFilter: false }) Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	@readOnly @controlConfig({ linkCommand: "viewOrder", displayMode: "id", allowEdit: true }) @columnConfig({ allowFilter: false }) OrderNbr: PXFieldState;

	@readOnly @columnConfig({ hideViewLink: true, allowFilter: false }) CustomerOrderNbr: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) OrderDesc: PXFieldState;
	@readOnly OrderQty: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) OrderType: PXFieldState;
	@readOnly OrderDate: PXFieldState;
	@readOnly ShipDate: PXFieldState;
	@columnConfig({ hideViewLink: true, allowFilter: false }) CuryID: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) CuryOrderTotal_Text: PXFieldState;
	@readOnly CuryPaidAmt: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) CuryPaidAmt_Text: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) CuryUnpaidBalance_Text: PXFieldState;
	@readOnly CuryUnbilledOrderTotal: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) CuryUnbilledOrderTotal_Text: PXFieldState;
	@readOnly UnbilledOrderQty: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) CuryUnbilledBalance_Text: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) CuryOpenOrderTotal_Text: PXFieldState;
	@readOnly OpenOrderQty: PXFieldState;
	@columnConfig({ hideViewLink: true }) @controlConfig({ displayMode: "text", allowEdit: false  }) CustomerID: PXFieldState;
	@readOnly Status: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) Customer__LegalName: PXFieldState;
	@readOnly @columnConfig({ allowFilter: false }) Location__Descr: PXFieldState;

	getClass(filter: SummaryFilterView) {
		return `sp-documents-document no-animation ${filter?.DocumentsSelected.value > 0 && this.CuryID.value.id !== filter?.CuryID.value.id ? "sp-documents-disabled" : ""}`;
	}
}

export class AllOrdersLine extends OrdersLine {
}

export class OpenOrdersLine extends OrdersLine {
}
