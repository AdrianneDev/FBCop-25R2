import { SO301000 } from "../SO301000";
import { SOSiteStatusLookupBase, SOSiteStatusLookupFilter, SOSiteStatusLookupResults } from "../../common/panel-so-site-status-lookup/panel-so-site-status-lookup";
import { SiteStatusLookupFilter, SiteStatusLookupResults } from "../../../IN/common/panel-site-status-lookup/panel-site-status-lookup";

export interface SO301000_SiteStatusLookup extends SO301000, SOSiteStatusLookupBase { }
export class SO301000_SiteStatusLookup extends SOSiteStatusLookupBase { }

export interface SO301000_SOSiteStatusLookupFilter extends SiteStatusLookupFilter, SOSiteStatusLookupFilter { }
export class SO301000_SOSiteStatusLookupFilter extends SOSiteStatusLookupFilter { }

export interface SO301000_SOSiteStatusLookupResults extends SiteStatusLookupResults, SOSiteStatusLookupResults { }
export class SO301000_SOSiteStatusLookupResults extends SOSiteStatusLookupResults { }
