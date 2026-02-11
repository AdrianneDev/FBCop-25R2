import {
	createCollection,
	PXScreen,
	PXView,
	graphInfo,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	columnConfig,
	GridColumnShowHideMode,
	linkCommand,
	GridPreset,
	GridFilterBarVisibility,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.SM.EmailEnq",
	primaryView: "Emails",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class CO409070 extends PXScreen {
	Emails = createCollection(SMEmail);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["Subject", "MailFrom", "EMailAccount__Description"],
	allowUpdate: false,
})
export class SMEmail extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	@columnConfig({ width: 50 })
	CRActivity__ClassIcon: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.True })
	IsIncome: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("ViewEMail")
	Subject: PXFieldState;
	MailFrom: PXFieldState;
	MailTo: PXFieldState;
	MPStatus: PXFieldState;
	@columnConfig({ format: "g" })
	CreatedDateTime: PXFieldState;
	CreatedByID_Creator_Username: PXFieldState;
	MailCc: PXFieldState<PXFieldOptions.Hidden>;
	MailBcc: PXFieldState<PXFieldOptions.Hidden>;
	@linkCommand("ViewEntity")
	CRActivity__Source: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CRActivity__OwnerID: PXFieldState;
	@columnConfig({ hideViewLink: true, visible: false })
	CRActivity__WorkgroupID: PXFieldState<PXFieldOptions.Hidden>;
	MessageID: PXFieldState<PXFieldOptions.Hidden>;
	IsArchived: PXFieldState<PXFieldOptions.Hidden>;;
	EMailAccount__Description: PXFieldState<PXFieldOptions.Hidden>;

	CRActivity__IsPrivate: PXFieldState<PXFieldOptions.Hidden>;
	CRActivity__BAccountID: PXFieldState<PXFieldOptions.Hidden>;
	CRActivity__ContactID: PXFieldState<PXFieldOptions.Hidden>;
	ResponseToNoteID: PXFieldState<PXFieldOptions.Hidden>;
}
