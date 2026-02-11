import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo,
	PXPageLoadBehavior, PXView, PXFieldState, gridConfig, GridPreset,
	PXFieldOptions, columnConfig, fieldConfig, controlConfig,
} from "client-controls";

@graphInfo({graphType: "PX.Objects.AR.ARAccessDetail", primaryView: "Customer", pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord })
export class AR102010 extends PXScreen {


	@viewInfo({containerName: "Customer"})
	Customer = createSingle(Customer);
	@viewInfo({containerName: "Restriction Groups"})
	Groups = createCollection(RelationGroup);

}

export class Customer extends PXView {

	@controlConfig({ allowEdit: true })
	AcctCD: PXFieldState;

	Status: PXFieldState<PXFieldOptions.Disabled>;
	AcctName: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class RelationGroup extends PXView {

	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ hideViewLink: true })
	GroupName: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState;
	GroupType: PXFieldState;
}
