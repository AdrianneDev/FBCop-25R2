import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, PXFieldOptions, createCollection, columnConfig, gridConfig, GridPreset,
} from "client-controls";


@graphInfo({
	graphType: "PX.Objects.GL.Consolidation.ConsolOrganizationMaint", primaryView: "OrganizationRecords",
	hideFilesIndicator: true, hideNotesIndicator: true,
})
export class GL103004 extends PXScreen {

	OrganizationRecords = createCollection(Organization);
}

@gridConfig({ preset: GridPreset.Primary })
export class Organization extends PXView {

	@columnConfig({ hideViewLink: true })
	OrganizationCD: PXFieldState;
	OrganizationName: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Ledger__LedgerCD: PXFieldState;
}
