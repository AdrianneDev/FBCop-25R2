import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	graphInfo,
	viewInfo,
	createSingle,
	createCollection,
	gridConfig,
	PXActionState,
	GridFilterBarVisibility,
	GridPagerMode
} from "client-controls";

@graphInfo({graphType: "PX.SM.AUAuditMaintenance", primaryView: "Audit"})
export class SM205510 extends PXScreen {
	Refresh: PXActionState;

	@viewInfo({containerName: "Screen Selection"})
	Audit = createSingle(AUAuditSetup);

	@viewInfo({containerName: "Tables"})
	Tables = createCollection(AUAuditTable);

	@viewInfo({containerName: "Fields"})
	Fields = createCollection(AUAuditField);
}

export class AUAuditSetup extends PXView {
	ScreenID: PXFieldState;
	VirtualScreenID: PXFieldState;
	Description: PXFieldState;
	ShowFieldsType: PXFieldState<PXFieldOptions.CommitChanges>;
	IsActive: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({syncPosition: true, autoRepaint: ["Fields"], allowDelete: false, allowInsert: false, showFilterBar: GridFilterBarVisibility.False,
	pagerMode: GridPagerMode.InfiniteScroll
})
export class AUAuditTable extends PXView {
	IsActive: PXFieldState;
	TableName: PXFieldState;
	TableDisplayName: PXFieldState;
	ShowFieldsType: PXFieldState;
}

@gridConfig({allowDelete: false, allowInsert: false, showFilterBar: GridFilterBarVisibility.False, pagerMode: GridPagerMode.InfiniteScroll})
export class AUAuditField extends PXView {
	IsActive: PXFieldState;
	FieldName: PXFieldState;
	FieldDisplayName: PXFieldState;
}
