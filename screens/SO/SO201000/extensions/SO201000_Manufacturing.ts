import {
	PXFieldState,
	PXFieldOptions
} from "client-controls";
import { SO201000, SOOrderTypeHeaderSettings } from "../SO201000";

export interface SO201000_Manufacturing extends SO201000 { }
export class SO201000_Manufacturing {
}

export interface SOOrderTypeHeaderSettingsAM extends SOOrderTypeHeaderSettings { }
export class SOOrderTypeHeaderSettingsAM {
	AMIncludeSupplyPlan: PXFieldState;
	AMEstimateEntry: PXFieldState<PXFieldOptions.CommitChanges>;
	AMConfigurationEntry: PXFieldState;
	AMEnableWarehouseLinkedProduction: PXFieldState;
	AMMTOOrder: PXFieldState;
	AMEnableLinkingProdOrders: PXFieldState<PXFieldOptions.CommitChanges>;
	AMLinkableSOStatuses: PXFieldState<PXFieldOptions.CommitChanges>;
}
