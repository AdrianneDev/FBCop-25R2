import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, columnConfig, gridConfig, viewInfo, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.GLAccessBySub", primaryView: "Sub" })
export class GL104030 extends PXScreen {

	@viewInfo({ containerName: "Subaccount" })
	Sub = createSingle(Sub);

	@viewInfo({ containerName: "Restriction Groups" })
	Groups = createCollection(RelationGroup);
}

export class Sub extends PXView {

	SubCD: PXFieldState;
	Description: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Details, allowDelete: false, allowInsert: false, allowUpdate: false, adjustPageSize: true })
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
