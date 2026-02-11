import { controlConfig, createSingle, graphInfo, PXFieldOptions, PXFieldState, PXScreen, PXView } from "client-controls";

@graphInfo({graphType: "PX.Objects.PM.ProjectActivities", primaryView: "Filter" })
export class PM301510 extends PXScreen {
    Filter = createSingle(Filter);
}

export class Filter extends PXView {
    ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
}
