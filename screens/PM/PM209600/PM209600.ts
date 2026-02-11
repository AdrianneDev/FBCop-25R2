import {
	createCollection,
	createSingle,
	graphInfo,
	handleEvent,
	CustomEventType,
	PXScreen,
	RowCssHandlerArgs,
	CellCssHandlerArgs,
	PXViewCollection
} from "client-controls";

import {
	Revisions,
	Filter,
	Project,
	Items,
	AddPeriodDialog,
	CopyDialog,
	DistributeDialog
} from "./views";

import {
	PMConstants
} from "../pm-constants";

@graphInfo({
	graphType: "PX.Objects.PM.ForecastMaint",
	primaryView: "Revisions",
})
export class PM209600 extends PXScreen {
	Revisions = createSingle(Revisions);
	Filter = createSingle(Filter);
	Project = createSingle(Project);
	Items = createCollection(Items);
	AddPeriodDialog = createSingle(AddPeriodDialog);
	CopyDialog = createSingle(CopyDialog);
	DistributeDialog = createSingle(DistributeDialog);

	@handleEvent(CustomEventType.GetRowCss, { view: "Items" })
	getItemsRowCss(args: RowCssHandlerArgs<PXViewCollection<Items>>) {
		const finPeriod = args?.selector?.row?.FinPeriodID.value;
		return  (finPeriod === PMConstants.TotalFinPeriod || finPeriod === PMConstants.DifferenceFinPeriod)
			? PMConstants.BoldRowCssClass
			: undefined;
	}


	static getItemsCellCss(args: CellCssHandlerArgs) {
		const finPeriod = args?.selector?.row?.FinPeriodID.value;
		if (finPeriod !== PMConstants.DifferenceFinPeriod) {
			return undefined;
		}
		const value = args?.selector?.cellValue;
		return value !== 0 ? PMConstants.ErrorCssClass : undefined;
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "Qty" })
	handleQtyCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "CuryAmount" })
	handleCuryAmountCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "RevisedQty" })
	handleRevisedQtyCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "CuryRevisedAmount" })
	handleCuryRevisedAmountCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "DraftChangeOrderQty" })
	handleDraftChangeOrderQtyCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "CuryDraftChangeOrderAmount" })
	handleCuryDraftChangeOrderAmountCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "ChangeOrderQty" })
	handleChangeOrderQtyCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "CuryChangeOrderAmount" })
	handleCuryChangeOrderAmountCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "ActualQty" })
	handleActualQtyCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
	@handleEvent(CustomEventType.GetCellCss, { view: "Items", column: "CuryActualAmount" })
	handleCuryActualAmountCss(args: CellCssHandlerArgs<PXViewCollection<Items>>) {
		return PM209600.getItemsCellCss(args);
	}
}
