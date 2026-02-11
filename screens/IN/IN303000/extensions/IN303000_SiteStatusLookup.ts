import {
	PXFieldState,
	PXFieldOptions,

	columnConfig,
	placeBeforeProperty,
} from "client-controls";
import { IN303000 } from "../IN303000";
import { SiteStatusLookupBase, SiteStatusLookupFilter, SiteStatusLookupResults } from "../../common/panel-site-status-lookup/panel-site-status-lookup";

export interface IN303000_SiteStatusLookup extends IN303000, SiteStatusLookupBase { }
export class IN303000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface IN303000_SiteStatusLookupFilter extends SiteStatusLookupFilter { }
export class IN303000_SiteStatusLookupFilter {
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export interface IN303000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class IN303000_SiteStatusLookupResults {
	@columnConfig({ hideViewLink: true })
	@placeBeforeProperty("ItemClassID")
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseUnit: PXFieldState;

	QtyAvail: PXFieldState;
	QtyOnHand: PXFieldState;
}
