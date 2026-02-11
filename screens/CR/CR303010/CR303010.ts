import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createSingle,
	createCollection,
	PXFieldOptions,
	viewInfo,
	gridConfig,
	GridPreset,
	linkCommand,
	controlConfig,
	ISelectorControlConfig,
	PXActionState,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.AccountLocationMaint",
	primaryView: "Location",
	bpEventsIndicator: true,
	udfTypeField: "ClassID",
})
export class CR303010 extends PXScreen {
	ViewOnMap: PXActionState;

	@viewInfo({ containerName: "Location Summary" })
	Location = createSingle(LocationHeader);

	@viewInfo({ containerName: "Opportunities" })
	Opportunities = createCollection(CROpportunity);

	@viewInfo({ containerName: "Cases" })
	Cases = createCollection(CRCase);
}

export class LocationHeader extends PXView {
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ displayMode: "id" })
	LocationCD: PXFieldState;
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	IsDefault: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	adjustPageSize: true,
})
export class CROpportunity extends PXView {
	@linkCommand("Opportunities_ViewDetails")
	OpportunityID: PXFieldState;
	Subject: PXFieldState;
	StageID: PXFieldState;
	CROpportunityProbability__Probability: PXFieldState<PXFieldOptions.Hidden>;
	Status: PXFieldState;
	CuryProductsAmount: PXFieldState;
	CuryID: PXFieldState;
	CloseDate: PXFieldState;
	@linkCommand("Opportunities_Contact_ViewDetails")
	Contact__DisplayName: PXFieldState<PXFieldOptions.Hidden>;
	WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	OwnerID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	allowUpdate: false,
	adjustPageSize: true,
})
export class CRCase extends PXView {
	@linkCommand("Cases_ViewDetails")
	CaseCD: PXFieldState;
	Subject: PXFieldState;
	CaseClassID: PXFieldState;
	Severity: PXFieldState;
	Status: PXFieldState;
	Resolution: PXFieldState;
	ReportedOnDateTime: PXFieldState;
	TimeEstimated: PXFieldState<PXFieldOptions.Hidden>;
	ResolutionDate: PXFieldState;
	WorkgroupID: PXFieldState;
	OwnerID: PXFieldState;
}
