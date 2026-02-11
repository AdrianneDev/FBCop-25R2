import {
	PXScreen,
	PXActionState,
	createSingle,
	createCollection,
	graphInfo,
	CurrencyInfo,
	viewInfo
} from "client-controls";

import {
	ClaimDetails,
	CurrentClaimDetails,
	Taxes,
	ApprovalSetupView,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.EP.ExpenseClaimDetailEntry",
	primaryView: "ClaimDetails",
	showUDFIndicator: true,
	showActivitiesIndicator: true
})
export class EP301020 extends PXScreen {
	SaveTaxZone: PXActionState;

	ClaimDetails = createSingle(ClaimDetails);
	CurrentClaimDetails = createSingle(CurrentClaimDetails);
	Taxes = createCollection(Taxes);
	CurrencyInfo = createSingle(CurrencyInfo);
	@viewInfo({ syncAlways: true })
	ApprovalSetupView = createSingle(ApprovalSetupView);
	_EPExpenseClaimDetails_CurrencyInfo_ = createSingle(CurrencyInfo);
}

