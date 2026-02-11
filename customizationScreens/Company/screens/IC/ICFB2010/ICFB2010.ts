import { Messages as SysMessages } from "client-controls/services/messages";
import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, actionConfig, RowSelectedHandlerArgs, PXViewCollection, PXPageLoadBehavior, ControlParameter, PXView, PXFieldState, gridConfig, treeConfig, fieldConfig, controlConfig, headerDescription, ICurrencyInfo, disabled, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset, GridFilterBarVisibility, GridFastFilterVisibility, ISelectorControlConfig } from "client-controls";

@graphInfo({graphType: "ICFBCustomization.Graph.Profile.ICFBFarmerMaint", primaryView: "Document", })
export class ICFB2010 extends PXScreen {

	Document = createSingle(ICFBFarmer);
	CurrentDocument = createSingle(ICFBFarmer2);
	FileDetails = createCollection(ICFBFileDetails);
	
	GoToUrl: PXActionState;
}// Views

export class ICFBFarmer extends PXView  {
	FarmerID : PXFieldState;
	Status : PXFieldState;
}

export class ICFBFarmer2 extends PXView  {
	AccountName : PXFieldState;
	FirstName : PXFieldState;
	LastName : PXFieldState;
	AddressLine1 : PXFieldState<PXFieldOptions.CommitChanges>;
	AddressLine2 : PXFieldState<PXFieldOptions.CommitChanges>;
	City : PXFieldState<PXFieldOptions.CommitChanges>;
	State : PXFieldState<PXFieldOptions.CommitChanges>;
	PostalCode : PXFieldState<PXFieldOptions.CommitChanges>;
	Country : PXFieldState<PXFieldOptions.CommitChanges>;
	Business1 : PXFieldState;
	Business2 : PXFieldState;
	Fax : PXFieldState;
	AccountEmail : PXFieldState<PXFieldOptions.CommitChanges>;
	Web : PXFieldState<PXFieldOptions.CommitChanges>;
	ExternalRefNbr : PXFieldState;
	CoconutType : PXFieldState;
	DateCertified : PXFieldState;
	TraderName : PXFieldState<PXFieldOptions.CommitChanges>;
	SubTraderName : PXFieldState<PXFieldOptions.CommitChanges>;
	PlotNo : PXFieldState;
	AreaInspected : PXFieldState;
	CertifiableHectarage : PXFieldState;
	FBT : PXFieldState;
	NutperTree : PXFieldState;
	YieldNutYear : PXFieldState;
	YieldNut45Days : PXFieldState;
	CertificationUnitEU : PXFieldState;
	CertificationUnitUSDA : PXFieldState;
	Cluster : PXFieldState;
	FarmTradeGroup : PXFieldState;
}

export class ICFBFileDetails extends PXView {
	DocumentUrl: PXFieldState;
	DocumentNotes: PXFieldState;
	AttachmentLink: PXFieldState<PXFieldOptions.CommitChanges>;
	FileLocation: PXFieldState;
}