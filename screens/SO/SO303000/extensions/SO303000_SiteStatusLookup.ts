import { SO303000 } from "../SO303000";
import { SOSiteStatusLookupBase, SOSiteStatusLookupFilter, SOSiteStatusLookupResults } from "../../common/panel-so-site-status-lookup/panel-so-site-status-lookup";
import { SiteStatusLookupFilter, SiteStatusLookupResults } from "../../../IN/common/panel-site-status-lookup/panel-site-status-lookup";

export interface SO303000_SiteStatusLookup extends SO303000, SOSiteStatusLookupBase { }
export class SO303000_SiteStatusLookup extends SOSiteStatusLookupBase { }

export interface SO303000_SOSiteStatusLookupFilter extends SiteStatusLookupFilter, SOSiteStatusLookupFilter { }
export class SO303000_SOSiteStatusLookupFilter extends SOSiteStatusLookupFilter { }

export interface SO303000_SOSiteStatusLookupResults extends SiteStatusLookupResults, SOSiteStatusLookupResults { }
export class SO303000_SOSiteStatusLookupResults extends SOSiteStatusLookupResults { }
