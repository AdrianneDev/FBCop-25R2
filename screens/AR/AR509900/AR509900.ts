import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection,
	columnConfig, gridConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AR.ARIntegrityCheck", primaryView: "Filter" })
export class AR509900 extends PXScreen {

	Filter = createSingle(ARIntegrityCheckFilter);
	ARCustomerList = createCollection(Customer);

}

export class ARIntegrityCheckFilter extends PXView {

	FinPeriodID: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDocumentBalances: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcCustomerBalancesReleased: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcCustomerBalancesUnreleased: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Processing })
export class Customer extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	AcctCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerClassID: PXFieldState;
	AcctName: PXFieldState;
}
