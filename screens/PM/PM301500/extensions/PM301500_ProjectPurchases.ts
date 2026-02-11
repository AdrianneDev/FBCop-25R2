import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState, GridFastFilterVisibility, linkCommand, PXFieldOptions, controlConfig, featureInstalled, FeaturesSet, GridNoteFilesShowMode, columnConfig } from "client-controls";
import { PM301500 } from "../PM301500";

export interface PM301500_ProjectPurchases extends PM301500 { }
@featureInstalled(FeaturesSet.Construction)
export class PM301500_ProjectPurchases {
	PurchaseOrders = createCollection(POOrder);
	Subcontracts = createCollection(Subcontract);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class POOrder extends PXView {
	CreatePurchaseOrder: PXActionState;
	CreateDropShipOrder: PXActionState;

	OrderType: PXFieldState;
	OrderNbr: PXFieldState;
	Status: PXFieldState;
	OrderDate: PXFieldState;
	ExpectedDate: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	VendorID: PXFieldState;
	VendorID_description: PXFieldState;
	OrderDesc: PXFieldState<PXFieldOptions.Hidden>;
	VendorRefNbr: PXFieldState<PXFieldOptions.Hidden>;
	SOOrderType: PXFieldState<PXFieldOptions.Hidden>;
	SOOrderNbr: PXFieldState<PXFieldOptions.Hidden>;
	OrderQty: PXFieldState;
	OpenOrderQty: PXFieldState;
	CuryOrderTotal: PXFieldState;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	CuryID: PXFieldState;
	@columnConfig({hideViewLink: true})
	OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	BranchID: PXFieldState<PXFieldOptions.Hidden>;
	BranchID_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState;
	UnbilledOrderQty: PXFieldState;
	CuryUnbilledOrderTotal: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class Subcontract extends PXView {
	CreateSubcontract: PXActionState;

	OrderNbr: PXFieldState;
	OrderDate: PXFieldState;
	@columnConfig({hideViewLink: true})
	VendorID: PXFieldState;
	VendorID_description: PXFieldState;
	OrderQty: PXFieldState;
	CuryOrderTotal: PXFieldState;
	@columnConfig({hideViewLink: true})
	CuryID: PXFieldState;
	Status: PXFieldState;
	VendorRefNbr: PXFieldState<PXFieldOptions.Hidden>;
	CuryTaxTotal: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	OwnerID: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	LastModifiedByID: PXFieldState<PXFieldOptions.Hidden>;
	LastModifiedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	CreatedDateTime: PXFieldState<PXFieldOptions.Hidden>;
	OrderDesc: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	CreatedByID: PXFieldState<PXFieldOptions.Hidden>;
	ExpectedDate: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({hideViewLink: true})
	BranchID: PXFieldState<PXFieldOptions.Hidden>;
	BranchID_description: PXFieldState<PXFieldOptions.Hidden>;
	CuryUnbilledOrderTotal: PXFieldState;
}