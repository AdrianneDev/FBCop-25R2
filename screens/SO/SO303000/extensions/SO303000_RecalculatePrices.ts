import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { SO303000 } from "../SO303000";

export interface SO303000_RecalculatePrices extends SO303000 { }
export class SO303000_RecalculatePrices {
	RecalcOk: PXActionState;

	@viewInfo({ containerName: "Recalculate Prices" })
	recalcdiscountsfilter = createSingle(RecalcDiscountsParamFilter);
}

export class RecalcDiscountsParamFilter extends PXView {
	RecalcTarget: PXFieldState;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDocGroupDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}