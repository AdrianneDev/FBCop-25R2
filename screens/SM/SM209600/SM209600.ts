import { createCollection, PXScreen, graphInfo, viewInfo } from "client-controls";
import { ExcludedVendorDomain } from "./views";

@graphInfo({graphType: "PX.Objects.AP.InvoiceRecognition.ExcludedVendorDomainMaint", primaryView: "Domains", })
export class SM209600 extends PXScreen {
   	@viewInfo({containerName: "Excluded Vendor Domains"})
	Domains = createCollection(ExcludedVendorDomain);
}