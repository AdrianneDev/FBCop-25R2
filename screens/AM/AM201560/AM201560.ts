import {
	graphInfo,
	gridConfig,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	GridPreset,
	GridFastFilterVisibility,
	createSingle,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.ProdOrderDatesProcess", primaryView: "DatesFilter" })
export class AM201560 extends PXScreen {
	ProdOrders = createCollection(ProdOrder);
	Operations = createCollection(Operation);
	DatesFilter = createSingle(DatesFilter);
}

@gridConfig({
	preset: GridPreset.Primary,
	autoRepaint: ["Operations"],
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
})
export class ProdOrder extends PXView {
	OrderType: PXFieldState;
	ProdOrdID: PXFieldState;
	SchedulingMethod: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	actionsConfig: {
		exportToExcel: { hidden: true },
	},
	showFastFilter: GridFastFilterVisibility.False,
})
export class Operation extends PXView {
	OperationCD: PXFieldState;
	WcID: PXFieldState;
	StartDate: PXFieldState;
	EndDate: PXFieldState;
}

export class DatesFilter extends PXView {
}
