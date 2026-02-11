import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createCollection,
	createSingle,
	controlConfig,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
    commitChanges
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({
	graphType: "PX.Objects.IN.INSiteMaint",
	primaryView: "site",
	showActivitiesIndicator: true
})
export class IN204000 extends PXScreen {
	ViewOnMap: PXActionState;

	@viewInfo({containerName: "Specify New ID"})
	@viewInfo({containerName: "Warehouse Summary"})
	site = createSingle(INSite);

	@viewInfo({containerName: "Accounts"})
	siteaccounts = createSingle(INSiteAccounts);

	@viewInfo({containerName: "Location Table"})
	location = createCollection(INLocation);

	@viewInfo({containerName: "Address"})
	Contact = createSingle(Contact);

	@viewInfo({containerName: "Address"})
	Address = createSingle(Address);
}

export class INSite extends PXView {
	SiteCD: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReplenishmentClassID: PXFieldState;
	Active: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
	LocationValid: PXFieldState;
	AvgDefaultCost: PXFieldState;
	FIFODefaultCost: PXFieldState;
}

export class INSiteAccounts extends PXView {
	ReceiptLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ShipLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReturnLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DropShipLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	UseItemDefaultLocationForPicking: PXFieldState;
	NonStockPickingLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideInvtAccSub: PXFieldState;
	InvtAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	InvtSubID: PXFieldState;
	ReasonCodeSubID: PXFieldState;
	SalesAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	SalesSubID: PXFieldState;
	COGSAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	COGSSubID: PXFieldState;
	StdCstVarAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	StdCstVarSubID: PXFieldState;
	StdCstRevAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	StdCstRevSubID: PXFieldState;
	POAccrualAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	POAccrualSubID: PXFieldState;
	PPVAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	PPVSubID: PXFieldState;
	LCVarianceAcctID: PXFieldState<PXFieldOptions.CommitChanges>;
	LCVarianceSubID: PXFieldState;
	BuildingID: PXFieldState;
	CarrierFacility: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	pageSize: 50,
})
export class INLocation extends PXView {
	LocationCD: PXFieldState;
	Descr: PXFieldState;
	Active: PXFieldState;
	IsSorting: PXFieldState;
	InclQtyAvail: PXFieldState;
	IsCosted: PXFieldState;
	SalesValid: PXFieldState;
	ReceiptsValid: PXFieldState;
	TransfersValid: PXFieldState;
	AssemblyValid: PXFieldState;
	ProductionValid: PXFieldState;
	PickPriority: PXFieldState<PXFieldOptions.CommitChanges>;
	PathPriority: PXFieldState<PXFieldOptions.CommitChanges>;
	PrimaryItemValid: PXFieldState;
	PrimaryItemID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	PrimaryItemClassID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
}
