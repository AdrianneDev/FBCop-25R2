import { autoinject } from "aurelia-framework";
import {
	createCollection, graphInfo, PXFieldState, PXScreen, PXView, gridConfig, GridPagerMode, columnConfig,
	GridColumnShowHideMode, GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AP.APExternalTaxCalc",
	primaryView: "Items",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
@autoinject
export class AP501600 extends PXScreen {
	Items = createCollection(APInvoice);
}

@gridConfig({
	preset: GridPreset.Processing,
	batchUpdate: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	quickFilterFields: ["RefNbr", "VendorID", "VendorID_BAccountR_acctName", "DocDesc"]
})
export class APInvoice extends PXView {

	@columnConfig({ allowCheckAll: true, allowShowHide: GridColumnShowHideMode.False, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	DocType: PXFieldState;

	RefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	VendorID_BAccountR_acctName: PXFieldState;

	Status: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	CuryOrigDocAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	DocDesc: PXFieldState;
}

