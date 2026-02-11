import {
	PXFieldState,
	columnConfig,
	placeAfterProperty,
} from "client-controls";

import { PO301000 } from "../PO301000";
import { SiteStatusLookupBase, SiteStatusLookupResults } from "../../../IN/common/panel-site-status-lookup/panel-site-status-lookup";

export interface PO301000_SiteStatusLookup extends PO301000, SiteStatusLookupBase { }
export class PO301000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface PO301000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class PO301000_SiteStatusLookupResults {
	@columnConfig({ hideViewLink: true })
	@placeAfterProperty("PriceClassDescription")
	PreferredVendorID: PXFieldState;

	@placeAfterProperty("PriceClassDescription")
	PreferredVendorDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	PurchaseUnit: PXFieldState;

	QtyAvailExt: PXFieldState;
	QtyOnHandExt: PXFieldState;
	QtyPOOrdersExt: PXFieldState;
	QtyPOReceiptsExt: PXFieldState;

	@columnConfig({
		allowSort: false,
		allowFilter: false
	})
	AlternateID: PXFieldState;

	@columnConfig({
		allowSort: false,
		allowFilter: false
	})
	AlternateType: PXFieldState;

	@columnConfig({
		allowSort: false,
		allowFilter: false
	})
	AlternateDescr: PXFieldState;
}
