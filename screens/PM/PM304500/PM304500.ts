import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	CurrencyInfo,
	PXScreen
} from "client-controls";

import {
	Quote,
	QuoteCurrent,
	Products,
	Tasks,
	Taxes,
	Answers,
	Quote_Contact,
	CopyQuoteInfo,
	ConvertQuoteInfo,
	recalcdiscountsfilter,
	TasksForAddition,
} from "./views";
import { Address } from "src/screens/common/form-address/form-address";

@graphInfo({
	graphType: "PX.Objects.PM.PMQuoteMaint",
	primaryView: "Quote", showUDFIndicator: true, hideFilesIndicator: false, hideNotesIndicator: false
})
export class PM304500 extends PXScreen {
	AddCommonTasks: PXActionState;
	ViewMainOnMap: PXActionState;
	ViewShippingOnMap: PXActionState;
	AddNewProjectTemplate: PXActionState;
	ViewProject: PXActionState;

	Quote = createSingle(Quote);
	QuoteCurrent = createSingle(QuoteCurrent);
	Products = createCollection(Products);
	Tasks = createCollection(Tasks);
	Taxes = createCollection(Taxes);
	Answers = createCollection(Answers);
	Quote_Contact = createSingle(Quote_Contact);
	Quote_Address = createSingle(Address);
	Shipping_Address = createSingle(Address);
	CopyQuoteInfo = createSingle(CopyQuoteInfo);
	ConvertQuoteInfo = createSingle(ConvertQuoteInfo);
	recalcdiscountsfilter = createSingle(recalcdiscountsfilter);
	TasksForAddition = createCollection(TasksForAddition);
	CurrencyInfo = createSingle(CurrencyInfo);
}
