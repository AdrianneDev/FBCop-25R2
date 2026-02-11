import {
	PXScreen,
	PXView,
	PXFieldState,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INAccessDetailByClass",
	primaryView: "Class",
})
export class IN103010 extends PXScreen {
	@viewInfo({ containerName: "Item Class" })
	Class = createSingle(INItemClass);

	@viewInfo({ containerName: "Restriction Groups" })
	Groups = createCollection(RelationGroup);
}

export class INItemClass extends PXView {
	ItemClassCD: PXFieldState;
	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	adjustPageSize: true,
})
export class RelationGroup extends PXView {
	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ hideViewLink: true })
	GroupName: PXFieldState;

	Description: PXFieldState;
	Active: PXFieldState;
	GroupType: PXFieldState;
}
