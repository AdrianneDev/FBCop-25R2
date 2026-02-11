import {
	PXScreen,
	graphInfo,
	PXView,
	createCollection,
	PXFieldState,
	gridConfig,
	createSingle,
	linkCommand,
	PXFieldOptions,
	PXActionState,
	commitChanges,
	viewInfo,
	columnConfig,
	GridColumnType,
	GridPreset,
	fieldConfig,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";
import { NullTextValues } from "src/screens/common/messages";

@graphInfo({
	graphType: "PX.SM.SMTeamsNotificationMaint",
	primaryView: "Notifications",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class SM204006 extends PXScreen {

	ViewBusinessEvent: PXActionState;

	Notifications = createSingle(SMTeamsNotification);

	@viewInfo({ containerName: "Send by Events" })
	BusinessEvents = createCollection(BPEvent);

	@viewInfo({ containerName: "Create Business Event" })
	NewEventData = createSingle(BPEventData);
}

export class SMTeamsNotification extends PXView {
	@controlConfig<ISelectorControlConfig>({ nullText: NullTextValues.New })
	NotificationID: PXFieldState;
	Name: PXFieldState;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "Key",
				valueField: "Path",
				dataMember: "EntityItems",
				textField: "Name",
				iconField: "Icon",
				mode: "single",
				openedLayers: 0,
				dynamic: true,
			},
			allowEditValue: true,
			appendSelectedValue: true,
		},
	})
	Subject: PXFieldState;
	@commitChanges
	@controlConfig<ISelectorControlConfig>({ displayMode: "text" })
	ChannelID: PXFieldState;
	@commitChanges ScreenID: PXFieldState;
	LocaleName: PXFieldState;
	ShowReportTabExpr: PXFieldState;
	ShowSendByEventsTabExpr: PXFieldState;
	Body: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowUpdate: false,
	fastFilterByAllFields: false
})
export class BPEvent extends PXView {

	createBusinessEvent: PXActionState;

	@linkCommand<SM204006>("ViewBusinessEvent")
	Name: PXFieldState;

	Description: PXFieldState;

	@columnConfig({ type: GridColumnType.CheckBox })
	Active: PXFieldState;

	Type: PXFieldState;
}

export class BPEventData extends PXView {

	Name: PXFieldState<PXFieldOptions.CommitChanges>;
}
