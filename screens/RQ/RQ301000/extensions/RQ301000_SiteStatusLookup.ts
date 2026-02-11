import {
	PXFieldState,
	columnConfig,
	placeAfterProperty,
} from "client-controls";

import { RQ301000 } from "../RQ301000";
import { SiteStatusLookupBase, SiteStatusLookupResults } from "../../../IN/common/panel-site-status-lookup/panel-site-status-lookup";

export interface RQ301000_SiteStatusLookup extends RQ301000, SiteStatusLookupBase { }
export class RQ301000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface RQ301000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class RQ301000_SiteStatusLookupResults {
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
}
