import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldOptions,
	gridConfig,
	PXFieldState,
	columnConfig,
	controlConfig,
	GridPreset,
	linkCommand,
	viewInfo,
	IDatetimeEditControlConfig,
	ISelectorControlConfig,
	ApplySuggestionMode,
	PXSelectorMode,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRCaseMaint",
	primaryView: "Case",
	udfTypeField: "CaseClassID",
	showUDFIndicator: true,
	bpEventsIndicator: true,
})
export class CR306000 extends PXScreen {

	@viewInfo({ containerName: "Case Summary" })
	Case = createSingle(CRCaseHeader);

	@viewInfo({ containerName: "Case" })
	CaseCurrent = createSingle(CRCase);

	@viewInfo({ containerName: "Related Cases" })
	CaseRefs = createCollection(CRCaseReference);
}

export class CRCaseHeader extends PXView {
	CaseCD: PXFieldState;
	CaseClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Resolution: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({
		allowEdit: true,
		addCommand: "addNewContact",
		applySuggestionOnBlur: ApplySuggestionMode.ApplyIfSuggestionExists,
		selectorMode: PXSelectorMode.TextModeSearch
	})
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	Subject: PXFieldState<PXFieldOptions.Multiline>;
	@controlConfig<IDatetimeEditControlConfig>({ preserveTimezone: true })
	ReportedOnDateTime: PXFieldState;
	Severity: PXFieldState<PXFieldOptions.CommitChanges>;
	Priority: PXFieldState;
	@controlConfig<IDatetimeEditControlConfig>({ preserveTimezone: true })
	ResolutionDate: PXFieldState;
}

export class CRCase extends PXView {
	Description: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	ManualBillableTimes: PXFieldState<PXFieldOptions.CommitChanges>;
	TimeBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	InitResponse: PXFieldState;
	TimeSpent: PXFieldState;
	OvertimeSpent: PXFieldState;
	TimeResolution: PXFieldState;
	IsActive: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	SolutionActivityNoteID: PXFieldState;
	SolutionProvidedDateTime: PXFieldState;
	LastActivity: PXFieldState<PXFieldOptions.Disabled>;
	ClosureNotes: PXFieldState;
	AssignDate: PXFieldState;
	LastActivityAge: PXFieldState;
	Age: PXFieldState;
	ETA: PXFieldState;
	TimeEstimated: PXFieldState;
	LastModifiedDateTime: PXFieldState;
	SLAETA: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	syncPosition: true,
	adjustPageSize: true
})
export class CRCaseReference extends PXView {
	@linkCommand("CaseRefs_CRCase_ViewDetails")
	ChildCaseCD: PXFieldState<PXFieldOptions.CommitChanges>;
	RelationType: PXFieldState<PXFieldOptions.CommitChanges>;
	CRCaseRelated__Subject: PXFieldState;
	CRCaseRelated__Status: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CRCaseRelated__OwnerID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CRCaseRelated__WorkgroupID: PXFieldState;
}
