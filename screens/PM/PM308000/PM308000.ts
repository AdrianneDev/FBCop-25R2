import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen
} from "client-controls";

import {
	Document,
	VisibilitySettings,
	AvailableCostBudget,
	AvailableRevenueBudget,
	AvailablePOLineFilter,
	AvailablePOLines,
	AvailableChangeRequests,
	ChangeRequestCostDetails,
	ChangeRequestRevenueDetails,
	ChangeRequestMarkupDetails,
	ReversingChangeOrders,
	DocumentSettings,
	ChangeRequests,
	RevenueBudget,
	CostBudget,
	Details,
	Answers
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.ChangeOrderEntry",
	primaryView: "Document",
	udfTypeField: "ClassID",
	showActivitiesIndicator: true,
	showUDFIndicator: true
})
export class PM308000 extends PXScreen {
	ViewReversingChangeOrders: PXActionState;
	ViewChangeOrder: PXActionState;
	ViewChangeRequest: PXActionState;
	ViewCurrentReversingChangeOrder: PXActionState;
	ViewRevenueBudgetTask: PXActionState;
	ViewRevenueBudgetInventory: PXActionState;
	ViewCostBudgetTask: PXActionState;
	ViewCostBudgetInventory: PXActionState;
	ViewCommitmentTask: PXActionState;
	ViewCommitmentInventory: PXActionState;
	ViewCommitments: PXActionState;
	AppendSelectedCostBudget: PXActionState;
	AppendSelectedRevenueBudget: PXActionState;
	AppendSelectedPOLines: PXActionState;
	AppendSelectedChangeRequests: PXActionState;

	Document = createSingle(Document);
	VisibilitySettings = createSingle(VisibilitySettings);
	AvailableCostBudget = createCollection(AvailableCostBudget);
	AvailableRevenueBudget = createCollection(AvailableRevenueBudget);
	AvailablePOLineFilter = createSingle(AvailablePOLineFilter);
	AvailablePOLines = createCollection(AvailablePOLines);
	AvailableChangeRequests = createCollection(AvailableChangeRequests);
	ChangeRequestCostDetails = createCollection(ChangeRequestCostDetails);
	ChangeRequestRevenueDetails = createCollection(ChangeRequestRevenueDetails);
	ChangeRequestMarkupDetails = createCollection(ChangeRequestMarkupDetails);
	ReversingChangeOrders = createCollection(ReversingChangeOrders);
	DocumentSettings = createSingle(DocumentSettings);
	ChangeRequests = createCollection(ChangeRequests);
	RevenueBudget = createCollection(RevenueBudget);
	CostBudget = createCollection(CostBudget);
	Details = createCollection(Details);
	Answers = createCollection(Answers);

	afterConstructor() {
		super.afterConstructor();
		this.screenService.registerViewBinding(this.element, VisibilitySettings.name);
	}
}
