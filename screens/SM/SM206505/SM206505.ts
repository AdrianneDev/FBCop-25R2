import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	GridAutoGrowMode,
	columnConfig
} from "client-controls";

@graphInfo({graphType: "PX.SM.SMScanJobMaint", primaryView: "ScanJob"})
export class SM206505 extends PXScreen {

	@viewInfo({containerName: "Scan Jobs"})
	ScanJob = createCollection(SMScanJob);
	@viewInfo({containerName: "Document Parameters"})
	Parameters = createCollection(SMScanJobParameter);
	Filter = createSingle(SMScanJobFilter);
}

export class SMScanJobFilter extends PXView  {
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	HideProcessed: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	autoRepaint: ["Parameters"]
})
export class SMScanJob extends PXView  {
	ScanJobID: PXFieldState;
	DeviceHubID: PXFieldState;
	ScannerName: PXFieldState;
	ScannerName_SMScanner_description: PXFieldState;
	Status: PXFieldState;
	EntityScreenID: PXFieldState;
	PaperSource: PXFieldState;
	PixelType: PXFieldState;
	Resolution: PXFieldState;
	FileType: PXFieldState;
	FileName: PXFieldState;
	Error: PXFieldState;
	CreatedByID: PXFieldState;

	@columnConfig({ format: "g" })
	CreatedDateTime: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	autoGrowInHeight: GridAutoGrowMode.Fill
})
export class SMScanJobParameter extends PXView  {
	LineNbr: PXFieldState;
	ParameterName: PXFieldState;
	ParameterValue: PXFieldState;
}
