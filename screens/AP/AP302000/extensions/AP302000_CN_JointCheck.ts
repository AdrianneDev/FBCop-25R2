import { AP302000 } from "../AP302000";
import {
	PXView, PXFieldState, createCollection, columnConfig, gridConfig, createSingle, featureInstalled, GridPreset,
	PXFieldOptions,
	viewInfo
} from "client-controls";

export interface AP302000_CN_JointCheck extends AP302000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+Construction")
export class AP302000_CN_JointCheck {

	// PX.Objects.CN.JointChecks.APPaymentEntryJointCheck AP302000_CN_JointCheck

	@viewInfo({containerName: "Select Joint Payee"})
	BillWithJointPayee = createCollection(BillWithJointPayee);

	@viewInfo({containerName: "Payment Summary -> SelectedJointPayee"})
	SelectedJointPayee = createSingle(JointPayeeDisplay);

	@viewInfo({containerName: "Select Joint Payee -> RefNbr"})
	BillWithJointPayeeFilter = createSingle(BillWithJointPayeeFilter);

}

export class JointPayeeDisplay extends PXView {

	Name: PXFieldState<PXFieldOptions.Disabled>;

}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false,
	allowUpdate: false
})
export class BillWithJointPayee extends PXView {

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	RefNbr: PXFieldState;
	LineNbr: PXFieldState;
	Name: PXFieldState;
	CuryJointAmountOwed: PXFieldState;
	CuryJointAmountPaid: PXFieldState;
	CuryBalance: PXFieldState;

}

export class BillWithJointPayeeFilter extends PXView {

	RefNbr: PXFieldState<PXFieldOptions.CommitChanges>;

}
