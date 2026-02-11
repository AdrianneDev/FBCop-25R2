import {
	PXFieldState,
	PXFieldOptions,

	columnConfig,
	placeBeforeProperty,
} from "client-controls";
import { IN301000 } from "../IN301000";
import { SiteStatusLookupBase, SiteStatusLookupFilter, SiteStatusLookupResults } from "../../common/panel-site-status-lookup/panel-site-status-lookup";

export interface IN301000_SiteStatusLookup extends IN301000, SiteStatusLookupBase { }
export class IN301000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface IN301000_SiteStatusLookupFilter extends SiteStatusLookupFilter { }
export class IN301000_SiteStatusLookupFilter {
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export interface IN301000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class IN301000_SiteStatusLookupResults {
	@columnConfig({ hideViewLink: true })
	@placeBeforeProperty("ItemClassID")
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseUnit: PXFieldState;

	QtyAvail: PXFieldState;
	QtyOnHand: PXFieldState;
}
