import {
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	graphInfo,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	headerDescription,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.SM.EMailAccountMaint",
	primaryView: "EMailAccounts",
	bpEventsIndicator: true,
})
export class SM204002 extends PXScreen {
	EMailAccounts = createSingle(EMailAccount);
	Details = createCollection(EMailAccountPluginDetail);
}

export class EMailAccount extends PXView {
	@controlConfig<ISelectorControlConfig>({ nullText: NullTextValues.New })
	EmailAccountID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	UserId: PXFieldState<PXFieldOptions.CommitChanges>;
	@headerDescription
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	Address: PXFieldState;
	ReplyAddress: PXFieldState;
	PluginTypeName: PXFieldState<PXFieldOptions.CommitChanges>;
	IsOfPluginType: PXFieldState<PXFieldOptions.Hidden>;
	IncomingHostProtocol: PXFieldState<PXFieldOptions.CommitChanges>;
	ImapRootFolder: PXFieldState;
	IncomingHostName: PXFieldState<PXFieldOptions.CommitChanges>;
	OutcomingHostName: PXFieldState;
	SendGroupMails: PXFieldState;
	AuthenticationMethod: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	OAuthApplicationID: PXFieldState<PXFieldOptions.CommitChanges>;
	OAuthScopes: PXFieldState;
	OAuthParameters: PXFieldState;
	AzureTenantID: PXFieldState;
	LoginName: PXFieldState;
	Password: PXFieldState;
	OutcomingAuthenticationRequest: PXFieldState<PXFieldOptions.CommitChanges>;
	OutcomingAuthenticationDifferent: PXFieldState<PXFieldOptions.CommitChanges>;
	OutcomingLoginName: PXFieldState;
	OutcomingPassword: PXFieldState;
	ValidateFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	IncomingPort: PXFieldState;
	IncomingConnectionEncryption: PXFieldState<PXFieldOptions.CommitChanges>;
	OutcomingPort: PXFieldState;
	OutgoingConnectionEncryption: PXFieldState<PXFieldOptions.CommitChanges>;
	Timeout: PXFieldState<PXFieldOptions.CommitChanges>;
	FetchingBehavior: PXFieldState<PXFieldOptions.CommitChanges>;
	SenderDisplayNameSource: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountDisplayName: PXFieldState;
	IncomingProcessing: PXFieldState<PXFieldOptions.CommitChanges>;
	AddIncomingProcessingTags: PXFieldState;
	ConfirmReceipt: PXFieldState<PXFieldOptions.CommitChanges>;
	ConfirmReceiptNotificationID: PXFieldState;
	CreateCase: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CreateCaseClassID: PXFieldState;
	RouteEmployeeEmails: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateActivity: PXFieldState;
	CreateLead: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateLeadClassID: PXFieldState;
	ProcessUnassigned: PXFieldState<PXFieldOptions.CommitChanges>;
	ResponseNotificationID: PXFieldState;
	SubmitToIncomingAPDocuments: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultBranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeleteUnProcessed: PXFieldState<PXFieldOptions.CommitChanges>;
	TypeDelete: PXFieldState;
	AddUpInformation: PXFieldState;
	IncomingDelSuccess: PXFieldState;
	IncomingAttachmentType: PXFieldState;
	DefaultEmailAssignmentMapID: PXFieldState;
	DefaultWorkgroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultOwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class EMailAccountPluginDetail extends PXView {
	SettingID: PXFieldState;
	Description: PXFieldState;
	Value: PXFieldState;
}
