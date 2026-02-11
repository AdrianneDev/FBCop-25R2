import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState, GridFastFilterVisibility, linkCommand, PXFieldOptions, controlConfig, featureInstalled, FeaturesSet, columnConfig } from "client-controls";
import { PM301500 } from "../PM301500";
import { PMConstants } from "../../pm-constants";

export interface PM301500_ChangeOrders extends PM301500 { }
@featureInstalled(FeaturesSet.ChangeOrder)
export class PM301500_ChangeOrders {
    ChangeOrders = createCollection(ChangeOrder);
    ChangeRequests = createCollection(ChangeRequest);

	@handleEvent(CustomEventType.GetRowCss, { view: "ChangeOrders" })
	getChangeOrdersRowCss(args: RowCssHandlerArgs<PXViewCollection<ChangeOrder>>) {
		return  (args?.selector?.row?.RefNbr.value == null)
			? PMConstants.BoldRowCssClass
			: undefined;
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "ChangeRequests" })
	getChangeRequestsRowCss(args: RowCssHandlerArgs<PXViewCollection<ChangeRequest>>) {
		return  (args?.selector?.row?.RefNbr.value == null)
			? PMConstants.BoldRowCssClass
			: undefined;
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	allowSort: false,
	showFastFilter: GridFastFilterVisibility.ToolBar
})
export class ChangeOrder extends PXView {
	CreateChangeOrder: PXActionState;

	@linkCommand("ViewChangeOrder")
	RefNbr: PXFieldState;
	@columnConfig({hideViewLink: true})
	ClassID: PXFieldState;
	ProjectNbr: PXFieldState;
	Status: PXFieldState;
	Description: PXFieldState;
	Date: PXFieldState;
	CompletionDate: PXFieldState;
	DelayDays: PXFieldState;
	ExtRefNbr: PXFieldState;
	RevenueTotal: PXFieldState;
	CommitmentTotal: PXFieldState;
	CostTotal: PXFieldState;
	ReverseStatus: PXFieldState;
	@linkCommand("ViewOrigChangeOrder")
	OrigRefNbr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	allowSort: false,
	showFastFilter: GridFastFilterVisibility.ToolBar
})
export class ChangeRequest extends PXView {
	CreateChangeRequest: PXActionState;

	@linkCommand("ViewChangeRequest")
	RefNbr: PXFieldState;
	Status: PXFieldState;
	Date: PXFieldState;
	Description: PXFieldState;
	CostTotal: PXFieldState;
	LineTotal: PXFieldState;
	MarkupTotal: PXFieldState;
	PriceTotal: PXFieldState;
}