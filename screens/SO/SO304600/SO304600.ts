import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	viewInfo,
	graphInfo,
	gridConfig,
	controlConfig,
	createSingle,
	createCollection,
	GridPreset,
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.SO.SOOrchestrationPlanMaint", primaryView: "OrchestrationPlan" })
export class SO304600 extends PXScreen {
	@viewInfo({ containerName: "Orchestration Plan" })
	OrchestrationPlan = createSingle(SOOrchestrationPlan);

	@viewInfo({ containerName: "Orchestration Plan Lines" })
	OrchestrationPlanLines = createCollection(SOOrchestrationPlanLine);
}

export class SOOrchestrationPlan extends PXView {
	PlanID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	Strategy: PXFieldState<PXFieldOptions.CommitChanges>;
	ShippingZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	IncludeSourceWarehouse: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ rows: 2 })
	PlanDescription: PXFieldState<PXFieldOptions.Multiline>;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
})
export class SOOrchestrationPlanLine extends PXView {
	TargetSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	TargetSiteID_description: PXFieldState;
	Priority: PXFieldState<PXFieldOptions.CommitChanges>;
	MaintainSaftyStock: PXFieldState<PXFieldOptions.CommitChanges>;
}
