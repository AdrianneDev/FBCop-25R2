import {
	createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXView, PXFieldState, headerDescription, gridConfig, GridPreset, PXFieldOptions
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FA.BonusMaint", primaryView: "Bonuses", })
export class FA208000 extends PXScreen {

	@viewInfo({ containerName: "Bonus Summary" })
	Bonuses = createSingle(FABonus);

	@viewInfo({ containerName: "Details" })
	Details = createCollection(FABonusDetails);
}

export class FABonus extends PXView {

	BonusCD: PXFieldState;

	@headerDescription
	Description: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class FABonusDetails extends PXView {

	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	BonusPercent: PXFieldState<PXFieldOptions.CommitChanges>;
	BonusMax: PXFieldState<PXFieldOptions.CommitChanges>;

}
