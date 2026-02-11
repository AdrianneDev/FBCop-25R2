import {
	PXFieldState,
	PXFieldOptions,

	columnConfig,
	GridColumnShowHideMode,
	placeBeforeProperty,
} from "client-controls";
import { IN304000 } from "../IN304000";
import { SiteStatusLookupBase, SiteStatusLookupFilter, SiteStatusLookupResults } from "../../common/panel-site-status-lookup/panel-site-status-lookup";

export interface IN304000_SiteStatusLookup extends IN304000, SiteStatusLookupBase { }
export class IN304000_SiteStatusLookup extends SiteStatusLookupBase { }

export interface IN304000_SiteStatusLookupFilter extends SiteStatusLookupFilter { }
export class IN304000_SiteStatusLookupFilter {
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	ReceiptNbr: PXFieldState<PXFieldOptions.CommitChanges>;
}

export interface IN304000_SiteStatusLookupResults extends SiteStatusLookupResults { }
export class IN304000_SiteStatusLookupResults {
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	@placeBeforeProperty("ItemClassID")
	LocationID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseUnit: PXFieldState;

	QtyAvail: PXFieldState;
	QtyOnHand: PXFieldState;
}
