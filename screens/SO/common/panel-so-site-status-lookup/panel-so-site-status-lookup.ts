import {
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	placeAfterProperty,
} from "client-controls";
import { SiteStatusLookupBase, SiteStatusLookupFilter, SiteStatusLookupResults } from "../../../IN/common/panel-site-status-lookup/panel-site-status-lookup";

export abstract class SOSiteStatusLookupBase extends SiteStatusLookupBase {

}


export abstract class SOSiteStatusLookupFilter {
	Mode: PXFieldState<PXFieldOptions.CommitChanges>;
	HistoryDate: PXFieldState<PXFieldOptions.CommitChanges>;
	DropShipSales: PXFieldState<PXFieldOptions.CommitChanges>;

	CustomerLocationID: PXFieldState<PXFieldOptions.CommitChanges>;
}


export abstract class SOSiteStatusLookupResults {
	@columnConfig({ hideViewLink: true })
	@placeAfterProperty("PriceClassDescription")
	PreferredVendorID: PXFieldState;

	@placeAfterProperty("PriceClassDescription")
	PreferredVendorDescription: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SalesUnit: PXFieldState;

	QtyAvailSale: PXFieldState;
	QtyOnHandSale: PXFieldState;
	CuryID: PXFieldState;
	QtyLastSale: PXFieldState;
	CuryUnitPrice: PXFieldState;
	LastSalesDate: PXFieldState;

	DropShipLastQty: PXFieldState;
	DropShipCuryUnitPrice: PXFieldState;
	DropShipLastDate: PXFieldState;

	@columnConfig({ allowSort: false, allowFilter: false, allowFastFilter: true })
	AlternateID: PXFieldState;

	@columnConfig({ allowSort: false, allowFilter: false })
	AlternateType: PXFieldState;

	@columnConfig({ allowSort: false, allowFilter: false })
	AlternateDescr: PXFieldState;
}
