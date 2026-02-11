import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_RecalculatePrices extends SO301000 { }
export class SO301000_RecalculatePrices {
	RecalcOk: PXActionState;

	@viewInfo({ containerName: "Recalculate Prices" })
	recalcdiscountsfilter = createSingle(RecalcDiscountsFilter);
}

export class RecalcDiscountsFilter extends PXView {
	RecalcTarget: PXFieldState;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDocGroupDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	CalcDiscountsOnLinesWithDisabledAutomaticDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}