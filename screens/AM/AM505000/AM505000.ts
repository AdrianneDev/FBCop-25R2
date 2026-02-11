import {
	PXScreen,
	viewInfo,
	createCollection,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	columnConfig,
	controlConfig,
	gridConfig,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.Fullregen", primaryView: "MrpProcessing" })
export class AM505000 extends PXScreen {
	MrpProcessing = createSingle(MrpProcessingSetup);
	AuditDetailRecs = createCollection(AMRPAuditTable);
}

export class MrpProcessingSetup extends PXView {
	LastMrpRegenCompletedDateTime: PXFieldState;
	@controlConfig({ displayMode: "id" }) LastMrpRegenCompletedByID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class AMRPAuditTable extends PXView {
	Recno: PXFieldState;
	@columnConfig({ format: "g" }) CreatedDateTime: PXFieldState;
	@columnConfig({ width: 1000 }) MsgText: PXFieldState;
	CreatedByScreenID: PXFieldState;
	CreatedByID: PXFieldState;
	ProcessID: PXFieldState;
	MsgType: PXFieldState;
}
