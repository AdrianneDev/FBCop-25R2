import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, gridConfig, columnConfig, GridPreset, GridNoteFilesShowMode
} from "client-controls";

@graphInfo({graphType: "PX.Objects.AR.ARAccess", primaryView: "Group", })
export class AR102000 extends PXScreen {

	@viewInfo({containerName: "Restriction Group"})
	Group = createSingle(RelationGroup);

	@viewInfo({containerName: "Users"})
	Users = createCollection(Users);

	@viewInfo({containerName: "Customers"})
	Customer = createCollection(Customer);
}

export class RelationGroup extends PXView {
	GroupName: PXFieldState;
	Description: PXFieldState;
	GroupType: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	quickFilterFields: ["FullName", "Username"],
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class Users extends PXView {

	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Username: PXFieldState;
	FullName: PXFieldState;
	Comment: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	quickFilterFields: ["AcctCD", "AcctName"],
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class Customer extends PXView {

	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;

	AcctCD: PXFieldState;
	Status: PXFieldState;
	AcctName: PXFieldState;
}
