import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridPreset, controlConfig, ISelectorControlConfig, GridPagerMode } from "client-controls";
import { NullTextValues } from "src/screens/common/messages";


// Views

export class AUTemplate extends PXView  {
	@controlConfig<ISelectorControlConfig>({ nullText: NullTextValues.New, displayMode: "text" })
	TemplateID: PXFieldState;
	ScreenID: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState;
	Graph: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.Details,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class AUTemplateData extends PXView  {
	Active: PXFieldState;

	Line: PXFieldState;

	Container: PXFieldState<PXFieldOptions.CommitChanges>;

	View: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.CommitChanges>;

	RowType: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.CommitChanges>;

	Field: PXFieldState<PXFieldOptions.CommitChanges>;

	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}
