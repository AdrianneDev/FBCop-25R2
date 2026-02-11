import {
	PXView,
	PXFieldState,
	gridConfig,
	PXFieldOptions,
	columnConfig,
	PXActionState,
	GridColumnGeneration,
	GridPreset
} from "client-controls";

// Views

export class SYImportOperation extends PXView {
	Operation: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipHeaders: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class SYMapping extends PXView {
	viewHistory: PXActionState;
	viewPreparedData: PXActionState;

	@columnConfig({ allowCheckAll: true, width: 20 }) Selected: PXFieldState;
	Name: PXFieldState;
	ScreenDescription: PXFieldState;
	@columnConfig({ hideViewLink: true }) ProviderID: PXFieldState;
	SyncType: PXFieldState;
	Status: PXFieldState;
	NbrRecords: PXFieldState;
	PreparedOn: PXFieldState;
	CompletedOn: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
	allowUpdate: false,
})
export class SYHistory extends PXView {
	@columnConfig({width: 200, format: "g"})
	StatusDateToDisplay: PXFieldState;
	@columnConfig({width: 200})
	StatusDate: PXFieldState;
	Status: PXFieldState;
	NbrRecords: PXFieldState;
	@columnConfig({width: 200}) ExportTimeStamp: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	generateColumns: GridColumnGeneration.AppendDynamic,
})
export class SYData extends PXView {
	LineNbr: PXFieldState;
	IsActive: PXFieldState;
	ErrorMessage: PXFieldState;
	IsProcessed: PXFieldState;
}