import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.IN.INMovementClassMaint",
	primaryView: "MovementClasses",
})
export class IN208600 extends PXScreen {
	@viewInfo({ containerName: "Movement Class" })
	MovementClasses = createCollection(INMovementClass);
}

@gridConfig({
	preset: GridPreset.Primary,
	initNewRow: true,
})
export class INMovementClass extends PXView {
	MovementClassID: PXFieldState;
	Descr: PXFieldState;
	CountsPerYear: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxTurnoverPct: PXFieldState<PXFieldOptions.CommitChanges>;
}