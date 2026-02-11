import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	columnConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.CreateECOsProcess", primaryView: "ECRRecords", hideFilesIndicator: true, hideNotesIndicator: true })
export class AM514000 extends PXScreen {
	@viewInfo({ containerName: "Selection" })
	Filter = createSingle(Filter);
	@viewInfo({ containerName: "Documents" })
	ECRRecords = createCollection(ECRRecords);
}

export class Filter extends PXView {
	MergeECRs: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class ECRRecords extends PXView {
	@columnConfig({ allowCheckAll: true }) Selected: PXFieldState;
	ECRID: PXFieldState;
	RevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) BOMID: PXFieldState;
	@columnConfig({ hideViewLink: true }) BOMRevisionID: PXFieldState;
	@columnConfig({ hideViewLink: true }) InventoryID: PXFieldState;
	InventoryItem__Descr: PXFieldState;
	@columnConfig({ hideViewLink: true }) SiteID: PXFieldState;
	Priority: PXFieldState;
	RequestDate: PXFieldState;
	EffectiveDate: PXFieldState;
	@columnConfig({ hideViewLink: true }) Requestor: PXFieldState;
	Descr: PXFieldState;
}
