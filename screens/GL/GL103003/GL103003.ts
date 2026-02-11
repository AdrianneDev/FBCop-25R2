import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, columnConfig, gridConfig, GridPreset,
} from "client-controls";


@graphInfo({
	graphType: "PX.Objects.GL.Consolidation.ConsolLedgerMaint", primaryView: "LedgerRecords",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL103003 extends PXScreen {

	LedgerRecords = createCollection(Ledger);
}

@gridConfig({ preset: GridPreset.Primary })
export class Ledger extends PXView {

	@columnConfig({ hideViewLink: true })
	LedgerCD: PXFieldState;
	Descr: PXFieldState;
	BalanceType: PXFieldState;
}
