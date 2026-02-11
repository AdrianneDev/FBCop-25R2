import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	CurrencyInfo,
	PXScreen
} from "client-controls";

import {
	filter,
	poLinesSelection,
	openOrders,
	FixedDemand,
	ReplenishmentLines,
	Document,
	CurrentDocument,
	Transactions,
	Taxes,
	DiscountDetails,
	APDocs,
	PrepaymentDocuments,
	ChangeOrderDetails,
	ReversingChangeOrders,
	Answers,
	recalcdiscountsfilter,
	ProjectItemFilter,
	AvailableProjectItems,
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-document/form-contact-document";

@graphInfo({
	graphType: "PX.Objects.CN.Subcontracts.SC.Graphs.SubcontractEntry",
	primaryView: "Document",
	showActivitiesIndicator: true
})
export class SC301000 extends PXScreen {
	ViewChangeOrder: PXActionState;
	ViewOrigChangeOrder: PXActionState;
	AddSelectedItems: PXActionState;
	RecalcOk: PXActionState;
	AppendSelectedProjectItems: PXActionState;

	ShowMatrixPanel: PXActionState;
	NewVendor: PXActionState;
	EditVendor: PXActionState;
	AddPOOrder: PXActionState;
	AddPOOrderLine: PXActionState;
	CreatePOReceipt: PXActionState;
	CreatePrepayment: PXActionState;
	AddInvBySite: PXActionState;
	ViewDemand: PXActionState;
	ResetOrder: PXActionState;

	Document = createSingle(Document);
	filter = createSingle(filter);
	poLinesSelection = createCollection(poLinesSelection);
	openOrders = createCollection(openOrders);
	FixedDemand = createCollection(FixedDemand);
	ReplenishmentLines = createCollection(ReplenishmentLines);
	CurrentDocument = createSingle(CurrentDocument);
	Transactions = createCollection(Transactions);
	Taxes = createCollection(Taxes);
	Remit_Contact = createSingle(Contact);
	Remit_Address = createSingle(Address);
	DiscountDetails = createCollection(DiscountDetails);
	APDocs = createCollection(APDocs);
	PrepaymentDocuments = createCollection(PrepaymentDocuments);
	ChangeOrderDetails = createCollection(ChangeOrderDetails);
	ReversingChangeOrders = createCollection(ReversingChangeOrders);
	Answers = createCollection(Answers);
	recalcdiscountsfilter = createSingle(recalcdiscountsfilter);
	CurrencyInfo = createSingle(CurrencyInfo);
	ProjectItemFilter = createSingle(ProjectItemFilter);
	AvailableProjectItems = createCollection(AvailableProjectItems);
}
