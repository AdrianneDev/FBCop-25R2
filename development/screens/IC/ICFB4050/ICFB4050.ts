import { 
	createCollection, createSingle, PXScreen, graphInfo, PXView, PXFieldState, 
	PXFieldOptions, gridConfig, GridPreset, PXActionState, columnConfig, linkCommand
} from "client-controls";

@graphInfo({
	graphType: "ICFBCustomization.Graph.Inquiry.ICFBSalesScheduleInq", 
	primaryView: "Filter"
})
export class ICFB4050 extends PXScreen {
	// Action for grid link command - only declared because used with @linkCommand
	viewSalesDocument: PXActionState;
	
	Filter = createSingle(ICFBSalesScheduleFilter);
	
	@gridConfig({ 
		preset: GridPreset.Inquiry
	})
	Schedule = createCollection(ICFBSalesScheduleResult);
}

export class ICFBSalesScheduleFilter extends PXView {
	OrgBAccountID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScheduleType: PXFieldState<PXFieldOptions.CommitChanges>;
	StartDate: PXFieldState<PXFieldOptions.CommitChanges>;
	EndDate: PXFieldState<PXFieldOptions.CommitChanges>;
	CustomerID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalGrossSales: PXFieldState<PXFieldOptions.Disabled>;
	TotalDiscount: PXFieldState<PXFieldOptions.Disabled>;
	TotalOutputVAT: PXFieldState<PXFieldOptions.Disabled>;
	TotalNetSales: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ 
	preset: GridPreset.Inquiry
})
export class ICFBSalesScheduleResult extends PXView {
	DocDate: PXFieldState;
	CustomerID: PXFieldState;
	CustomerName: PXFieldState;
	TaxRegistrationID: PXFieldState;
	Description: PXFieldState;
	@linkCommand("viewSalesDocument")
	RefNbr: PXFieldState;
	DocRefNbr: PXFieldState;
	Account: PXFieldState;
	AccountDescription: PXFieldState;
	GrossSales: PXFieldState;
	DiscountTotal: PXFieldState;
	OutputVAT: PXFieldState;
	NetSales: PXFieldState;
	TaxID: PXFieldState;
	RevenueType: PXFieldState;
	AddressLine1: PXFieldState;
	AddressLine2: PXFieldState;
	City: PXFieldState;
	CountryID: PXFieldState;
	FirstName: PXFieldState;
	MidName: PXFieldState;
	LastName: PXFieldState;
}
