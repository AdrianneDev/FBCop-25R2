import { PXFieldState, featureInstalled } from "client-controls";
import { CA306500, CABankTranHeader, CABankTran } from "../CA306500";

export interface CA306500_AmazonConnector extends CA306500 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AmazonIntegration")
export class CA306500_AmazonConnector {

}

export interface CABankTranHeaderConnectorExtension extends CABankTranHeader { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AmazonIntegration")
export class CABankTranHeaderConnectorExtension {

	ManualMatchingAllowed: PXFieldState;
}

export interface CABankTranConnectorExtension extends CABankTran { }
@featureInstalled("PX.Objects.CS.FeaturesSet+AmazonIntegration")
export class CABankTranConnectorExtension {

	IsAutoMatchOnly: PXFieldState;
}
