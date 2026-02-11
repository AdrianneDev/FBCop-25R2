import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, gridConfig, linkCommand, PXFieldState, PXView, PXFieldOptions, GridPreset, columnConfig, headerDescription, GridColumnShowHideMode } from "client-controls";

@graphInfo({graphType: "PX.Objects.CS.CompanyGroupsMaint", primaryView: "BAccount" })
export class CS102500 extends PXScreen {
	ViewCompany: PXActionState;
	AddLedger: PXActionState;
	AddBranch: PXActionState;
	ViewBranch: PXActionState;
	ViewGroup: PXActionState;
	SetAsPrimary: PXActionState;
	Activate: PXActionState;
	Deactivate: PXActionState;
	SetDefaultLocation: PXActionState;
	deleteOrganizationLedgerLink: PXActionState;
	newLocation: PXActionState;
	NewContact: PXActionState;

   	@viewInfo({containerName: "Groups"})
	BAccount = createSingle(BAccount);
   	@viewInfo({containerName: "Groups"})
	OrganizationView = createSingle(Organization);
   	@viewInfo({containerName: "Organizations"})
	Organizations = createCollection(GroupOrganizationLink);
}

export class BAccount extends PXView  {
	@headerDescription AcctCD: PXFieldState;
	@headerDescription AcctName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class Organization extends PXView  {
	BaseCuryID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class GroupOrganizationLink extends PXView  {
	@linkCommand("ViewCompany")
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;
	Organization__OrganizationName: PXFieldState;
	@columnConfig({ hideViewLink: true })
	PrimaryGroup__GroupID: PXFieldState;
	Ledger__LedgerCD: PXFieldState;
}