import {
	PXScreen,
	viewInfo,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AM.ToolMaint", primaryView: "Tools", showUDFIndicator: true })
export class AM205500 extends PXScreen {
	@viewInfo({ containerName: "Tools" })
	Tools = createSingle(Tools);
	CurySettings_AMToolMst = createSingle(CurySettings_AMToolMst);
}

export class Tools extends PXView {
	ToolID: PXFieldState;
	Descr: PXFieldState;
	Active: PXFieldState;
	ActualUses: PXFieldState;
	AcctID: PXFieldState;
	SubID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduleEnabled: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduleQty: PXFieldState;
}

export class CurySettings_AMToolMst extends PXView {
	UnitCost: PXFieldState;
	TotalCost: PXFieldState;
	ActualCost: PXFieldState;
}
