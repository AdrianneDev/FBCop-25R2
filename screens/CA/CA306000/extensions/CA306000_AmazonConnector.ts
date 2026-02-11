import { PXFieldState, featureInstalled } from "client-controls";
import { CA306000, CABankTran } from "../CA306000";

export interface CA306000_AmazonConnector extends CA306000 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AmazonIntegration")
export class CA306000_AmazonConnector {

}

export interface CABankTranConnectorExtension extends CABankTran { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AmazonIntegration")
export class CABankTranConnectorExtension {
	IsAutoMatchOnly: PXFieldState;
}
