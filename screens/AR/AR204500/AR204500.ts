import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, TextAlign, GridPreset, GridAutoGrowMode, headerDescription, controlConfig
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AR.ARFinChargesMaint", primaryView: "ARFinChargesList", })
export class AR204500 extends PXScreen {

	ARFinChargesList = createSingle(ARFinCharge);
	PercentList = createCollection(ARFinChargePercent);
}

export class ARFinCharge extends PXView {

	@headerDescription FinChargeID: PXFieldState;
	@headerDescription FinChargeDesc: PXFieldState;
	CalculationMethod: PXFieldState;

	@controlConfig({ allowEdit: true })
	TermsID: PXFieldState;

	BaseCurFlag: PXFieldState;
	FinChargeAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FinChargeSubID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	TaxCategoryID: PXFieldState;

	FeeAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	FeeAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	FeeSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	FeeDesc: PXFieldState;
	MinChargeDocumentAmt: PXFieldState;
	ChargingMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	FixedAmount: PXFieldState;
	LineThreshold: PXFieldState;
	MinFinChargeAmount: PXFieldState;

}

@gridConfig({ preset: GridPreset.ShortList, initNewRow: true, autoGrowInHeight: GridAutoGrowMode.Fill, allowSort: false })
export class ARFinChargePercent extends PXView {

	BeginDate: PXFieldState<PXFieldOptions.CommitChanges>;
	FinChargePercent: PXFieldState;

}
