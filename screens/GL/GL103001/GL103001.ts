import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, columnConfig, gridConfig, GridPreset, GridFilterBarVisibility
} from "client-controls";


@graphInfo({ graphType: "PX.Objects.GL.Consolidation.ConsolAccountMaint", primaryView: "AccountRecords" })
export class GL103001 extends PXScreen {

	AccountRecords = createCollection(GLConsolAccount);
}

@gridConfig({
	preset: GridPreset.Primary,
	showFilterBar: GridFilterBarVisibility.OnDemand
})
export class GLConsolAccount extends PXView {

	AccountCD: PXFieldState;
	Description: PXFieldState;
}
