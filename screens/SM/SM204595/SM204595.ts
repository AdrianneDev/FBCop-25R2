import { createSingle, PXScreen, graphInfo, PXPageLoadBehavior } from "client-controls";
import { CustomizationPackage } from "./views";

@graphInfo({graphType: "PX.SM.CustomizationXmlMaint", primaryView: "Package", pageLoadBehavior: PXPageLoadBehavior.SearchSavedKeys,
	hideNotesIndicator: true, hideFilesIndicator: true
})
export class SM204595 extends PXScreen {
	Package = createSingle(CustomizationPackage);
}
