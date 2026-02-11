import {
	createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo,
	PXView, PXFieldState, gridConfig,
	PXFieldOptions, columnConfig, controlConfig, GridPreset,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.AR.CustomerLocationMaint", primaryView: "Location", showUDFIndicator: true, bpEventsIndicator: true })
export class AR303020 extends PXScreen {
	ViewOnMap: PXActionState;

   	@viewInfo({containerName: "Location Summary"})
	Location = createSingle(Location);

	@viewInfo({containerName: "Location"})
	LocationCurrent = createSingle(Location2);

	@viewInfo({containerName: "Location Address"})
		  Address = createSingle(Address);

	@viewInfo({containerName: "Additional Location Info"})
		  Contact = createSingle(Contact);

   	@viewInfo({containerName: "GL Accounts"})
		  ARAccountSubLocation = createSingle(LocationARAccountSub);

   	@viewInfo({containerName: "Contacts"})
		  RoleAssignments = createCollection(BCRoleAssignment);
}

export class Location extends PXView  {

	@controlConfig({ allowEdit: true })
	BAccountID: PXFieldState;

	@controlConfig({ displayMode: "id" })
	LocationCD: PXFieldState;

	Status: PXFieldState;
	IsDefault: PXFieldState;

}

export class Location2 extends PXView {

	Descr: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideContact: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CBranchID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CPriceClassID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CDefProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	TaxRegistrationID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CTaxZoneID: PXFieldState;

	CTaxCalcMode: PXFieldState;
	CAvalaraExemptionNumber: PXFieldState;
	CAvalaraCustomerUsageType: PXFieldState;

	@controlConfig({ allowEdit: true })
	CSiteID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CCarrierID: PXFieldState<PXFieldOptions.CommitChanges>;

	@controlConfig({ allowEdit: true })
	CShipTermsID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CShipZoneID: PXFieldState;

	@controlConfig({ allowEdit: true })
	CFOBPointID: PXFieldState;

	CResedential: PXFieldState;
	CSaturdayDelivery: PXFieldState;
	CInsurance: PXFieldState;
	CAdditionalHandling: PXFieldState;
	CGroundCollect: PXFieldState;
	CShipComplete: PXFieldState;
	COrderPriority: PXFieldState;
	CLiftGate: PXFieldState;
	CInsideDelivery: PXFieldState;
	CLimitedAccess: PXFieldState;

	@controlConfig({ nullText: "0"})
	CLeadTime: PXFieldState;
	ExtRefNbr: PXFieldState;

	@controlConfig({ allowEdit: true })
	CCalendarID: PXFieldState;

	IsARAccountSameAsMain: PXFieldState<PXFieldOptions.CommitChanges>;
	CSalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CSalesSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CDiscountAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CDiscountSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CFreightAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CFreightSubID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class LocationARAccountSub extends PXView  {

	CARAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	CARSubID: PXFieldState<PXFieldOptions.CommitChanges>;
	CRetainageAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	CRetainageSubID: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({ preset: GridPreset.Details, adjustPageSize: true })
export class BCRoleAssignment extends PXView  {

	ContactID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	Role: PXFieldState;
}