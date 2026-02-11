import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, columnConfig, gridConfig, TextAlign, GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.GLAccessByBudgetNode", primaryView: "BudgetTree" })
export class GL105020 extends PXScreen {

	BudgetTree = createSingle(BudgetTree);
	Groups = createCollection(Groups);
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class Groups extends PXView {

	@columnConfig({ textAlign: TextAlign.Center, allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ hideViewLink: true })
	GroupName: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState;
	GroupType: PXFieldState;
}

@gridConfig({ allowDelete: false })
export class BudgetTree extends PXView {

	GroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	AccountID: PXFieldState<PXFieldOptions.Disabled>;
	SubID: PXFieldState<PXFieldOptions.Disabled>;
	IsGroup: PXFieldState<PXFieldOptions.Disabled>;
	AccountMask: PXFieldState<PXFieldOptions.Disabled>;
	SubMask: PXFieldState<PXFieldOptions.Disabled>;
}
