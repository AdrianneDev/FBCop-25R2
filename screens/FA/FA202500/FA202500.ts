import { createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, PXFieldOptions } from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.DepreciationMethodMaint", primaryView: "Method", })
export class FA202500 extends PXScreen {

	@viewInfo({ containerName: "Depreciation Method Summary" })
	Method = createSingle(FADepreciationMethod);
}

export class FADepreciationMethod extends PXView {

	MethodCD: PXFieldState;
	DepreciationMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	DBMultiplier: PXFieldState<PXFieldOptions.CommitChanges>;
	SwitchToSL: PXFieldState<PXFieldOptions.CommitChanges>;
	PercentPerYear: PXFieldState;
	Source: PXFieldState<PXFieldOptions.Disabled>;
	AveragingConvention: PXFieldState<PXFieldOptions.CommitChanges>;
	YearlyAccountancy: PXFieldState<PXFieldOptions.CommitChanges>;

}
