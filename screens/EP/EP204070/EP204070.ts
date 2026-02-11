import {
	createSingle,
	PXScreen,
	PXView,
	graphInfo,
	PXFieldState,
	PXFieldOptions,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";


@graphInfo({ graphType: "PX.Objects.EP.EPEventSetupMaint", primaryView: "Setup" })
export class EP204070 extends PXScreen {
	Setup = createSingle(EPSetup);
}

export class EPSetup extends PXView {
	SendOnlyEventCard: PXFieldState<PXFieldOptions.CommitChanges>;
	IsSimpleNotification: PXFieldState<PXFieldOptions.CommitChanges>;
	AddContactInformation: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	InvitationTemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	RescheduleTemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CancelInvitationTemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
}
