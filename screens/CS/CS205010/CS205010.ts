import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, PXFieldOptions, gridConfig, GridPreset, columnConfig } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CS.BuildingMaint", primaryView: "filter" })
export class CS205010 extends PXScreen {
	@viewInfo({ containerName: "Branch" })
	filter = createSingle(BuildingFilter);
   	@viewInfo({ containerName: "Buildings" })
	building = createCollection(Building);
}

export class BuildingFilter extends PXView {
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class Building extends PXView {
	BuildingCD: PXFieldState;
	Description: PXFieldState;
}