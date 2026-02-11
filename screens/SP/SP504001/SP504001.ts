import { createCollection, graphInfo, handleEvent, CellCssHandlerArgs, CustomEventType, PXActionState } from "client-controls";
import { CatalogScreen } from "../sp-base";
import { InventoryItemView } from "../catalog/view-models";

@graphInfo({ graphType: "PX.Objects.Portals.SPCatalogMaint", primaryView: "FilteredItems" })
export class SP504001 extends CatalogScreen {
	AddToCart: PXActionState;
	ViewDetails: PXActionState;

	FilteredItems = createCollection(InventoryItemView);

	@handleEvent(CustomEventType.GetCellCss, { view: "FilteredItems", column: "IAStatus" })
	getIAStatusCellCss(args: CellCssHandlerArgs): string | undefined {
		if (!args?.selector?.row?.AddToCart?.value) {
			return "iastatus-out-stock";
		}

		return "iastatus-in-stock";
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "FilteredItems", column: "CuryUnitPrice" })
	getCuryUnitPriceCellCss(args: CellCssHandlerArgs): string | undefined {
		return "cury-unit-price";
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "FilteredItems", column: "Discount" })
	getDiscountCellCss(args: CellCssHandlerArgs): string | undefined {
		return "discount-field";
	}
}
