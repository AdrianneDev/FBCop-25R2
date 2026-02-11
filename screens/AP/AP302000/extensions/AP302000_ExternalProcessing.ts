import { AP302000, CurrentDocument } from "../AP302000";
import {
	PXView, createCollection, PXFieldState, PXFieldOptions, featureInstalled,
	createSingle, gridConfig, GridPreset, PXActionState, columnConfig, fieldConfig,
	viewInfo,
} from "client-controls";

export interface AP302000_ExternalProcessing extends AP302000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+PaymentProcessor")
export class AP302000_ExternalProcessing {

	@viewInfo({ containerName: "External Processing" })
	ExternalPaymentTrans = createCollection(APPaymentProcessorPaymentTran);
}

@gridConfig({ preset: GridPreset.ReadOnly })
export class APPaymentProcessorPaymentTran extends PXView {

	TranNbr: PXFieldState;
	ExternalPaymentProcessorID: PXFieldState;
	ExternalPaymentID: PXFieldState;
	Status: PXFieldState;
	TransactionState: PXFieldState;
	TranDesc: PXFieldState;
	ExternalUserID: PXFieldState;
	processDate: PXFieldState;
	FundingAcctID: PXFieldState;
	FundingCuryID: PXFieldState;
	DisbursementType: PXFieldState;
	DisbursementAmount: PXFieldState;
	DisbursementCuryID: PXFieldState;
	DisbursementArriveDate: PXFieldState;
	ExternalVendorID: PXFieldState;
	BillingType: PXFieldState;
	TransactionNumber: PXFieldState;
	ExternalUpdatedDateTime: PXFieldState;
	ExternalComment: PXFieldState;
}
