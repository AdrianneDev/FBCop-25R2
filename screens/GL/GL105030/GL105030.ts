import {
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, gridConfig, columnConfig, GridPreset, GridNoteFilesShowMode, GridColumnDisplayMode
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.GL.GLAccessBudget", primaryView: "Group",
	hideFilesIndicator: true, hideNotesIndicator: true
})
export class GL105030 extends PXScreen {

	Group = createSingle(RelationGroup);
	Users = createCollection(Users);
	BudgetTree = createCollection(GLBudgetTree);

}

export class RelationGroup extends PXView {

	GroupName: PXFieldState;
	Description: PXFieldState;
	GroupType: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	quickFilterFields: ["Username", "FullName"],
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
	preset: GridPreset.Details, allowDelete: false, allowUpdate: false,
	quickFilterFields: ["AccountID", "SubID", "GroupID"]
})
export class GLBudgetTree extends PXView {

	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;
	@columnConfig({ hideViewLink: true, width: 200, textField: "Description", displayMode: GridColumnDisplayMode.Text })
	GroupID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	AccountID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	SubID: PXFieldState;
	AccountMask: PXFieldState;
	SubMask: PXFieldState;
	IsGroup: PXFieldState;
}
