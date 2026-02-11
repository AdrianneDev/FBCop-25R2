import {
	AR201000
} from "../AR201000";

import {
	PXView,
	createCollection,
	PXFieldState,
	PXFieldOptions,
	featureInstalled,
	columnConfig,
	gridConfig,
	GridPreset,
	localizable,
} from "client-controls";


export interface AR201000_ServiceBilling extends AR201000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+ServiceManagementModule")
export class AR201000_ServiceBilling {
	BillingCycles = createCollection(FSCustomerClassBillingSetup);
}

@gridConfig({ preset: GridPreset.Details })
export class FSCustomerClassBillingSetup extends PXView {
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;
	BillingCycleID: PXFieldState<PXFieldOptions.CommitChanges>;
	SendInvoicesTo: PXFieldState<PXFieldOptions.CommitChanges>;
	BillShipmentSource: PXFieldState;
	FrequencyType: PXFieldState<PXFieldOptions.CommitChanges>;
}
