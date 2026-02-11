import {
	PXFieldState,
	PXFieldOptions,

	columnConfig,
	placeBeforeProperty,
} from "client-controls";
import { IN302000 } from "../IN302000";
import { SiteStatusLookupBase, SiteStatusLookupFilter, SiteStatusLookupResults } from "../../common/panel-site-status-lookup/panel-site-status-lookup";

export interface IN302000_SiteStatusLookup extends IN302000, SiteStatusLookupBase { }
export class IN302000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface IN302000_SiteStatusLookupFilter extends SiteStatusLookupFilter { }
export class IN302000_SiteStatusLookupFilter {
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ProjectInformation: PXFieldState<PXFieldOptions.CommitChanges>;
}

export interface IN302000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class IN302000_SiteStatusLookupResults {
	@columnConfig({ hideViewLink: true })
	@placeBeforeProperty("ItemClassID")
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseUnit: PXFieldState;

	QtyAvail: PXFieldState;
	QtyOnHand: PXFieldState;

	InventorySource: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ProjectID: PXFieldState;
	@columnConfig({ hideViewLink: true })
	TaskID: PXFieldState;
}
