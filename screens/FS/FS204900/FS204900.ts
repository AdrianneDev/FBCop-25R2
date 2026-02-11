import {
	graphInfo,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	viewInfo,
	columnConfig
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.ServiceTemplateMaint", primaryView: "ServiceTemplateRecords" })
export class FS204900 extends PXScreen {
	ServiceTemplateRecords = createSingle(FSServiceTemplate);

	@viewInfo({ containerName: "Details"})
	ServiceTemplateDetails = createCollection(FSServiceTemplateDet);
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true
})
export class FSServiceTemplateDet extends PXView {
	LineType: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;

	TranDesc: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSServiceTemplate extends PXView {
	ServiceTemplateCD: PXFieldState;
	Descr: PXFieldState;
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;
}
