import {
	PXScreen, createSingle, graphInfo, PXPageLoadBehavior, PXView, PXFieldState, PXFieldOptions, createCollection,
	columnConfig, controlConfig, gridConfig, GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APAccessDetail", primaryView: "Vendor", pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord })
export class AP102010 extends PXScreen {

	Vendor = createSingle(Vendor);
	Groups = createCollection(RelationGroup);

}

export class Vendor extends PXView {

	@controlConfig({ allowEdit: true })
	AcctCD: PXFieldState;

	@columnConfig({ allowNull: false })
	VStatus: PXFieldState;

	AcctName: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly })
export class RelationGroup extends PXView {

	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true })
	GroupName: PXFieldState;

	Description: PXFieldState;
	Active: PXFieldState;
	GroupType: PXFieldState;

}
