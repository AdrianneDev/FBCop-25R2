import { PXFieldState, PXFieldOptions, columnConfig } from "client-controls";
import { LocationsBase, LocationDetail } from "src/screens/CR/common/tabs/tab-locations/tab-locations";
import { AP303000 } from "../AP303000";

export interface AP303000_Locations extends AP303000, LocationsBase {}
export class AP303000_Locations extends LocationsBase {}

export interface AP303000_LocationDetail extends LocationDetail { }
export class AP303000_LocationDetail {
	@columnConfig({ hideViewLink: true })
	VExpenseAcctID: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	VExpenseSubID: PXFieldState<PXFieldOptions.Hidden | PXFieldOptions.CommitChanges>;

	VBranchID: PXFieldState<PXFieldOptions.Hidden>;
	VBranchID_description: PXFieldState<PXFieldOptions.Hidden>;
	CreatedByID_Description: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedByID_Description: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	TaxRegistrationID: PXFieldState<PXFieldOptions.Hidden>;

	VTaxZoneID: PXFieldState;

	VTaxCalcMode: PXFieldState<PXFieldOptions.Hidden>;
	VSiteID: PXFieldState<PXFieldOptions.Hidden>;
	VCarrierID: PXFieldState<PXFieldOptions.Hidden>;
	VShipTermsID: PXFieldState<PXFieldOptions.Hidden>;
	VFOBPointID: PXFieldState<PXFieldOptions.Hidden>;
	VLeadTime: PXFieldState<PXFieldOptions.Hidden>;
	VAllowAPBillBeforeReceipt: PXFieldState<PXFieldOptions.Hidden>;
	VRcptQtyMin: PXFieldState<PXFieldOptions.Hidden>;
	VRcptQtyMax: PXFieldState<PXFieldOptions.Hidden>;
	VRcptQtyThreshold: PXFieldState<PXFieldOptions.Hidden>;
	VRcptQtyAction: PXFieldState<PXFieldOptions.Hidden>;
	VPaymentLeadTime: PXFieldState<PXFieldOptions.Hidden>;
	VPaymentMethodID: PXFieldState<PXFieldOptions.Hidden>;
}
