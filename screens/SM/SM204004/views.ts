import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, PXActionState, GridPreset, fieldConfig, treeConfig, controlConfig } from "client-controls";

// Views

export class MobileNotification extends PXView {
	NotificationID: PXFieldState;
	Name: PXFieldState;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "Key",
				valueField: "Path",
				dataMember: "EntityItemsWithPrevious",
				textField: "Name",
				iconField: "Icon",
				mode: "single",
			},
			allowEditValue: true,
			appendSelectedValue: true,
		}
	})
	Subject: PXFieldState;
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	DeliveryType: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				idField: "Key",
				valueField: "Path",
				dataMember: "ScreenUserItems",
				textField: "Name",
				iconField: "Icon",
				openedLayers: 1,
			},
			selectorTabTitle: "Users",
			selectorConfig: {
				view: "UserItems",
				key: "KeyUserName",
				description: "FullName",
			},
			allowEditValue: true,
		}
	})
	NTo: PXFieldState<PXFieldOptions.CommitChanges>;
	NFrom: PXFieldState;
	ScreenIdValue: PXFieldState;
	LocaleName: PXFieldState;
	DestinationScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
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
			},
			allowEditValue: true,
		}
	})
	DestinationEntityID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowSendByEventsTabExpr: PXFieldState;
}

export class MobileNotification2 extends PXView {
	Body: PXFieldState<PXFieldOptions.Multiline>;
}

@gridConfig({ preset: GridPreset.Details })
export class BPEvent extends PXView {
	CreateBusinessEvent: PXActionState;

	@linkCommand("ViewBusinessEvent") Name: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState;
	Type: PXFieldState;
}

export class BPEventData extends PXView {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
}