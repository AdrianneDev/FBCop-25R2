import {
	columnConfig,
	controlConfig,
	gridConfig,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridColumnType,
	GridPreset,
	PXFieldOptions,
	PXFieldState,
	PXView,
} from "client-controls";

export class Photos extends PXView {
	PhotoLogId: PXFieldState<PXFieldOptions.CommitChanges>;
	PhotoCd: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ type: GridColumnType.Icon })
	ImageUrl: PXFieldState;
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	@controlConfig({
		multiSelect: true,
		valueSeparator: ";"
	})
	Tags: PXFieldState<PXFieldOptions.CommitChanges>;
	UploadedDate: PXFieldState;
	UploadedById: PXFieldState;
	IsMainPhoto: PXFieldState<PXFieldOptions.CommitChanges>;
	FileId: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Attributes })
export class Attributes extends PXView {
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		displayMode: GridColumnDisplayMode.Text,
		hideViewLink: true,
	})
	AttributeID: PXFieldState;
	isRequired: PXFieldState;
	@columnConfig({
		allowShowHide: GridColumnShowHideMode.False,
		allowSort: false
	})
	Value: PXFieldState;
}
