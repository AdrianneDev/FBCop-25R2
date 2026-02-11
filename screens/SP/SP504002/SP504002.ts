import {
	createSingle, graphInfo, PXView, localizable, PXFieldOptions,
	PXFieldState, PXActionState, columnConfig,
	gridConfig,
	GridPreset,
	controlConfig
} from "client-controls";
import { PortalScreen } from "../sp-base";

@gridConfig({
	preset: GridPreset.Empty,
	pageSize: 20,
})
export class InventoryItemView extends PXView {
	AddToCart: PXActionState;

	InventoryCD: PXFieldState;
	Qty: PXFieldState<PXFieldOptions.CommitChanges>;
	UOMList: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({hideViewLink: true })
	SiteIdList: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState<PXFieldOptions.Multiline>;
	Body: PXFieldState;
	ImageUrl: PXFieldState;
	NoteID: PXFieldState;
	IAStatus: PXFieldState;
	Data: PXFieldState;
	CuryUnitPriceWithSymbol: PXFieldState;
	SiteQtyAvail: PXFieldState<PXFieldOptions.Hidden>;
}

@localizable
class Messages {
	static AddToCart = "Add To Cart";
}

@graphInfo({ graphType: "PX.Objects.Portals.SPInventoryItemMaint", primaryView: "SPInventoryItem" })
export class SP504002 extends PortalScreen {
	msg = Messages;
	SPInventoryItem = createSingle(InventoryItemView);

	async attached() {
		await super.attached();
		if (!window.top.location.href.includes("#")) {
			window.top.history.pushState(null, null, `${window.top.location.href}#${this.SPInventoryItem.InventoryCD.value}`);
		}
		this.screenService.Model.eventAggregator.subscribe("ClosePopupEvent", () => { alert(0); });
	}

	detached() {
		// TODO: it was a better place to clear the hash before qp-dialog got refactored, check if the code can be returned back
	}
}