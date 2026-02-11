import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	headerDescription,
	viewInfo,
	controlConfig,
	ISelectorControlConfig,
	HeaderDescription,
	IDatetimeEditControlConfig,
	fieldConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.CR.CRTaskMaint",
	primaryView: "Tasks",
	udfTypeField: "Type",
	showUDFIndicator: true,
	disableReminder: true
})
export class CR306020 extends PXScreen {

	@viewInfo({ containerName: "Task Summary" })
	Tasks = createSingle(CRActivityHeader);

	@viewInfo({ containerName: "Task" })
	CurrentTask = createSingle(CRActivity);

	@viewInfo({ containerName: "Related Tasks" })
	ReferencedTasks = createCollection(CRChildActivity);

	@viewInfo({ containerName: "Reminder" })
	Reminder = createSingle(CRReminder);

	@viewInfo({ containerName: "Time Activity" })
	TimeActivity = createSingle(PMTimeActivity);
}

export class CRActivityHeader extends PXView {
	@headerDescription(HeaderDescription.Hide)
	NoteID: PXFieldState<PXFieldOptions.Hidden>;
	@headerDescription(HeaderDescription.Hide)
	Subject: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	@headerDescription(HeaderDescription.Hide)
	Type: PXFieldState<PXFieldOptions.Hidden>;
	UIStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	ExchangeTaskListName: PXFieldState<PXFieldOptions.Disabled>;
	PercentCompletion: PXFieldState<PXFieldOptions.CommitChanges>;
	Priority: PXFieldState;
	IsPrivate: PXFieldState;
	ProvidesCaseSolution: PXFieldState;
	CompletedDate: PXFieldState<PXFieldOptions.Disabled>;
}

export class CRActivity extends PXView {
	RefNoteIDType: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	RefNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	BAccountID: PXFieldState<PXFieldOptions.Disabled>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ContactID: PXFieldState<PXFieldOptions.Disabled>;
	DocumentNoteID: PXFieldState<PXFieldOptions.Disabled>;
	ResponseActivityNoteID: PXFieldState;
	ResponseDueDateTime: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ParentNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	CategoryID: PXFieldState;
	Body: PXFieldState<PXFieldOptions.Hidden>;
	PriorityIcon: PXFieldState;
	Source: PXFieldState;
	CreatedByID: PXFieldState;
	CreatedDateTime: PXFieldState;
	AllDay: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CRChildActivity extends PXView {
	@headerDescription
	Subject: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	UIStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	PercentCompletion: PXFieldState<PXFieldOptions.CommitChanges>;
	Priority: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPrivate: PXFieldState;
	ProvidesCaseSolution: PXFieldState;
	RefNoteIDType: PXFieldState<PXFieldOptions.CommitChanges>;
	RefNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	ParentNoteID: PXFieldState<PXFieldOptions.CommitChanges>;
	CategoryID: PXFieldState;
	CompletedDate: PXFieldState<PXFieldOptions.Disabled>;
	Body: PXFieldState<PXFieldOptions.Hidden>;
}

export class CRReminder extends PXView {
	IsReminderOn: PXFieldState<PXFieldOptions.CommitChanges>;
	ReminderDate: PXFieldState<PXFieldOptions.CommitChanges>;
	ReminderDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	ReminderDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class PMTimeActivity extends PXView {
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({ controlType: "qp-time-span" })
	TimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeSpent: PXFieldState<PXFieldOptions.Disabled>;
	@fieldConfig({ controlType: "qp-time-span" })
	TimeBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeBillable: PXFieldState<PXFieldOptions.Disabled>;
	ServiceID: PXFieldState;
}
