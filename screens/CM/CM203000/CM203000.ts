import { createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, PXFieldOptions, columnConfig, GridColumnShowHideMode, gridConfig, GridPreset } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CM.TranslationDefinitionMaint", primaryView: "TranslDefRecords", })
export class CM203000 extends PXScreen {

	TranslDefRecords = createSingle(TranslDef);
	TranslDefDetailsRecords = createCollection(TranslDefDet);

}

export class TranslDef extends PXView {
	TranslDefId: PXFieldState;
	SourceLedgerId: PXFieldState<PXFieldOptions.CommitChanges>;
	DestLedgerId: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState;
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	SourceCuryID: PXFieldState<PXFieldOptions.Disabled>;
	DestCuryID: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.Details })
export class TranslDefDet extends PXView {
	@columnConfig({ hideViewLink: true })
	AccountIdFrom: PXFieldState;

	AccountIdFrom_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubIdFrom: PXFieldState;

	@columnConfig({ hideViewLink: true })
	AccountIdTo: PXFieldState;

	AccountIdTo_Account_description: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubIdTo: PXFieldState;

	CalcMode: PXFieldState <PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	RateTypeId: PXFieldState;

	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	TranslDefId: PXFieldState<PXFieldOptions.Hidden>;
}
