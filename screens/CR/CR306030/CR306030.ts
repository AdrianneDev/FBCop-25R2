import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	linkCommand,
	GridPreset,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	viewInfo,
	controlConfig,
	headerDescription,
	ISelectorControlConfig,
	IDatetimeEditControlConfig,
	fieldConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.EP.EPEventMaint",
	primaryView: "Events",
	udfTypeField: "Type",
	showUDFIndicator: true,
	disableReminder: true
})
export class CR306030 extends PXScreen {

	@viewInfo({ containerName: "Event Summary" })
	Events = createSingle(CRActivityHeader);

	@viewInfo({ containerName: "Event" })
	CurrentEvent = createSingle(CRActivity);

	@viewInfo({ containerName: "Attendees" })
	Attendees = createCollection(EPAttendee);

	@viewInfo({ containerName: "Reminder" })
	Reminder = createSingle(CRReminder);

	@viewInfo({ containerName: "Time Activity" })
	TimeActivity = createSingle(PMTimeActivity);

	@handleEvent(CustomEventType.RowSelected, { view: "Attendees" })
	onAttendeeSelected(args: RowSelectedHandlerArgs<PXViewCollection<EPAttendee>>) {
		const model = args.viewModel;

		if (model?.SendPersonalInvitation) {
			model.SendPersonalInvitation.enabled = !!args.viewModel.activeRow;
		}
	}
}

export class CRActivityHeader extends PXView {
	NoteID: PXFieldState<PXFieldOptions.Hidden>;
	@headerDescription
	Subject: PXFieldState<PXFieldOptions.Multiline>;
	Location: PXFieldState;
	TimeZone: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	StartDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	EndDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	AllDay: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowAsID: PXFieldState;
	UIStatus: PXFieldState<PXFieldOptions.CommitChanges>;
	Priority: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	IsPrivate: PXFieldState;
	ProvidesCaseSolution: PXFieldState;
}

export class CRActivity extends PXView {
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
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
	CategoryID: PXFieldState;
	Body: PXFieldState;
	PriorityIcon: PXFieldState;
	DayOfWeek: PXFieldState;
	Source: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true
})
export class EPAttendee extends PXView {
	SendPersonalInvitation: PXActionState;
	SendInvitations: PXActionState;

	@linkCommand("Attendees_Contact__contactID_ViewDetails")
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Email: PXFieldState<PXFieldOptions.CommitChanges>;
	Comment: PXFieldState;
	IsOptional: PXFieldState;
	Invitation: PXFieldState;
}

export class CRReminder extends PXView {
	IsReminderOn: PXFieldState<PXFieldOptions.CommitChanges>;
	RemindAt: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class PMTimeActivity extends PXView {
	@fieldConfig({ controlType: "qp-time-span" })
	TimeSpent: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeSpent: PXFieldState<PXFieldOptions.Disabled>;
	@fieldConfig({ controlType: "qp-time-span" })
	TimeBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeBillable: PXFieldState<PXFieldOptions.Disabled>;
}
