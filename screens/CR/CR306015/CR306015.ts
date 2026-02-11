import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createSingle,
	PXFieldOptions,
	viewInfo,
	gridConfig,
	commitChanges,
	controlConfig,
	ISelectorControlConfig,
	IDatetimeEditControlConfig,
	QuerySaveNeededEvent,
	fieldConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CREmailActivityMaint",
	primaryView: "Message",
})
export class CR306015 extends PXScreen {

	@viewInfo({ containerName: "Email Summary" })
	Message = createSingle(CRSMEmailHeader);

	@viewInfo({ containerName: "Email" })
	CurrentMessage = createSingle(CRSMEmail);

	@viewInfo({ containerName: "Time Activity" })
	TimeActivity = createSingle(PMTimeActivity);

	afterConstructor() {
		super.afterConstructor();
		this.screenEventManager.subscribe(QuerySaveNeededEvent, (event: QuerySaveNeededEvent) => {
			event.needed = false;
			event.stop();
		});
	}
}

export class CRSMEmailHeader extends PXView {
	NoteID: PXFieldState<PXFieldOptions.Hidden>;
	@controlConfig<ISelectorControlConfig>({ displayMode: "text" })
	MailAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	MailFrom: PXFieldState;

	// TODO: probably we have to send valueTemplate with fieldState
	@controlConfig<ISelectorControlConfig>({
		multiSelect: true,
		valueTemplate: "{1} <{0}>",
		displayMode: "text",
		textField: "SearchSuggestion",
		allowCustomItems: true,
		allowEdit: false })
	MailTo: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig<ISelectorControlConfig>({
		multiSelect: true,
		valueTemplate: "{1} <{0}>",
		displayMode: "text",
		textField: "SearchSuggestion",
		allowCustomItems: true,
		allowEdit: false })
	MailCc: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig<ISelectorControlConfig>({
		multiSelect: true,
		valueTemplate: "{1} <{0}>",
		displayMode: "text",
		textField: "SearchSuggestion",
		allowCustomItems: true,
		allowEdit: false })
	MailBcc: PXFieldState<PXFieldOptions.CommitChanges>;

	Subject: PXFieldState;
	RecipientNotes: PXFieldState<PXFieldOptions.CommitChanges>;
	IsIncome: PXFieldState<PXFieldOptions.Disabled>;
	IsPrivate: PXFieldState;
	RefNoteIDType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	RefNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	MPStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ preserveTimezone: true })
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ProvidesCaseSolution: PXFieldState;
	EntityDescription: PXFieldState;
}

export class CRSMEmail extends PXView {
	Body: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	BAccountID: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ContactID: PXFieldState<PXFieldOptions.Disabled>;
	DocumentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	ResponseActivityNoteID: PXFieldState;
	ResponseDueDateTime: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ResponseToNoteID: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ParentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	SendAt: PXFieldState;
	Categories: PXFieldState;
	BypassSuppressionChecks: PXFieldState;
	TrackEmailOpens: PXFieldState;
	TrackClicksInEmail: PXFieldState;
	ClassIcon: PXFieldState;
	Type: PXFieldState;
	CreatedDateTime: PXFieldState;
	Source: PXFieldState;
	NoteID: PXFieldState;
	MessageId: PXFieldState;
	CreatedByID: PXFieldState;
	IsArchived: PXFieldState;
	ClearedBody: PXFieldState;
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
	TimeBillable: PXFieldState;
	OvertimeBillable: PXFieldState<PXFieldOptions.Disabled>;
	NoteID: PXFieldState<PXFieldOptions.Hidden>;
}
