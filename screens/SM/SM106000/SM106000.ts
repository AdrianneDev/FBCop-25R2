import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, GridPreset, columnConfig, gridConfig, GridNoteFilesShowMode } from "client-controls";

@graphInfo({graphType: "PX.Objects.GL.GLAccessPrinter", primaryView: "Group"})
export class SM106000 extends PXScreen {

   	@viewInfo({containerName: "Restriction Group"})
	Group = createSingle(RelationGroup);

   	@viewInfo({containerName: "Users"})
	Users = createCollection(Users);

   	@viewInfo({containerName: "Printers"})
	Printers = createCollection(SMPrinter);
}

export class RelationGroup extends PXView  {
	GroupName: PXFieldState;
	Description: PXFieldState;
	GroupType: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class Users extends PXView  {
	@columnConfig({allowCheckAll: true})
	Included: PXFieldState;

	@columnConfig({hideViewLink: true})
	Username: PXFieldState;

	FullName: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class SMPrinter extends PXView  {
	@columnConfig({allowCheckAll: true})
	Included: PXFieldState;

	PrinterName: PXFieldState;
	DeviceHubID: PXFieldState;
	Description: PXFieldState;
}