import { PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, PXActionState, GridPreset, fieldConfig, controlConfig, GridColumnDisplayMode, TextAlign, actionConfig } from "client-controls";
import {NullTextValues} from "../../common/messages";

const EntityItemsWithPreviousTreeConfig = {
	controlType: "qp-tree-selector",
	controlConfig: {
		treeConfig: {
			idField: "Key",
			valueField: "Path",
			dataMember: "EntityItemsWithPrevious",
			textField: "Name",
			iconField: "Icon",
			mode: "single",
			openedLayers: 0,
			dynamic: true,
			toolTipField: "Path"
		},
		allowEditValue: true,
		appendSelectedValue: true,
	},
};

const ScreenEmailItemsTreeConfig = {
	controlType: "qp-tree-selector",
	controlConfig: {
		treeConfig: {
			idField: "Key",
			dataMember: "ScreenEmailItems",
			textField: "Name",
			valueField: "Path",
			iconField: "Icon",
			mode: "multi",
			toolTipField: "Path",
			openedLayers: 1,
		},
		selectorConfig: {
			view: "UserEmailItems",
			key: "KeyUserName",
			description: "FullName",
		},
		allowEditValue: true,
		appendSelectedValue: true,
	}
};

export class Notification extends PXView  {

	@controlConfig({
		nullText: NullTextValues.New,
		displayMode: "text"
	})
	NotificationID: PXFieldState;
	Name: PXFieldState;

	@fieldConfig(EntityItemsWithPreviousTreeConfig)
	Subject: PXFieldState;

	@controlConfig({ controlType: "qp-selector", allowEdit: true, editCommand: "RedirectToScreen", displayMode: "both" })
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	NFrom: PXFieldState<PXFieldOptions.CommitChanges>;
	LocaleName: PXFieldState;
	attachActivity: PXFieldState;
	Type: PXFieldState;

	@fieldConfig(EntityItemsWithPreviousTreeConfig)
	RefNoteID: PXFieldState;
	@fieldConfig(EntityItemsWithPreviousTreeConfig)
	ContactID: PXFieldState;
	@fieldConfig(EntityItemsWithPreviousTreeConfig)
	BAccountID: PXFieldState;

	@fieldConfig(ScreenEmailItemsTreeConfig)
	NTo: PXFieldState;
	@fieldConfig(ScreenEmailItemsTreeConfig)
	NCc: PXFieldState;
	@fieldConfig(ScreenEmailItemsTreeConfig)
	NBcc: PXFieldState;
}

export class Notification2 extends PXView  {
	Body: PXFieldState;
	ReportAction: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	autoAdjustColumns: true,
	fastFilterByAllFields: false,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	},
	autoRepaint: ["CurrentNotificationReport", "NotificationReportParameters"],
})
export class NotificationReport extends PXView  {
	@columnConfig({
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Both,
		editorConfig: {
			textField: "title", displayMode: "text"
		}
	})
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, width: 50 })
	Embedded: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CurrentNotificationReport extends PXView  {
	ReportTemplateID: PXFieldState<PXFieldOptions.CommitChanges>;
	PassData: PXFieldState<PXFieldOptions.CommitChanges>;
	TableToPass: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
	actionsConfig: {
		adjust: { hidden: true },
		exportToExcel: { hidden: true },
	}
})
export class NotificationReportParameter extends PXView  {
	Name: PXFieldState;
	@columnConfig({ fullState: true })
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ allowSort: false, width: 50 })
	FromSchema: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 50 })
	IsOverride: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	autoAdjustColumns: true,
})
export class BPEvent extends PXView  {
	createBusinessEvent: PXActionState;

	@linkCommand("ViewBusinessEvent")
	Name: PXFieldState;
	Description: PXFieldState;
	@columnConfig({ width: 50 })
	Active: PXFieldState;
	Type: PXFieldState;
}

export class BPEventData extends PXView  {
	Name: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class SendGridDesignImportParameters extends PXView  {
	@controlConfig({ displayMode: "text" })
	DesignID: PXFieldState<PXFieldOptions.CommitChanges>;
	ThumbnailUrl: PXFieldState;
}

@gridConfig({preset: GridPreset.Details, autoAdjustColumns: true, syncPosition: true, actionsConfig: {insert: {hidden: true}}})
export class NotificationSchedule extends PXView {
	viewScheduleHistory: PXActionState;
	@actionConfig({ popupCommand: 'Refresh' })
	createSchedule: PXActionState;

	@columnConfig({width: 100})
	IsActive: PXFieldState;
	@linkCommand("viewSchedule")
	@columnConfig({textField: "AUSchedule__Description", displayMode: GridColumnDisplayMode.Text, textAlign: TextAlign.Left, width: 300})
	AUSchedule__ScheduleID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 200})
	AUSchedule__TimeZoneID: PXFieldState;
	@columnConfig({width: 100})
	AUSchedule__LastRunDate: PXFieldState;
	@columnConfig({width: 100})
	AUSchedule__NextRunDate: PXFieldState;
}

@gridConfig({preset: GridPreset.Inquiry})
export class Notification3 extends PXView {
	@columnConfig({displayMode: GridColumnDisplayMode.Text, hideViewLink: true})
	ScheduleID: PXFieldState;
	ExecutionDate: PXFieldState;
	ExecutionDateToDisplay: PXFieldState;
	ExecutionResult: PXFieldState;
	Notification__Name: PXFieldState;
}
