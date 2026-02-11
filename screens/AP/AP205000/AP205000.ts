import { VendorDiscountSequence, APDiscountEx, UpdateSettingsFilter, DiscountDetail, DiscountItem, APDiscountLocation } from "./views";
import { graphInfo, PXScreen, createSingle, createCollection, PXView, PXFieldState, columnConfig, viewInfo, gridConfig, GridPreset } from "client-controls";

@graphInfo({
	graphType: "PX.Objects.AP.APDiscountSequenceMaint",
	primaryView: "Sequence",
	bpEventsIndicator: false,
	showUDFIndicator: true
})
export class AP205000 extends PXScreen {

	Sequence = createSingle(VendorDiscountSequence);

	@viewInfo({ syncAlways: true })
	Discount = createSingle(APDiscountEx);

	UpdateSettings = createSingle(UpdateSettingsFilter);
	Details = createCollection(DiscountDetail);
	Items = createCollection(DiscountItem);
	Locations = createCollection(APDiscountLocation);
	InventoryPriceClasses = createCollection(DiscountInventoryPriceClass);

}

@gridConfig({
	preset: GridPreset.Details
})
export class DiscountInventoryPriceClass extends PXView {
	@columnConfig({ hideViewLink: true })
	InventoryPriceClassID: PXFieldState;

	@columnConfig({ allowUpdate: false })
	INPriceClass__Description: PXFieldState;
}
