import {
	PXScreen,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	linkCommand,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.ForecastSalesInq", primaryView: "ForecastFilter" })
export class AM404200 extends PXScreen {
	ForecastFilter = createSingle(ForecastSalesFilter);
	ForecastFiltersummary = createSingle(ForecastSalesSummary);
	DetailRecs = createCollection(AMForecastSalesDetail);
}

export class ForecastSalesFilter extends PXView {
	ForecastID: PXFieldState<PXFieldOptions.CommitChanges>;
	TimePeriod: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class ForecastSalesSummary extends PXView {
	ForecastedQty: PXFieldState;
	OrderedQty: PXFieldState;
	BaseUOM: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Inquiry,
})
export class AMForecastSalesDetail extends PXView {
	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	AMForecastSalesDetail__AcctCD: PXFieldState;
	AMForecastSalesDetail__AcctName: PXFieldState;
	AMForecastSalesDetail__LineNbr: PXFieldState;
	AMForecastSalesDetail__RequestDate: PXFieldState;
	AMForecastSalesDetail__ShipDate: PXFieldState;
	AMForecastSalesDetail__SchedShipDate: PXFieldState;
	AMForecastSalesDetail__OrderQtyForecastUOM: PXFieldState;
	AMForecastSalesDetail__BlanketOpenQtyForecastUOM: PXFieldState;
}
