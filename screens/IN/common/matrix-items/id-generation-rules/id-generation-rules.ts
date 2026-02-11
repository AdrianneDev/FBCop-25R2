import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	columnConfig,
	GridPreset,
	GridColumnShowHideMode,
	PXActionState,
	viewInfo,
	createCollection,
	GridAutoGrowMode,
} from "client-controls";

export abstract class PanelMatrixIdGenerationRulesBase {
	@viewInfo({ containerName: "Item Generation Rules" })
	IdGenerationRules = createCollection(INMatrixGenerationRule);
}

@gridConfig({
	preset: GridPreset.Details,
	statusField: "Sample",
	autoGrowInHeight: GridAutoGrowMode.Fit,
	adjustPageSize: true,
	pageSize: 10
})
export class INMatrixGenerationRule extends PXView  {
	IdRowUp: PXActionState;
	IdRowDown: PXActionState;

	SegmentType: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;

	Constant: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberingID: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberOfCharacters: PXFieldState<PXFieldOptions.CommitChanges>;
	UseSpaceAsSeparator: PXFieldState<PXFieldOptions.CommitChanges>;
	Separator: PXFieldState<PXFieldOptions.CommitChanges>;
	AddSpaces: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		visible: false,
		allowShowHide: GridColumnShowHideMode.False,
	})
	Sample: PXFieldState;
}
