import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState,
	PXViewCollection, PXPageLoadBehavior, PXView,
	PXFieldState, gridConfig, disabled, PXFieldOptions, linkCommand, columnConfig, GridPreset, GridFilterBarVisibility
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.SubAccountMaint", primaryView: "SubRecords",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL203000 extends PXScreen {

	SubRecords = createCollection(Sub);
}

@gridConfig({ preset: GridPreset.Primary, quickFilterFields: ["SubCD", "Description"], showFilterBar: GridFilterBarVisibility.OnDemand })
export class Sub extends PXView {

	SubCD: PXFieldState;
	Active: PXFieldState;
	Description: PXFieldState;
	Secured: PXFieldState;
	SubID: PXFieldState;
}
