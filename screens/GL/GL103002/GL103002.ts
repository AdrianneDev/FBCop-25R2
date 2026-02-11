import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, columnConfig, gridConfig, GridPreset
} from "client-controls";


@graphInfo({ graphType: "PX.Objects.GL.Consolidation.ConsolBranchMaint", primaryView: "BranchRecords" })
export class GL103002 extends PXScreen {

	BranchRecords = createCollection(Branch);
}

@gridConfig({
	preset: GridPreset.Primary
})
export class Branch extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchCD: PXFieldState;

	Organization__OrganizationCD: PXFieldState;
	AcctName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Ledger__LedgerCD: PXFieldState;
}
