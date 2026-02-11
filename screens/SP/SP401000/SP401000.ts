import "../sp-common.scss";
import { autoinject } from "aurelia-framework";
import { Messages as SysMessages } from "client-controls/services/messages";
import {
	PXScreen, createCollection, createSingle, graphInfo, commitChanges, PXView, localizable, PXFieldOptions,
	PXFieldState, PXActionState, viewInfo, linkCommand, columnConfig, GridNoteFilesShowMode,
	GridAutoGrowMode, GridPreset,
	GridPagerMode,
	gridConfig,
	controlConfig
} from "client-controls";
import "./SP401000.css";
import { PortalScreen } from "../sp-base";


export class CaseView extends PXView {
	CaseCD: PXFieldState<PXFieldOptions.CommitChanges>;
	CaseClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContractID: PXFieldState<PXFieldOptions.CommitChanges>;
	Priority: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({
		editorType: "qp-rich-text-editor",
		editorConfig: {
			expandToContentMinHeight: 50,
			expandToContent: true,
			valueFormat: "text",
		},
	})
	Subject: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Multiline>;
	ReportedOnDateTime_Date: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ editorConfig: { timeMode: true } }) ReportedOnDateTime_Time: PXFieldState<PXFieldOptions.CommitChanges>;
	LastActivity: PXFieldState;
	OwnerID: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState<PXFieldOptions.CommitChanges>;
	Resolution: PXFieldState<PXFieldOptions.CommitChanges>;
	Severity: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	initNewRow: false,
	wrapToolbar: true,
	allowUpdate: false,
	allowDelete: false,
	allowInsert: false,
	syncPosition: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	pageSize: 10,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	showBottomBar: true,
	topBarItems: {
		refresh: { config: { hidden: true, visibleOnToolbar: false } },
		adjust: { config: { hidden: true, visibleOnToolbar: false } },
		exportToExcel: { config: { hidden: true, visibleOnToolbar: false } },
	}
})
export class ActivityView extends PXView {
	ClassInfo: PXFieldState;
	@columnConfig({ hideViewLink: true }) Subject: PXFieldState;
	StartDate: PXFieldState;
	CreatedByID_Creator_Username: PXFieldState;
	Body: PXFieldState<PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showTopBar: false,
	initNewRow: false,
	wrapToolbar: true,
	adjustPageSize: true,
	allowUpdate: true,
	allowDelete: false,
	allowInsert: false,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	topBarItems: {
		refresh: { config: { hidden: true, visibleOnToolbar: false } },
		adjust: { config: { hidden: true, visibleOnToolbar: false } },
		exportToExcel: { config: { hidden: true, visibleOnToolbar: false } },
	}
})
export class AttributeView extends PXView {
	@columnConfig({ hideViewLink: true, textField: "AttributeID_description" })
	AttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Value: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class NewCommentView extends PXView {
	@columnConfig({ hideViewLink: true }) Subject: PXFieldState;
	Body: PXFieldState;
}

@localizable
class Messages {
	static Description = "Description";
	static Activities = "Activities";
	static Attributes = "Attributes";
	static AddComment = "Add Comment";
	static Add = "Add";
	static Close = "Close";
	static CloseCaseQuestion = "Do you want to close this case?";
	static CloseCase = "Close Case";
	static Reopen = "Reopen";
	static ReopenCase = "Reopen Case";
	static ReopenCaseQuestion = "Do you want to reopen this case?";
	static SendMsg = "Send Message";
}


@graphInfo({ graphType: "PX.Objects.Portals.SPCaseMaint", primaryView: "Case" })
export class SP401000 extends PortalScreen {
	msg = Messages;
	SysMessages = SysMessages;
	Case = createSingle(CaseView);
	Comment = createSingle(NewCommentView);
	@viewInfo({ syncAlways: true })
	Activities = createCollection(ActivityView);
	Answers = createCollection(AttributeView);
}
