import { PXFieldState, PXFieldOptions } from "client-controls";
import { LocationsBase, LocationDetail } from "src/screens/CR/common/tabs/tab-locations/tab-locations";
import { CR303000 } from "../CR303000";

export interface CR303000_Locations extends CR303000, LocationsBase {}
export class CR303000_Locations extends LocationsBase {}

export interface CR303000_LocationDetail extends LocationDetail { }
export class CR303000_LocationDetail {
	CBranchID: PXFieldState<PXFieldOptions.Hidden>;
	CPriceClassID: PXFieldState<PXFieldOptions.Hidden>;
	CDefProjectID: PXFieldState<PXFieldOptions.Hidden>;
	TaxRegistrationID: PXFieldState<PXFieldOptions.Hidden>;
	CAvalaraExemptionNumber: PXFieldState<PXFieldOptions.Hidden>;
	CSiteID: PXFieldState<PXFieldOptions.Hidden>;
	CCarrierID: PXFieldState<PXFieldOptions.Hidden>;
	CShipTermsID: PXFieldState<PXFieldOptions.Hidden>;
	CShipZoneID: PXFieldState<PXFieldOptions.Hidden>;
	CFOBPointID: PXFieldState<PXFieldOptions.Hidden>;
	CResedential: PXFieldState<PXFieldOptions.Hidden>;
	CSaturdayDelivery: PXFieldState<PXFieldOptions.Hidden>;
	CInsurance: PXFieldState<PXFieldOptions.Hidden>;
	CShipComplete: PXFieldState<PXFieldOptions.Hidden>;
	COrderPriority: PXFieldState<PXFieldOptions.Hidden>;
	CLeadTime: PXFieldState<PXFieldOptions.Hidden>;
	CCalendarID: PXFieldState<PXFieldOptions.Hidden>;
}
