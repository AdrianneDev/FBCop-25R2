import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createSingle,
	PXFieldOptions,
	viewInfo,
	linkCommand,
	PXActionState,
	controlConfig,
	IDatetimeEditControlConfig,
	ISelectorControlConfig,
	fieldConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRTeamsActivityMaint",
	primaryView: "Message",
})
export class CR306040 extends PXScreen {
	Message$Select_RefNote: PXActionState;
	Message$Navigate_ByRefNote: PXActionState;
	Message$Attach_RefNote: PXActionState;

	Message = createSingle(CRSMTeamsActivityHeader);
	CurrentMessage = createSingle(CRSMTeamsActivity);

	@viewInfo({ containerName: "Time Activity" })
	TimeActivity = createSingle(PMTimeActivity);
}

export class CRSMTeamsActivityHeader extends PXView {
	ChannelID: PXFieldState<PXFieldOptions.CommitChanges>;
	MemberID: PXFieldState<PXFieldOptions.CommitChanges>;
	Subject: PXFieldState;
	StartDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	StartDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	IsIncome: PXFieldState<PXFieldOptions.Disabled>;
	IsPrivate: PXFieldState;
}

export class CRSMTeamsActivity extends PXView {
	Body: PXFieldState;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	BAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ParentNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNoteIDType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	RefNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	DocumentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	MPStatus: PXFieldState<PXFieldOptions.CommitChanges>;
}
export class PMTimeActivity extends PXView {

	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CertifiedJob: PXFieldState;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState;
	LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnionID: PXFieldState;
	TrackTime: PXFieldState<PXFieldOptions.CommitChanges>;
	ApprovalStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	ApproverID: PXFieldState<PXFieldOptions.Disabled>;
	EarningTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkCodeID: PXFieldState;
	ShiftID: PXFieldState;
	@fieldConfig({ controlType: "qp-time-span" })
	TimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeSpent: PXFieldState<PXFieldOptions.Disabled>;
	IsBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	Released: PXFieldState;
	@fieldConfig({ controlType: "qp-time-span" })
	TimeBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeBillable: PXFieldState<PXFieldOptions.Disabled>;
	NoteID: PXFieldState<PXFieldOptions.Hidden>;
}

