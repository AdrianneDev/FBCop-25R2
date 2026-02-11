import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	headerDescription,
	columnConfig,
	GridColumnShowHideMode,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.TX.TaxCategoryMaint", primaryView: "TxCategory", showUDFIndicator: true })
export class TX205500 extends PXScreen {

	TxCategory = createSingle(TaxCategory);
	Details = createCollection(TaxCategoryDet);

}

export class TaxCategory extends PXView {

	TaxCategoryID: PXFieldState;

	@headerDescription
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;

	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxCatFlag: PXFieldState<PXFieldOptions.CommitChanges>;
	Exempt: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class TaxCategoryDet extends PXView {

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	Tax__Descr: PXFieldState;
	Tax__TaxType: PXFieldState;
	Tax__TaxCalcRule: PXFieldState;
	Tax__TaxApplyTermsDisc: PXFieldState;
	Tax__DirectTax: PXFieldState;

}
