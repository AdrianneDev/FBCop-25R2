import {
	PXView,
	PXFieldState,

	createSingle,

	viewInfo,
} from "client-controls";
import { SO301000 } from "../SO301000";

export interface SO301000_OverrideTaxZone extends SO301000 { }
export class SO301000_OverrideTaxZone {
	@viewInfo({ containerName: "Override Tax Zone" })
	BlanketTaxZoneOverrideFilter = createSingle(BlanketTaxZoneOverrideFilter);
}

export class BlanketTaxZoneOverrideFilter extends PXView {
	TaxZoneID: PXFieldState;
}