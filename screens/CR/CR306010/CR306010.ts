import {
	createSingle,
	PXScreen,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	viewInfo,
	controlConfig,
	ISelectorControlConfig,
	headerDescription,
	HeaderDescription,
	IDatetimeEditControlConfig,
	fieldConfig,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.EP.CRActivityMaint",
	primaryView: "Activities",
	udfTypeField: "Type",
	showUDFIndicator: true,
})
export class CR306010 extends PXScreen {

	@viewInfo({ containerName: "Activity Summary" })
	Activities = createSingle(CRActivityHeader);

	@viewInfo({ containerName: "Activity" })
	CurrentActivity = createSingle(CRActivity);

	@viewInfo({ containerName: "Time Activity", syncAlways: true })
	TimeActivity = createSingle(PMTimeActivity);
}

export class CRActivityHeader extends PXView  {
	@headerDescription(HeaderDescription.Hide)
	NoteID: PXFieldState<PXFieldOptions.Hidden>;
	Subject: PXFieldState<PXFieldOptions.Multiline>;
	@headerDescription
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	StartDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	CompletedDate_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<IDatetimeEditControlConfig>({ timeMode: true })
	CompletedDate_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	UIStatus: PXFieldState;
	IsPrivate: PXFieldState;
	ProvidesCaseSolution: PXFieldState;
}

export class CRActivity extends PXView  {
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	WorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
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
	Body: PXFieldState;
}

export class PMTimeActivity extends PXView {
	TrackTime: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	CertifiedJob: PXFieldState;
	ProjectTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	CostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	LabourItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnionID: PXFieldState;
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
	OvertimeBillable: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	ARRefNbr: PXFieldState<PXFieldOptions.Disabled>;
}
