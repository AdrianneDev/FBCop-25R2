import {
	PXView,
	PXFieldState,
	createSingle,
	viewInfo,
	fieldConfig,
	featureInstalled,
	PXActionState,
} from "client-controls";

@featureInstalled("PX.Objects.CS.FeaturesSet+TeamsIntegration")
export abstract class  TeamsContactPanelBase {

	// form actions
	ContactTeamsCardOffline: PXActionState;
	ContactTeamsCardAvailable: PXActionState;
	ContactTeamsCardBusy: PXActionState;
	ContactTeamsCardAway: PXActionState;
	OwnerTeamsCardOffline: PXActionState;
	OwnerTeamsCardAvailable: PXActionState;
	OwnerTeamsCardBusy: PXActionState;
	OwnerTeamsCardAway: PXActionState;

	// inside popup actions
	StatusIconContactOffline: PXActionState;
	StatusIconContactAvailable: PXActionState;
	StatusIconContactBusy: PXActionState;
	StatusIconContactAway: PXActionState;
	ContactChat: PXActionState;
	ContactCall: PXActionState;
	ContactMeeting: PXActionState;

	StatusIconOwnerOffline: PXActionState;
	StatusIconOwnerAvailable: PXActionState;
	StatusIconOwnerBusy: PXActionState;
	StatusIconOwnerAway: PXActionState;
	OwnerChat: PXActionState;
	OwnerCall: PXActionState;
	OwnerMeeting: PXActionState;

	// views
	@viewInfo({ containerName: "Dialog: Teams Contact Card" })
	TeamsContactCard = createSingle(SMTeamsMember);

	@viewInfo({ containerName: "Dialog: Teams Owner Card" })
	TeamsOwnerCard = createSingle(SMTeamsMember);
}

export class SMTeamsMember extends PXView {
	ContactChat: PXActionState;
	ContactCall: PXActionState;
	ContactMeeting: PXActionState;
	OwnerChat: PXActionState;
	OwnerCall: PXActionState;
	OwnerMeeting: PXActionState;

	PhotoFileName: PXFieldState;
	DisplayName: PXFieldState;
	TeamsStatus: PXFieldState;
	JobTitle: PXFieldState;
	CompanyName: PXFieldState;
	Email: PXFieldState;
	MobilePhone: PXFieldState;
}
