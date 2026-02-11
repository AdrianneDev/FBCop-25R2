import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, PXActionState, columnConfig, gridConfig, GridPreset, linkCommand, headerDescription
} from "client-controls";

export class Ledger extends PXView {

	@headerDescription
	LedgerCD: PXFieldState<PXFieldOptions.CommitChanges>;

	@headerDescription
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;

	BalanceType: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	ConsolAllowed: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, allowUpdate: false, allowDelete: false, adjustPageSize: true })
export class OrganizationLedgerLink extends PXView {

	DeleteOrganizationLedgerLink: PXActionState;
	ViewOrganization: PXActionState;

	@linkCommand("ViewOrganization")
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;

	Organization__OrganizationName: PXFieldState;
	Organization__Active: PXFieldState;
	Organization__OrganizationType: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, adjustPageSize: true })
export class Branch extends PXView {

	@columnConfig({ hideViewLink: true })
	BranchCD: PXFieldState;
	AcctName: PXFieldState;
	Active: PXFieldState;
	Organization__OrganizationName: PXFieldState;
}

@graphInfo({ graphType: "PX.Objects.GL.GeneralLedgerMaint", primaryView: "LedgerRecords" })
export class GL201500 extends PXScreen {
	LedgerRecords = createSingle(Ledger);

	OrganizationLedgerLinkWithOrganizationSelect = createCollection(OrganizationLedgerLink);

	BranchesView = createCollection(Branch);
}
