import { PXFieldState, PXFieldOptions, columnConfig } from "client-controls";
import { LocationsBase, LocationDetail } from "src/screens/CR/common/tabs/tab-locations/tab-locations";
import { AR303000 } from "../AR303000";

export interface AR303000_Locations extends AR303000, LocationsBase {}
export class AR303000_Locations extends LocationsBase {}

export interface AR303000_LocationDetail extends LocationDetail { }
export class AR303000_LocationDetail {
	CPriceClassID: PXFieldState;
	CreatedByID_Description: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByID_Description: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	CDefProjectID: PXFieldState<PXFieldOptions.Hidden>;
	TaxRegistrationID: PXFieldState<PXFieldOptions.Hidden>;
	CTaxZoneID: PXFieldState;
	CTaxCalcMode: PXFieldState<PXFieldOptions.Hidden>;
	CAvalaraExemptionNumber: PXFieldState<PXFieldOptions.Hidden>;
	CAvalaraCustomerUsageType: PXFieldState<PXFieldOptions.Hidden>;
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

	@columnConfig({ hideViewLink: true })
	CSalesAcctID: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	CSalesSubID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CARAccountID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CARSubID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CDiscountAcctID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CDiscountSubID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CFreightAcctID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CFreightSubID: PXFieldState<PXFieldOptions.Hidden>;

	CBranchID: PXFieldState;
	CBranchID_description: PXFieldState<PXFieldOptions.Hidden>;
}
