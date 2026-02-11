import { GridAutoGrowMode, GridColumnShowHideMode, GridPreset, PXFieldState, PXView, gridConfig, columnConfig, treeConfig, controlConfig, linkCommand, fieldConfig } from "client-controls";
import {
	localizable,
	PXFieldOptions,
	PXActionState
} from "client-controls";

@localizable
export class Messages {
	static CreatedCaption = "Created";
	static EditVersion = "Edit Version";
	static ActivateVersion = "Activate";
	static DeactivateVersion = "Deactivate";
	static EmailTemplate = "Email Template";
	static ScreenID = "Screen ID";
	static Recipients = "Recipients";
	static ReportTemplate = "Report Template";
	static ReportTemplateOwner = "Report Template Owner";
	static ScheduleReport = "Schedule Report";
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	adjustPageSize: true,
	syncPosition: true,
})
export class SortData extends PXView {
	LineNbr: PXFieldState<PXFieldOptions.Hidden>;
	FieldName: PXFieldState;
	SortOrder: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	allowUpdate: true,
	allowInsert: false,
	allowDelete: true,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	syncPosition: true,
	columns: [
		{ field: "Version", width: 100 },
		{ field: "ReportFileName", visible: false, allowShowHide: GridColumnShowHideMode.False },
		{ field: "Description" },
		{ field: "IsActive", width: 100 },
		{ field: "DateCreated", width: 110 },
	],
	topBarItems: {
		EditVersion: {
			index: 2,
			config: {
				commandName: "EditVersion",
				text: Messages.EditVersion,
			},
		},
		ActivateVersion: {
			index: 3,
			config: {
				commandName: "ActivateVersion",
				text: Messages.ActivateVersion,
			},
		},
		DeactivateVersion: {
			index: 4,
			config: {
				commandName: "DeactivateVersion",
				text: Messages.DeactivateVersion,
			},
		},
	},
})
export class UserReport extends PXView {
	EditVersion: PXActionState;
	ActivateVersion: PXActionState;
	DeactivateVersion: PXActionState;

	Version: PXFieldState;
	ReportFileName: PXFieldState<PXFieldOptions.Hidden>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState;
	DateCreated: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	syncPosition: true
})
export class FilterData extends PXView {
	LineNbr: PXFieldState;
	DataField: PXFieldState;
	Condition: PXFieldState;
	Operator: PXFieldState;
	OpenBraces: PXFieldState;
	CloseBraces: PXFieldState;
	@columnConfig({ fullState: true })
	Value: PXFieldState;
	@columnConfig({ fullState: true })
	Value2: PXFieldState;
}

export class ReportParameters extends PXView {
}

export class ReportExp extends PXView {
	@controlConfig({allowEdit: false, allowNull: false})
	Format: PXFieldState;

	@fieldConfig({ controlType: "qp-mail-editor" })
	Email: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({ controlType: "qp-mail-editor" })
	Cc: PXFieldState<PXFieldOptions.CommitChanges>;

	@fieldConfig({ controlType: "qp-mail-editor" })
	Bcc: PXFieldState<PXFieldOptions.CommitChanges>;

	Subject: PXFieldState;

	Locale: PXFieldState;
	Localization: PXFieldState;

	@controlConfig({allowEdit: false, allowNull: false})
	DeletedRecords: PXFieldState;
	@controlConfig({allowEdit: false, allowNull: false})
	ArchivedRecords: PXFieldState;
	ViewPdf: PXFieldState;
	PdfFontEmbedded: PXFieldState;
	PdfCompressed: PXFieldState;
	PrintAllPages: PXFieldState;
	AlternativeEngine: PXFieldState;

	Template: PXFieldState;
	ScreenId: PXFieldState;
	InstanceId: PXFieldState;
	PageIndex: PXFieldState;
	ShowPdfSignWarning: PXFieldState<PXFieldOptions.Hidden>;
	IsArm: PXFieldState<PXFieldOptions.Hidden>;
}

export class ReportSettingsExp extends PXView {
	Name: PXFieldState;
}

export class EditTemplateDialog extends PXView {
	@fieldConfig({ controlConfig: { immediateApplyValue: true } })
	Template: PXFieldState;
	IsDefaultTemplate: PXFieldState;
	IsSharedTemplate: PXFieldState;
}

@treeConfig({
	idField: "GroupId",
	textField: "Description",
	parentIdField: "ParentGroupId",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	onSelect: "groupNodeSelected",
	hideToolbarSearch: true,
	hideRootNode: true,
})
export class GroupTree extends PXView {
	GroupId: PXFieldState;
	Description: PXFieldState;
	ParentGroupId: PXFieldState;
}

@gridConfig({
	allowUpdate: false,
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fill,
	syncPosition: true,
	columns: [
		{ field: "NotificationID", visible: false, allowShowHide: GridColumnShowHideMode.False },
		{ field: "EmailTemplate", caption: Messages.EmailTemplate },
		{ field: "ScreenID", caption: Messages.ScreenID },
		{ field: "Recipients", caption: Messages.Recipients },
		{ field: "ReportTemplate", caption: Messages.ReportTemplate },
		{ field: "ReportTemplateOwner", caption: Messages.ReportTemplateOwner},
	],
	topBarItems: {
		scheduleReport: {
			index: 1,
			config: {
				commandName: "scheduleReport",
				text: Messages.ScheduleReport,
			},
		},
	}
})
export class EmailNotification extends PXView {
	scheduleReport: PXActionState;

	NotificationID: PXFieldState<PXFieldOptions.Hidden>;

	@linkCommand("viewNotification")
	EmailTemplate: PXFieldState;
	ScreenID: PXFieldState;
	Recipients: PXFieldState;
	ReportTemplate: PXFieldState;
	ReportTemplateOwner: PXFieldState;
}
