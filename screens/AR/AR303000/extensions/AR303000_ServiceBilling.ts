import { AR303000, Customer } from "../AR303000";
import { featureInstalled, createCollection, PXView, PXFieldState, PXFieldOptions, gridConfig, GridPreset, viewInfo } from "client-controls";

export interface AR303000_ServiceBilling extends AR303000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+ServiceManagementModule")
export class AR303000_ServiceBilling {

	@viewInfo({containerName: "Service Billing"})
	CustomerBillingCycles = createCollection(CustomerBillingCycles);

}

export interface Customer_ServiceBilling extends Customer { }
@featureInstalled("PX.Objects.CS.FeaturesSet+ServiceManagementModule")
export class Customer_ServiceBilling {
	ChkServiceManagement: PXFieldState;
}

@gridConfig({ preset: GridPreset.Details, initNewRow: true })
export class CustomerBillingCycles extends PXView {
	SrvOrdType: PXFieldState<PXFieldOptions.CommitChanges>;
	BillingCycleID: PXFieldState<PXFieldOptions.CommitChanges>;
	SendInvoicesTo: PXFieldState<PXFieldOptions.CommitChanges>;
	BillShipmentSource: PXFieldState<PXFieldOptions.CommitChanges>;
	FrequencyType: PXFieldState<PXFieldOptions.CommitChanges>;
	WeeklyFrequency: PXFieldState;
	MonthlyFrequency: PXFieldState;
}

