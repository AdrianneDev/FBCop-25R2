import {
	createCollection, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, columnConfig, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.GLConsolReadMaint", primaryView: "ConsolSetupRecords" })
export class GL509000 extends PXScreen {

	ConsolSetupRecords = createCollection(GLConsolSetup);
}

@gridConfig({ preset: GridPreset.Processing })
export class GLConsolSetup extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BranchID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LedgerId: PXFieldState;

	Description: PXFieldState;
	Url: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SourceLedgerCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SourceBranchCD: PXFieldState;

	LastPostPeriod: PXFieldState;
	LastConsDate: PXFieldState;
}
