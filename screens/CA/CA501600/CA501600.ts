import { autoinject } from "aurelia-framework";
import {
	createCollection,
	graphInfo,
	PXFieldState,
	PXScreen,
	PXView,
	gridConfig,
	GridPagerMode,
	columnConfig,
	GridColumnShowHideMode,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CA.CAExternalTaxCalc",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
@autoinject
export class CA501600 extends PXScreen {

	Items = createCollection(Items);
}

@gridConfig({
	preset: GridPreset.Processing,
	batchUpdate: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	quickFilterFields: ["AdjRefNbr", "TranDesc"]
})
export class Items extends PXView {
	@columnConfig({ allowCheckAll: true, allowShowHide: GridColumnShowHideMode.False, allowSort: false })
	Selected: PXFieldState;

	AdjTranType: PXFieldState;
	AdjRefNbr: PXFieldState;
	Status: PXFieldState;
	DrCr: PXFieldState;
	TranDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	CuryTranAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	TranDesc: PXFieldState;
}
