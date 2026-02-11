import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	viewInfo,
	gridConfig,
	linkCommand,
	GridPreset
} from "client-controls";
import { IN202500 } from "../IN202500";

export interface IN202500_Manufacturing extends IN202500 { }
export class IN202500_Manufacturing {
	ViewBOM: PXActionState;
	ViewPlanningBOM: PXActionState;

	@viewInfo({ containerName: "Manufacturing Settings" })
	manufacturingSettings = createSingle(ManufacturingSettings);

	@viewInfo({ containerName: "AM Subitem Defaults" })
	AMSubItemDefaults = createCollection(AMSubItemDefaults);
}

export class ManufacturingSettings extends PXView {
	AMBOMID: PXFieldState;
	AMPlanningBOMID: PXFieldState;
	AMConfigurationID: PXFieldState;
	AMDefaultMarkFor: PXFieldState;
	AMMakeToOrderItem: PXFieldState;
	AMQtyRoundUp: PXFieldState;
	AMCTPItem: PXFieldState;
	ReplenishmentSource: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Disabled>;
	AMMinOrdQty: PXFieldState<PXFieldOptions.Disabled>;
	AMMaxOrdQty: PXFieldState<PXFieldOptions.Disabled>;
	AMLotSize: PXFieldState<PXFieldOptions.Disabled>;
	AMMFGLeadTime: PXFieldState<PXFieldOptions.Disabled>;
	Scrap: PXFieldState;
	AMScrapSiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMScrapLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	AMCheckSchdMatlAvailability: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes,
	syncPosition: true,
})
export class AMSubItemDefaults extends PXView {
	SubItemID: PXFieldState;
	SiteID: PXFieldState;
	IsItemDefault: PXFieldState;
	BOMID: PXFieldState;
	PlanningBOMID: PXFieldState;
}
