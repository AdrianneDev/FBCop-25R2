import {
	PXScreen, createSingle, createCollection, graphInfo, PXView, PXFieldState, PXFieldOptions, columnConfig, gridConfig, GridPreset, TextAlign
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.GL.GLAccessByAccount", primaryView: "Account" })
export class GL104020 extends PXScreen {

	Account = createSingle(Account);
	Groups = createCollection(Groups);
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class Groups extends PXView {

	@columnConfig({ textAlign: TextAlign.Center, allowCheckAll: true })
	Included: PXFieldState;

	@columnConfig({ hideViewLink: true })
	GroupName: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState;
	GroupType: PXFieldState;
}

export class Account extends PXView {

	AccountCD: PXFieldState;
	Type: PXFieldState;
	Description: PXFieldState;
	AccountClassID: PXFieldState;
	CuryID: PXFieldState;
}
