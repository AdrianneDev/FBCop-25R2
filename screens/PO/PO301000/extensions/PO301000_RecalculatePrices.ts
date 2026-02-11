import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { PO301000 } from "../PO301000";

export interface PO301000_RecalculatePrices extends PO301000 { }
export class PO301000_RecalculatePrices {
	RecalcOk: PXActionState;

	@viewInfo({ containerName: "Recalculate Prices" })
	recalcdiscountsfilter = createSingle(RecalcDiscountsParamFilter);
}

export class RecalcDiscountsParamFilter extends PXView {
	RecalcTarget: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDocGroupDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}