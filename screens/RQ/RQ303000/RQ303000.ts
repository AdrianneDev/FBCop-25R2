import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	CurrencyInfo,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.RQ.RQBiddingEntry",
	primaryView: "Vendor",
	bpEventsIndicator: true
})
export class RQ303000 extends PXScreen {
	@viewInfo({ containerName: "Bidding Response" })
	Vendor = createSingle(RQBiddingVendorHeader);

	@viewInfo({ containerName: "Bidding Response General" })
	CurrentDocument = createSingle(RQBiddingVendor);

	@viewInfo({ containerName: "Bidding Details" })
	Lines = createCollection(RQRequisitionLineBidding);

	@viewInfo({ containerName: "Vendor Contact" })
	Remit_Contact = createSingle(Contact);

	@viewInfo({ containerName: "Vendor Address" })
	Remit_Address = createSingle(Address);

	_RQBiddingVendor_CurrencyInfo_ = createSingle(CurrencyInfo);
}

export class RQBiddingVendorHeader extends PXView {
	ReqNbr: PXFieldState;
	VendorID: PXFieldState;
	VendorLocationID: PXFieldState;
	EntryDate: PXFieldState;
	CuryID: PXFieldState<PXFieldOptions.CommitChanges>;
	TotalQuoteQty: PXFieldState<PXFieldOptions.Disabled>;
	CuryTotalQuoteExtCost: PXFieldState<PXFieldOptions.Disabled>;
}

export class RQBiddingVendor extends PXView {
	ExpireDate: PXFieldState;
	PromisedDate: PXFieldState;
	FOBPoint: PXFieldState;
	ShipVia: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class RQRequisitionLineBidding extends PXView {
	@columnConfig({ hideViewLink: true })
	InventoryID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SubItemID: PXFieldState;

	Description: PXFieldState;
	AlternateID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState;

	@columnConfig({ allowNull: false })
	OrderQty: PXFieldState;

	@columnConfig({ allowNull: false })
	MinQty: PXFieldState;

	@columnConfig({ allowNull: false })
	QuoteQty: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowNull: false })
	CuryQuoteUnitCost: PXFieldState<PXFieldOptions.CommitChanges>;

	QuoteNumber: PXFieldState;

	@columnConfig({ allowNull: false })
	CuryQuoteExtCost: PXFieldState;
}
