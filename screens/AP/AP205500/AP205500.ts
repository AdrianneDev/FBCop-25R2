import { Messages as SysMessages } from "client-controls/services/messages";
import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, handleEvent, CustomEventType,
	 RowSelectedHandlerArgs, PXViewCollection, PXPageLoadBehavior, ControlParameter, PXView, PXFieldState, gridConfig,
	  treeConfig, fieldConfig, controlConfig, actionConfig, headerDescription, ICurrencyInfo, disabled, PXFieldOptions, linkCommand,
	   columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, TextAlign, GridPreset, autoRefresh, GridFastFilterVisibility} from "client-controls";

@graphInfo({graphType: "PX.Objects.AP.PaymentProcessor.APExternalPaymentProcessorMaint", primaryView: "ExternalPaymentProcessor" })
export class AP205500 extends PXScreen {

	ExternalPaymentProcessor = createSingle(APExternalPaymentProcessor);

   	@viewInfo({containerName: "Companies"})
	PaymentProcessorOrganizations = createCollection(APPaymentProcessorOrganization);

   	@viewInfo({containerName: "Users"})
	PaymentProcessorUsers = createCollection(APPaymentProcessorUser);

   	@viewInfo({containerName: "Funding Accounts"})
	PaymentProcessorAccounts = createCollection(APPaymentProcessorAccount);

   	@viewInfo({containerName: "Funding Account Users"})
	PaymentProcessorAccountUsers = createCollection(APPaymentProcessorAccountUser);

	@handleEvent(CustomEventType.RowSelected, { view: "PaymentProcessorOrganizations" })
	onAPPaymentProcessorOrganizationChanged(args: RowSelectedHandlerArgs<PXViewCollection<APPaymentProcessorOrganization>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.ConnectOrganization) model.ConnectOrganization.enabled = !!ar?.CanBeOnboarded.value;
		if (model.SubscribeWebhook) model.SubscribeWebhook.enabled = !!ar?.CanSubscribe.value;
		if (model.UnSubscribeWebhook) model.UnSubscribeWebhook.enabled = !!ar?.CanUnSubscribe.value;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "PaymentProcessorUsers" })
	onAPPaymentProcessorUserChanged(args: RowSelectedHandlerArgs<PXViewCollection<APPaymentProcessorUser>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.OnboardUser) model.OnboardUser.enabled = !!ar?.CanBeOnboarded.value;
		if (model.EnableUser) model.EnableUser.enabled = !!ar?.CanBeEnabled.value;
		if (model.DisableUser) model.DisableUser.enabled = !!ar?.CanBeDisabled.value;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "PaymentProcessorAccounts" })
	onAPPaymentProcessorAccountChanged(args: RowSelectedHandlerArgs<PXViewCollection<APPaymentProcessorAccount>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.DisableAccount) model.DisableAccount.enabled = !!ar?.CanBeDisabled.value;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "PaymentProcessorAccountUsers" })
	onAPPaymentProcessorAccountUserChanged(args: RowSelectedHandlerArgs<PXViewCollection<APPaymentProcessorAccountUser>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.DisableAccountUser) model.DisableAccountUser.enabled = !!ar?.CanBeDisabled.value;
	}
}

export class APExternalPaymentProcessor extends PXView  {

	ExternalPaymentProcessorID: PXFieldState<PXFieldOptions.CommitChanges>;
	Name: PXFieldState;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
	IsProduction: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoRepaint: ["PaymentProcessorUsers", "PaymentProcessorAccounts", "PaymentProcessorAccountUsers"]
})
export class APPaymentProcessorOrganization extends PXView  {

	ConnectOrganization: PXActionState;
	SubscribeWebhook: PXActionState;
	UnSubscribeWebhook: PXActionState;

	@autoRefresh
	@columnConfig({ hideViewLink: true })
	OrganizationID: PXFieldState<PXFieldOptions.CommitChanges>;

	Organization__OrganizationName: PXFieldState;

	@columnConfig({type: GridColumnType.CheckBox})
	IsOnboarded: PXFieldState;

	@columnConfig({allowUpdate: false, hideViewLink: true })
	WebhookID: PXFieldState;

	WebHook__IsActive: PXFieldState;

	ExternalOrganizationID: PXFieldState;

	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	CanBeOnboarded: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	CanSubscribe: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	CanUnSubscribe: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class APPaymentProcessorUser extends PXView  {

	OnboardUser: PXActionState;
	EnableUser: PXActionState;
	DisableUser: PXActionState;

	@columnConfig({ hideViewLink: true })
	OrganizationID: PXFieldState;

	@autoRefresh
	@columnConfig({ hideViewLink: true })
	UserID: PXFieldState<PXFieldOptions.CommitChanges>;

	Users__DisplayName: PXFieldState;
	Users__Email: PXFieldState;

	Status: PXFieldState;
	ExternalUserID: PXFieldState;

	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	CanBeOnboarded: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	CanBeEnabled: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({visible: false, allowShowHide: GridColumnShowHideMode.False})
	CanBeDisabled: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class APPaymentProcessorAccount extends PXView  {

	ManageFundingAccounts: PXActionState;
	RefreshFundingAccounts: PXActionState;
	DisableAccount: PXActionState;

	@columnConfig({ hideViewLink: true })
	OrganizationID: PXFieldState;
	ExternalAccountID: PXFieldState;
	ExternalAccountBank: PXFieldState;
	ExternalAccountType: PXFieldState;
	ExternalAccountName: PXFieldState;
	ExternalAccountRoutingNumber: PXFieldState;
	ExternalAccountNumber: PXFieldState;
	Status: PXFieldState;

	@autoRefresh
	@columnConfig({ hideViewLink: true })
	CashAccountID: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.True, hideViewLink: true })
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	CanBeDisabled: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details
})
export class APPaymentProcessorAccountUser extends PXView  {

	RefreshFundingAccountUsers: PXActionState;
	DisableAccountUser: PXActionState;

	APPaymentProcessorUser__UserID: PXFieldState;
	Users__DisplayName: PXFieldState;
	Status: PXFieldState;
	APPaymentProcessorAccount__ExternalAccountBank: PXFieldState;
	APPaymentProcessorAccount__ExternalAccountType: PXFieldState;
	APPaymentProcessorAccount__ExternalAccountNumber: PXFieldState;
	ExternalAccountStatus: PXFieldState;
	APPaymentProcessorAccount__CashAccountID: PXFieldState;

	ExternalUserID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ExternalAccountID: PXFieldState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	CanBeDisabled: PXFieldState<PXFieldOptions.Hidden>;
}
