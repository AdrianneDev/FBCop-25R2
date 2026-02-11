import {
	PXFieldState,
	columnConfig,
	placeAfterProperty,
} from "client-controls";

import { RQ302000 } from "../RQ302000";
import { SiteStatusLookupBase, SiteStatusLookupResults } from "../../../IN/common/panel-site-status-lookup/panel-site-status-lookup";

export interface RQ302000_SiteStatusLookup extends RQ302000, SiteStatusLookupBase { }
export class RQ302000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface RQ302000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class RQ302000_SiteStatusLookupResults {
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
