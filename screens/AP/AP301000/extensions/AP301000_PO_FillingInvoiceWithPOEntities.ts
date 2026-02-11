import { AP301000 } from "../AP301000";
import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	createCollection,
	columnConfig,
	GridColumnShowHideMode,
	viewInfo,
	gridConfig,
	GridPreset,
	linkCommand
} from "client-controls";

export interface AP3010000_PO_FillingInvoiceWithPOEntities extends AP301000 { }
export class AP3010000_PO_FillingInvoiceWithPOEntities {

	// PX.Objects.PO.GraphExtensions.APInvoiceSmartPanel*

	@viewInfo({containerName: "Add PO Receipt -> OrderNbr"})
	filter = createSingle(POReceiptFilter);

	@viewInfo({containerName: "Add PO Receipt"})
	poreceiptslist = createCollection(POReceipt);

	@viewInfo({containerName: "Add PO Order"})
	poorderslist = createCollection(POReceipt2); //different columns order

	@viewInfo({containerName: "Add Receipt Line"})
	poReceiptLinesSelection = createCollection(POReceiptLineAdd);

	@viewInfo({containerName: "Add PO Line -> OrderNbr"})
	orderfilter = createSingle(POOrderFilter);

	@viewInfo({containerName: "Add Subcontract"})
	Subcontracts = createCollection(POOrderRS);

	@viewInfo({containerName: "Add PO Line"})
	poorderlineslist = createCollection(POOrderRS2); //different columns order

	@viewInfo({containerName: "Add LC -> LandedCostDocRefNbr"})
	landedCostFilter = createSingle(POLandedCostDetailFilter);

	@viewInfo({containerName: "Add LC"})
	LandedCostDetailsAdd = createCollection(POLandedCostDetailS);

	@viewInfo({containerName: "Link Line -> Landed Cost"})
	LinkLineLandedCostDetail = createCollection(POLandedCostDetailS2);

	@viewInfo({containerName: "Link Line"})
	linkLineFilter = createSingle(LinkLineFilter);

	@viewInfo({containerName: "Link Line -> Receipt"})
	linkLineReceiptTran = createCollection(POReceiptLineS);

	@viewInfo({containerName: "Link Line -> Order"})
	linkLineOrderTran = createCollection(POLineS);

	@viewInfo({ containerName: "Add Subcontract Line" })
	SubcontractLines = createCollection(POLineRS2);
}

export class POReceiptFilter extends PXView {

	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.Details })
export class POReceipt extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	ReceiptNbr: PXFieldState;
	ReceiptType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	ReceiptDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	OrderQty: PXFieldState;
	UnbilledQty: PXFieldState;
	CuryOrderTotal: PXFieldState;

	OrderNbr: PXFieldState;
	OrderType: PXFieldState;
	OrderDate: PXFieldState;
	UnbilledOrderQty: PXFieldState;
	CuryUnbilledOrderTotal: PXFieldState;

}

@gridConfig({ preset: GridPreset.Details })
export class POReceipt2 extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	OrderNbr: PXFieldState;

	OrderType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	OrderDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryOrderTotal: PXFieldState;
	UnbilledOrderQty: PXFieldState;
	CuryUnbilledOrderTotal: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class POReceiptLineAdd extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false, allowShowHide: GridColumnShowHideMode.False })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOOrderReceiptLinesSelection")
	PONbr: PXFieldState;

	POType: PXFieldState;

	@linkCommand("ViewReceiptReceiptLinesSelection")
	ReceiptNbr: PXFieldState;

	POReceipt__InvoiceNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	LineNbr: PXFieldState;
	CuryID: PXFieldState;
	ReceiptQty: PXFieldState;
	CuryExtCost: PXFieldState;
	UnbilledQty: PXFieldState;
	TranDesc: PXFieldState;
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	POReceipt__VendorLocationID: PXFieldState;

}

export class POOrderFilter extends PXView {

	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SubcontractNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowBilledLines: PXFieldState<PXFieldOptions.CommitChanges>;
	ShowUnbilledLines: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class POOrderRS extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false, allowShowHide: GridColumnShowHideMode.False })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewSubcontractFromSubcontracts")
	SubcontractNbr: PXFieldState;

	POLine__ProjectID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	OrderDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	SubcontractTotal: PXFieldState;
	SubcontractBilledQty: PXFieldState;
	CurySubcontractBilledTotal: PXFieldState;

	ReceiptNbr: PXFieldState;
	ReceiptType: PXFieldState;
	ReceiptDate: PXFieldState;
	UnbilledQty: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class POOrderRS2 extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOOrderAddPOLine")
	OrderNbr: PXFieldState;

	OrderType: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	OrderDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	CuryLineAmt: PXFieldState;

	UnbilledQty: PXFieldState;

	CuryUnbilledAmt: PXFieldState;

	LineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState<PXFieldOptions.Hidden>;

}

export class POLandedCostDetailFilter extends PXView {

	LandedCostDocRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	LandedCostCodeID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceiptType: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceiptNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class POLandedCostDetailS extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	DocType: PXFieldState;

	@linkCommand("ViewLandedCostDetailsAdd")
	RefNbr: PXFieldState;

	VendorRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LandedCostCodeID: PXFieldState;

	Descr: PXFieldState;
	CuryLineAmt: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	TaxCategoryID: PXFieldState;


}

@gridConfig({ preset: GridPreset.Details })
export class POLandedCostDetailS2 extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	DocType: PXFieldState;
	RefNbr: PXFieldState;
	LineNbr: PXFieldState;
	VendorRefNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LandedCostCodeID: PXFieldState;

	Descr: PXFieldState;
	CuryLineAmt: PXFieldState;
	INDocType: PXFieldState;
	INRefNbr: PXFieldState;

}


export class LinkLineFilter extends PXView {

	POOrderNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	UOM: PXFieldState;
	SelectedMode: PXFieldState<PXFieldOptions.CommitChanges>;

}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class POReceiptLineS extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@linkCommand("ViewPOOrderLinkLineReceiptTran")
	PONbr: PXFieldState;

	POType: PXFieldState;

	@linkCommand("ViewReceiptLinkLineReceiptTran")
	ReceiptNbr: PXFieldState;

	POReceipt__InvoiceNbr: PXFieldState;
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	LineNbr: PXFieldState;
	CuryID: PXFieldState;

	ReceiptQty: PXFieldState;
	CuryExtCost: PXFieldState;
	UnbilledQty: PXFieldState;
	TranDesc: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly })
export class POLineS extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	POOrder__OrderNbr: PXFieldState;
	POOrder__OrderType: PXFieldState;
	LineNbr: PXFieldState;
	POOrder__VendorRefNbr: PXFieldState;
	SubItemID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	POOrder__CuryID: PXFieldState;

	OrderQty: PXFieldState;
	curyLineAmt: PXFieldState;
	UnbilledQty: PXFieldState;
	CuryUnbilledAmt: PXFieldState;
	TranDesc: PXFieldState;

}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class POLineRS2 extends PXView {

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	@linkCommand("ViewSubcontractFromSubcontractLines")
	SubcontractNbr: PXFieldState;

	LineNbr: PXFieldState;
	ProjectID: PXFieldState;
	TaskID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CostCodeID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	VendorLocationID: PXFieldState;

	SubcontractDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	CuryID: PXFieldState;

	InventoryID: PXFieldState;
	CuryLineAmt: PXFieldState;
	UnbilledQty: PXFieldState;
	CuryUnbilledAmt: PXFieldState;
	BilledQty: PXFieldState;
	CuryBilledAmt: PXFieldState;
}
