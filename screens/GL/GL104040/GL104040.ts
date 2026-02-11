import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, columnConfig,
	gridConfig, PXPageLoadBehavior, GridPreset, controlConfig
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.GLAccessDetail", primaryView: "Segment",
	pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord, hideFilesIndicator: true, hideNotesIndicator: true
})
export class GL104040 extends PXScreen {

	Segment = createSingle(SegmentValue);
	Groups = createCollection(RelationGroup);
}

export class SegmentValue extends PXView {
	SegmentID: PXFieldState;

	@controlConfig({ displayMode: "both" })
	Value: PXFieldState;

	Descr: PXFieldState<PXFieldOptions.Disabled>;
	Active: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	allowUpdate: false,
})
export class RelationGroup extends PXView {
	@columnConfig({ allowUpdate: false, allowCheckAll: true })
	Included: PXFieldState;
	@columnConfig({ allowUpdate: false, hideViewLink: true })
	GroupName: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Description: PXFieldState;
	@columnConfig({ allowUpdate: false })
	Active: PXFieldState;
	@columnConfig({ allowUpdate: false })
	GroupType: PXFieldState;
}
