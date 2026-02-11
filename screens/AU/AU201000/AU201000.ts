import { createCollection, createSingle, graphInfo, PXView, PXFieldState, gridConfig, PXFieldOptions, linkCommand, columnConfig, GridColumnType, PXActionState, GridPreset, GridPagerMode, localizable, GridNoteFilesShowMode, fieldConfig } from "client-controls";
import { AuBaseScreen } from "../common/au-base-screen";

@graphInfo({
	graphType: "PX.SM.AUProjectScreenMaint",
	primaryView: "Pages",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class AU201000 extends AuBaseScreen {
	viewAction: PXActionState;
	AccessRights = AccessRightMessages;

	Pages = createCollection(CustObject);

	ViewPageWizard = createSingle(RowPageWizard);

	ViewSelectScreen = createSingle(RowSelectScreen);
}

// Views

@localizable
export class AccessRightMessages {
	static Message = "Access rights for the Customizer role will be automatically added to the customization project.";
}

@gridConfig({
	preset: GridPreset.Primary,
	batchUpdate: false,
	autoAdjustColumns: true,
	adjustPageSize: false,
	pagerMode: GridPagerMode.InfiniteScroll,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	allowInsert: false
})
export class CustObject extends PXView  {
	@linkCommand("viewAction")
	@columnConfig({width: 80})	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({width: 150})	Title: PXFieldState;
	@columnConfig({width: 80, type: GridColumnType.CheckBox})	IsNew: PXFieldState;
	@columnConfig({allowUpdate: false, width: 108})	LastModifiedByID_Modifier_Username: PXFieldState;
	@columnConfig({allowUpdate: false, width: 90})	LastModifiedDateTime: PXFieldState;
}

export class RowPageWizard extends PXView  {
	ScreenID: PXFieldState;
	@fieldConfig({ controlType: "qp-text-editor" })
	GraphName: PXFieldState<PXFieldOptions.CommitChanges>;
	GraphNamespace: PXFieldState<PXFieldOptions.CommitChanges>;
	PageTitle: PXFieldState;
	Template: PXFieldState;
	CreateFilesForModernUI: PXFieldState;
}

export class RowSelectScreen extends PXView  {
	SiteMap: PXFieldState<PXFieldOptions.CommitChanges>;
}
