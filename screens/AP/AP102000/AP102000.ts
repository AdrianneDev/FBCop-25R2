import {
	PXScreen, createSingle, graphInfo, PXView, PXFieldState, createCollection, columnConfig, gridConfig, GridNoteFilesShowMode, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.AP.APAccess", primaryView: "Group" })
export class AP102000 extends PXScreen {

	Group = createSingle(RelationGroup);
	Users = createCollection(Users);
	Vendor = createCollection(Vendor);

}

export class RelationGroup extends PXView {

	GroupName: PXFieldState;
	Description: PXFieldState;

	@columnConfig({ allowNull: false })
	GroupType: PXFieldState;

	Active: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, showNoteFiles: GridNoteFilesShowMode.HideByDefault, fastFilterByAllFields: false })
export class Users extends PXView {

	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ allowUpdate: false, hideViewLink: true, allowFastFilter: true })
	Username: PXFieldState;

	@columnConfig({ allowUpdate: false })
	FullName: PXFieldState;

	@columnConfig({ allowUpdate: false, allowFastFilter: true })
	Comment: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details, showNoteFiles: GridNoteFilesShowMode.HideByDefault, fastFilterByAllFields: false })
export class Vendor extends PXView {

	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	AcctCD: PXFieldState;

	@columnConfig({ allowUpdate: false })
	VStatus: PXFieldState;

	@columnConfig({ allowFastFilter: true,  allowUpdate: false })
	AcctName: PXFieldState;

}
