import {
	PXFieldState,
	columnConfig,
	placeAfterProperty,
} from "client-controls";

import { SC301000 } from "../SC301000";
import { SiteStatusLookupBase, SiteStatusLookupResults } from "../../../IN/common/panel-site-status-lookup/panel-site-status-lookup";

export interface SC301000_SiteStatusLookup extends SC301000, SiteStatusLookupBase { }
export class SC301000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface SC301000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class SC301000_SiteStatusLookupResults {
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

	@columnConfig({ allowSort: false, allowFilter: false })
	AlternateID: PXFieldState;

	@columnConfig({ allowSort: false, allowFilter: false })
	AlternateType: PXFieldState;

	@columnConfig({ allowSort: false, allowFilter: false })
	AlternateDescr: PXFieldState;
}
