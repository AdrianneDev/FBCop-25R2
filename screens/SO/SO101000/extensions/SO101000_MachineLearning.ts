import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	featureInstalled,
	gridConfig,
	GridPreset,
	GridAutoGrowMode,
} from "client-controls";
import { SO101000 } from "../SO101000";

export interface SO101000_MachineLearning extends SO101000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+RelatedItemAssistant")

export class SO101000_MachineLearning {
	@viewInfo({ containerName: "Cross-Sell Assistant Settings" })
	mlcrosssalessetup = createSingle(MLCrossSalesSetup);

	@viewInfo({ containerName: "Excluded Item Classes" })
	MLExcludedItemClasses = createCollection(SOSetupCrossSellExcludedItemClasses);

	@viewInfo({ containerName: "Excluded Order Types" })
	MLExcludedOrderTypes = createCollection(SOSetupCrossSellExcludedOrderType);
}

export class MLCrossSalesSetup extends PXView {
	DataPeriodForAnalysis: PXFieldState;
	MinRelevanceScorePercent: PXFieldState<PXFieldOptions.CommitChanges>;
	MaxNumberOfSuggestions: PXFieldState;
	AddRelationsAsActive: PXFieldState;
	GeneratedSuggestionNotification: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class SOSetupCrossSellExcludedItemClasses extends PXView {
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	INItemClass__Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fill,
})
export class SOSetupCrossSellExcludedOrderType extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	SOOrderType__Descr: PXFieldState;
}
