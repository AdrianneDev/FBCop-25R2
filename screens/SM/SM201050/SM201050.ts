import {
	PXView,
	PXFieldState,
	columnConfig,
	graphInfo,
	PXScreen,
	linkCommand,
	createCollection,
	gridConfig,
	PXFieldOptions,
	PXPageLoadBehavior,
	GridPagerMode,
	PXActionState,
	createSingle,
	GridPreset,
	GridNoteFilesShowMode,
} from "client-controls";

@graphInfo({ graphType: "PX.SM.SMAccess", primaryView: "Group" })
export class SM201050 extends PXScreen {
	Group = createSingle(RelationGroup);
	Users = createCollection(User);
	Account = createCollection(Account);
}

export class RelationGroup extends PXView {
	GroupName: PXFieldState;
	Description: PXFieldState;
	GroupType: PXFieldState;
	Active: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowDelete: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	quickFilterFields: ["EmailAccountID", "LoginName"],
})
export class Account extends PXView {
	EmailAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	LoginName: PXFieldState;
	Included: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	quickFilterFields: ["Username", "Comment"],
	allowDelete: false,
	pagerMode: GridPagerMode.Numeric,
})
export class User extends PXView {
	@columnConfig({ allowCheckAll: true })
	Included: PXFieldState;
	Username: PXFieldState;
	FullName: PXFieldState;
	Comment: PXFieldState;
}
