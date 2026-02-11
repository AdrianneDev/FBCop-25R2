import { SM303020 } from "../SM303020";
import {
	PXFieldState,
	PXFieldOptions,
	featureInstalled,
	FeaturesSet,
} from "client-controls";
import { OidcProvider } from "../views";

export interface SM303020_Outlook extends SM303020 { }
@featureInstalled(FeaturesSet.OutlookIntegration)
export class SM303020_Outlook {
}

export interface OidcProvider_Outlook extends OidcProvider { }
@featureInstalled(FeaturesSet.OutlookIntegration)
export class OidcProvider_Outlook {
	ProviderForOutlook: PXFieldState<PXFieldOptions.CommitChanges>;
}