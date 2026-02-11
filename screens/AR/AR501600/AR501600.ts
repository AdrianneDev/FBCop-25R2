import { autoinject } from "aurelia-framework";
import {
	columnConfig,
	createCollection,
	graphInfo,
	GridColumnShowHideMode,
	gridConfig,
	GridPagerMode,
	GridPreset,
	linkCommand,
	PXActionState,
	PXFieldState,
	PXScreen,
	PXView,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AR.ARExternalTaxCalc",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
@autoinject
export class AR501600 extends PXScreen {
	Items_refNbr_ViewDetails: PXActionState;

	Items = createCollection(Items);
}

@gridConfig({
	adjustPageSize: true,
	preset: GridPreset.Processing,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	quickFilterFields: ["RefNbr", "CustomerID", "CustomerID_BAccountR_acctName"]
})
export class Items extends PXView {
	@columnConfig({ allowCheckAll: true, allowShowHide: GridColumnShowHideMode.False, allowSort: false})
	Selected: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("Items_refNbr_ViewDetails")
	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CustomerID: PXFieldState;

	CustomerID_BAccountR_acctName: PXFieldState;

	Status: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;
	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DocDesc: PXFieldState;
}
