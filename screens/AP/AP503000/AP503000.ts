import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, PXPageLoadBehavior, CurrencyInfo, viewInfo } from "client-controls";
import { PayBillsFilter, APAdjust, APAdjust2 } from "./views";

@graphInfo({ graphType: "PX.Objects.AP.APPayBills", primaryView: "Filter", hideFilesIndicator: true, hideNotesIndicator: true, pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues })
export class AP503000 extends PXScreen {

	ViewInvoice: PXActionState;
	ViewOriginalDocument: PXActionState;

	@viewInfo({ syncAlways: true }) // we need to refresh filter always with grid due to totals for selected rows
	Filter = createSingle(PayBillsFilter);

	// DAC is duplicated here to allow different grids to show different columns
	APDocumentList = createCollection(APAdjust);

	APExceptionsList = createCollection(APAdjust2);

	CurrencyInfo = createSingle(CurrencyInfo);

}
