import {
	createSingle,
	createCollection,
	viewInfo,
	PXFieldState,
	PXView,
	PXFieldOptions,
	PXActionState,
} from "client-controls";
import { PopupAttributes, PopupUDFAttributes } from "../views";

export abstract class CreateSalesOrderBase {
	CreateSalesOrderInPanel: PXActionState;
	CreateCustomerInPanel: PXActionState;

	@viewInfo({ containerName: "Dialog: Create Sales Order - Sales Order" })
	CreateOrderParams = createSingle(CreateSalesOrderFilter);

	@viewInfo({ containerName: "Dialog: Create Sales Order - Customer (Summary)" })
	CustomerInfo = createSingle(CustomerFilter);

	@viewInfo({ containerName: "Dialog: Create Sales Order - Customer (Attributes)" })
	CustomerInfoAttributes = createCollection(PopupAttributes);

	@viewInfo({ containerName: "Dialog: Create Sales Order - Customer (UDF)" })
	CustomerInfoUDF = createCollection(PopupUDFAttributes);
}

export class CreateSalesOrderFilter extends PXView {
	OrderType: PXFieldState<PXFieldOptions.CommitChanges>;
	OrderNbr: PXFieldState;
	MakeQuotePrimary: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculatePrices: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualPrices: PXFieldState<PXFieldOptions.CommitChanges>;
	RecalculateDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	OverrideManualDocGroupDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
	ConfirmManualAmount: PXFieldState<PXFieldOptions.CommitChanges>;
	AMIncludeEstimate: PXFieldState;
	AMCopyConfigurations: PXFieldState;
}

export class CustomerFilter extends PXView {
	AcctCD: PXFieldState;
	ClassID: PXFieldState;
	Email: PXFieldState;
	WarningMessage: PXFieldState;
}
