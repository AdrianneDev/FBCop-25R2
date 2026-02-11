import { controlConfig, GridCell, gridConfig, GridPreset, linkCommand, readOnly } from "client-controls";
import {
	PXView,
	PXFieldState, PXFieldOptions, columnConfig} from "client-controls";
import { PayMethodViewBase } from "../sp-paymethod";

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
	allowStoredFilters: true,
})
export class SPARPayment extends PayMethodViewBase {
	@readOnly DocType: GridCell;
	@readOnly @controlConfig({ editCommand: "viewPayment", displayMode: "id", allowEdit: true }) RefNbr: GridCell;
	@readOnly Status: GridCell;
	@readOnly AdjDate: GridCell;
	@readOnly AdjFinPeriodID: GridCell;
	@readOnly ExtRefNbr: GridCell;
	@readOnly CustomerID_Customer_acctName: GridCell;
	@readOnly CuryID: GridCell;
	@readOnly DocDesc: PXFieldState<PXFieldOptions.Multiline>;

	@readOnly CustomerPaymentMethod__Descr: GridCell;
	@readOnly @controlConfig({ displayMode: "text", allowEdit: false  }) PaymentMethodID: GridCell;
	get PayMethodDescr() {
		return this.CustomerPaymentMethod__Descr;
	}
	get PayMethodID() {
		return this.PaymentMethodID;
	}

	@readOnly CuryUnappliedBal_Text: GridCell;
	@readOnly CuryDiscTaken_Text: GridCell;
	@readOnly CuryOrigDocAmt_Text: GridCell;
}
