import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRSetupMaint",
	primaryView: "CRSetupRecord",
	keepControlFocus: true,
})
export class CR101000 extends PXScreen {
	CRSetupRecord = createSingle(CRSetupRecord);
}

export class CRSetupRecord extends PXView {
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	OpportunityNumberingID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CaseNumberingID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	MassMailNumberingID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CampaignNumberingID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	QuoteNumberingID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultLeadClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultContactClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultCustomerClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultOpportunityClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultCaseClassID: PXFieldState;
	AMEstimateEntry: PXFieldState;
	AMConfigurationEntry: PXFieldState;
	CopyNotes: PXFieldState;
	CopyFiles: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultRateTypeID: PXFieldState;
	AllowOverrideRate: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	LeadDefaultAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ContactDefaultAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultBAccountAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultOpportunityAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	DefaultCaseAssignmentMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	QuoteApprovalMapID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	QuoteApprovalNotificationID: PXFieldState;
}
