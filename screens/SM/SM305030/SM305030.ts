import {
	createCollection,
	graphInfo,
	GridPreset,
	PXFieldState,
	PXView,
	PXScreen,
	GridColumnDisplayMode,
	GridColumnType,
	columnConfig,
	TextAlign,
	gridConfig,
	GridNoteFilesShowMode
} from "client-controls";

@gridConfig({
	preset: GridPreset.Inquiry,
	allowDelete: false,
	allowInsert: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
})
export class SMTeamsMember extends PXView {
	Active: PXFieldState;
	@columnConfig({ textAlign: TextAlign.Center, type: GridColumnType.Icon }) TeamPhoto: PXFieldState;
	UserPrincipalName: PXFieldState;
	DisplayName: PXFieldState;
	@columnConfig({ displayMode: GridColumnDisplayMode.Text, hideViewLink: true }) ContactID: PXFieldState;
}

@graphInfo({
	graphType: "PX.MSTeams.Graph.SM.TeamsMemberMaint",
	primaryView: "Members",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class SM305030 extends PXScreen {

	Members = createCollection(SMTeamsMember);
}
