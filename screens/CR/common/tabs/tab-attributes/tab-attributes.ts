import {
	PXView,
	PXFieldState,
	createCollection,
	gridConfig,
	viewInfo,
	columnConfig,
	GridPreset,
	GridColumnShowHideMode,
	GridColumnDisplayMode,
	GridFilterBarVisibility,
} from "client-controls";

export abstract class AttributesBase {

	@viewInfo({ containerName: "Attributes" })
	Answers = createCollection(CSAnswers);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	showFilterBar: GridFilterBarVisibility.OnDemand,
})
export class CSAnswers extends PXView {
	@columnConfig({
		width: 300,
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
		allowShowHide: GridColumnShowHideMode.False,
	})
	AttributeID: PXFieldState;

	IsRequired: PXFieldState;

	@columnConfig({ width: 300, allowShowHide: GridColumnShowHideMode.False, fullState: true })
	Value: PXFieldState;
}
