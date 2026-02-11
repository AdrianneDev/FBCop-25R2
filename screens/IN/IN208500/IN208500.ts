import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INABCCodeMaint",
	primaryView: "ABCCodes",
})
export class IN208500 extends PXScreen {
	@viewInfo({containerName: "ABC Code Summary"})
	ABCTotals = createSingle(INABCTotal);

	@viewInfo({containerName: "ABC Code"})
	ABCCodes = createCollection(INABCCode);
}

export class INABCTotal extends PXView {
	TotalABCPct: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	mergeToolbarWith: "ScreenToolbar",
	autoAdjustColumns: true
})
export class INABCCode extends PXView {
	@columnConfig({ format: "A" })
	ABCCodeID: PXFieldState;

	Descr: PXFieldState;
	CountsPerYear: PXFieldState<PXFieldOptions.CommitChanges>;
	ABCPct: PXFieldState<PXFieldOptions.CommitChanges>;
}
