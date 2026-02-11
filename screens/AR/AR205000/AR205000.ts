import {
	PXScreen, PXView, PXFieldState, PXActionState,
	createCollection, createSingle,
	controlConfig, PXFieldOptions,
	graphInfo, viewInfo, gridConfig, columnConfig, GridPreset,

} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AR.SalesPersonMaint", primaryView: "Salesperson", showActivitiesIndicator: true })
export class AR205000 extends PXScreen {

	@viewInfo({ containerName: "Salesperson Info" })
	Salesperson = createSingle(SalesPerson);

	@viewInfo({ containerName: "Customers" })
	SPCustomers = createCollection(CustSalesPeople);

	@viewInfo({ containerName: " Commission History" })
	CommissionsHistory = createCollection(ARSPCommnHistory);

}

export class SalesPerson extends PXView {

	@controlConfig({displayMode: "id"})
	SalesPersonCD: PXFieldState;

	IsActive: PXFieldState;
	Descr: PXFieldState;
	CommnPct: PXFieldState;
	SalesSubID: PXFieldState;

}

@gridConfig({
	preset: GridPreset.Details,
})
export class CustSalesPeople extends PXView {

	@columnConfig({ hideViewLink: true })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;

	BAccountID_Customer_acctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState;

	LocationID_Location_descr: PXFieldState;

	CommisionPct: PXFieldState;
	IsDefault: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class ARSPCommnHistory extends PXView {

	ViewDetails: PXActionState;
	CommnPeriod: PXFieldState;
	CommnblAmt: PXFieldState;
	CommnAmt: PXFieldState;
	BaseCuryID: PXFieldState;
	PRProcessedDate: PXFieldState;

}
