import { CR304500 } from "../CR304500";
import {
	PXView,
	PXFieldState,
	linkCommand,
	createCollection,
	PXFieldOptions,
	gridConfig,
	viewInfo,
	createSingle,
} from "client-controls";

export interface CR304500_AddEstimate extends CR304500 {}
export class CR304500_AddEstimate {

	@viewInfo({ containerName: "Dialog: Add Estimate" })
	OrderEstimateItemFilter = createSingle(AMEstimateItem);
}

export class AMEstimateItem extends PXView {
	EstimateID: PXFieldState<PXFieldOptions.CommitChanges>;
	AddExisting: PXFieldState<PXFieldOptions.CommitChanges>;
	RevisionID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryCD: PXFieldState<PXFieldOptions.CommitChanges>;
	IsNonInventory: PXFieldState;
	SubItemID: PXFieldState;
	SiteID: PXFieldState;
	ItemDesc: PXFieldState<PXFieldOptions.CommitChanges>;
	EstimateClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	ItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState<PXFieldOptions.CommitChanges>;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
}
