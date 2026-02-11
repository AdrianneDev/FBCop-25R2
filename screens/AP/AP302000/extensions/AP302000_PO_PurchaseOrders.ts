import { AP302000 } from "../AP302000";
import {
	PXView, createCollection, PXFieldState, PXFieldOptions, featureInstalled,
	createSingle, gridConfig, GridPreset, PXActionState, columnConfig, fieldConfig,
	viewInfo,
} from "client-controls";

export interface AP302000_PO_PurchaseOrders extends AP302000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+DistributionModule")
export class AP302000_PO_PurchaseOrders {

	// PX.Objects.PO.GraphExtensions.APPaymentEntryExt.POAdjustExtension

	@viewInfo({containerName: "Orders"})
	POAdjustments = createCollection(POAdjustments);

	@viewInfo({containerName: "Load Orders"})
	LoadOrders = createSingle(LoadOrders);

}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class POAdjustments extends PXView {

	LoadPOOrders: PXActionState;

	AdjdOrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjdOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	AdjdRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	POOrder__Status: PXFieldState;
	CuryAdjgAmt: PXFieldState;
	CuryAdjgBilledAmt: PXFieldState;
	POOrder__OrderDate: PXFieldState;
	POOrder__CuryUnprepaidTotal: PXFieldState;
	POOrder__CuryLineTotal: PXFieldState;

	@columnConfig({ hideViewLink: true })
	POOrder__CuryID: PXFieldState;

	Released: PXFieldState;
	IsRequest: PXFieldState;

}

export class LoadOrders extends PXView {

	BranchID: PXFieldState;
	FromDate: PXFieldState;
	StartOrderNbr: PXFieldState;
	MaxNumberOfDocuments: PXFieldState;

	@fieldConfig({
		controlType: "qp-radio",
		controlConfig: {
			class: "vertical"
		},
	})
	OrderBy: PXFieldState;

	ToDate: PXFieldState;
	EndOrderNbr: PXFieldState;

}
