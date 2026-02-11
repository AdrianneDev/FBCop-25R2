import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_CopyOrder extends SO301000 { }
export class SO301000_CopyOrder {
	CheckCopyParams: PXActionState;

	@viewInfo({ containerName: "Copy To" })
	copyparamfilter = createSingle(CopyParamFilter);
}

export class CopyParamFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcUnitPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalcDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	AMIncludeEstimate: PXFieldState<PXFieldOptions.CommitChanges>;
	CopyConfigurations: PXFieldState<PXFieldOptions.CommitChanges>;
}