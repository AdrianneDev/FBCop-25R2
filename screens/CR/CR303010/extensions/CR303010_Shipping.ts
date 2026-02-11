import { CR303010 } from "../CR303010";
import {
	PXView,
	PXFieldState,
	createSingle,
	PXFieldOptions,
	viewInfo,
	controlConfig,
	ISelectorControlConfig,
} from "client-controls";

export interface CR303010_Shipping extends CR303010 {}
export class CR303010_Shipping {

	@viewInfo({ containerName: "Shipping" })
	LocationCurrent = createSingle(Location);
}

export class Location extends PXView {
	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CBranchID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CPriceClassID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CDefProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxRegistrationID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CTaxZoneID: PXFieldState<PXFieldOptions.CommitChanges>;
	CTaxCalcMode: PXFieldState;
	CAvalaraExemptionNumber: PXFieldState;
	CAvalaraCustomerUsageType: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CSiteID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CCarrierID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CShipTermsID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CShipZoneID: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CFOBPointID: PXFieldState;
	CResedential: PXFieldState;
	CSaturdayDelivery: PXFieldState;
	CInsurance: PXFieldState;
	CAdditionalHandling: PXFieldState;
	CGroundCollect: PXFieldState;
	CShipComplete: PXFieldState;
	COrderPriority: PXFieldState;
	CLeadTime: PXFieldState;
	@controlConfig<ISelectorControlConfig>({ allowEdit: true })
	CCalendarID: PXFieldState;
	CLiftGate: PXFieldState;
	CInsideDelivery: PXFieldState;
	CLimitedAccess: PXFieldState;
}
