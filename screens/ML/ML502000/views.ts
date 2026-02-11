import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	PXActionState,
	GridPreset,
	GridFastFilterVisibility,
	GridFilterBarVisibility,
	GridNoteFilesShowMode,
	localizable,
} from "client-controls";

@localizable
export class ML502000Texts {
	static PerformTaskNextStep = "Execute Next Step";
}

export class GIDesignType {
	MLStatus: PXFieldState;
	MLLastProcessRun: PXFieldState;
	UploadDate: PXFieldState;
	ImportDate: PXFieldState;
	NextRun: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
	autoRepaint: ["CalculationTasks", "ScreenToolbar"],
	showFilterBar: GridFilterBarVisibility.False,
	showFastFilter: GridFastFilterVisibility.False,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class GIDesign extends PXView {
	@columnConfig({ allowCheckAll: true, width: 60 })
	Selected: PXFieldState;
	Name: PXFieldState;
	MLTargetColumn: PXFieldState;
	MLTimeAxis: PXFieldState;
	GroupFields: PXFieldState;
	GIMLProcessing: GIDesignType;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False,
	topBarItems: {
		PerformTaskNextStep: { index: 0, config: { commandName: "PerformTaskNextStep", text: ML502000Texts.PerformTaskNextStep } },
	},
})
export class GIMLAnomalyCalculationTask extends PXView {
	PerformTaskNextStep: PXActionState;
	DataSetId: PXFieldState<PXFieldOptions.Hidden>;
	Status: PXFieldState;
	ModelErrorCode: PXFieldState;
	UploadDate: PXFieldState;
	RowsUploaded: PXFieldState;
	RowsSkipped: PXFieldState;
	GroupsUploaded: PXFieldState;
	GroupsSkipped: PXFieldState;
	ImportDate: PXFieldState;
	RowsImported: PXFieldState;
}
