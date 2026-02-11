import { PXFieldState, PXFieldOptions, PXView, createCollection, gridConfig, GridPreset, PXActionState, linkCommand, columnConfig, GridFastFilterVisibility } from "client-controls";
import {
	RQ301000,
	RQRequest as RQRequest_Base,
	RQRequestLine as RQRequestLine_Base
} from "src/screens/RQ/RQ301000/RQ301000";

export interface RQ301000_Extension extends RQ301000 {}
export class RQ301000_Extension {
	// Custom views for tabs
	NotesLog = createCollection(ICFBNotelogs);
	FileDetails = createCollection(ICFBFileDetails);
	TransactionHistory = createCollection(RQRequestTransactionHistory);
}

// Extend the RQRequest view class to add custom fields
export interface RQRequest extends RQRequest_Base {}
export class RQRequest {
	UsrICFBTotalPotentialLoss: PXFieldState<PXFieldOptions.CommitChanges>;
	UsrICFBIsProject: PXFieldState;
}

// Extend the RQRequestLine view class to add custom grid columns
export interface RQRequestLine extends RQRequestLine_Base {}
export class RQRequestLine {
	// UsrSelected: PXFieldState<PXFieldOptions.CommitChanges>;
	UsrICFBMovingAve: PXFieldState<PXFieldOptions.CommitChanges>;
	UsrICFBSellingPrice: PXFieldState<PXFieldOptions.CommitChanges>;
	UsrICFBPotentialLoss: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrICIRNegativeQty: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrTaskID: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrFromSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrCodeDate: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrRemarksDisposition: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrFromLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrToSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrReasonCode: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrQtyIssued: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrQtyTransferred: PXFieldState<PXFieldOptions.CommitChanges>;
	
	// @linkCommand("viewTransaction")
	// UsrRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	
	// @linkCommand("viewTransfer")
	// UsrTransRefNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	
	// @linkCommand("viewReceipt")
	// UsrReceiptNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	
	// @linkCommand("viewAdjustment")
	// UsrAdjustmentNbr: PXFieldState<PXFieldOptions.CommitChanges>;
	
	// UsrIssued: PXFieldState<PXFieldOptions.CommitChanges>;
	// UsrTransferred: PXFieldState<PXFieldOptions.CommitChanges>;
}

// Notes Log view for tab
@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowUpdate: false,
	showFastFilter: GridFastFilterVisibility.False,
})
export class ICFBNotelogs extends PXView {
	Date_Date: PXFieldState;
	Date_Time: PXFieldState;
	UserID: PXFieldState;
	UserName: PXFieldState;
	Comments: PXFieldState;
}

// Transaction History view for tab
@gridConfig({
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False,
	preset: GridPreset.ReadOnly,
})
export class RQRequestTransactionHistory extends PXView {
	TranType: PXFieldState;
	
	@linkCommand("viewHistory")
	RefNbr: PXFieldState;
	
	TranDate: PXFieldState;
	Status: PXFieldState;
}

// File Details view for Hyperlink tab
@gridConfig({
	syncPosition: true,
	showFastFilter: GridFastFilterVisibility.False,
	preset: GridPreset.Details,
})
export class ICFBFileDetails extends PXView {
	GoToUrl: PXActionState;
	
	DocumentUrl: PXFieldState;
	DocumentNotes: PXFieldState;
	
	@linkCommand("GoToUrl")
	AttachmentLink: PXFieldState<PXFieldOptions.CommitChanges>;
	
	FileLocation: PXFieldState;
}
