import { SM203010 } from "../SM203010";
import {
	featureInstalled,
	FeaturesSet,
	PXActionState,
} from "client-controls";

export interface SM203010_Outlook extends SM203010 { }
@featureInstalled(FeaturesSet.OutlookIntegration)
export class SM203010_Outlook {
	DownloadLegacyOnPremiseManifest: PXActionState;
	DownloadLegacy365Manifest: PXActionState;

	protected async processDownloadOnPremiseManifestLinkClick() {
		await this.screenService.executeCommand("DownloadLegacyOnPremiseManifest");
	}

	protected async processDownload365ManifestLinkClick() {
		await this.screenService.executeCommand("DownloadLegacy365Manifest");
	}
}
