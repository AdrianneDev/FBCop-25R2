import { createCollection, PXScreen, graphInfo, viewInfo } from "client-controls";
import { LocalizationTranslationSet } from "./views";

@graphInfo({graphType: "PX.SM.TranslationSetProcessing", primaryView: "TranslationSets" })
export class SM511500 extends PXScreen {

   	@viewInfo({containerName: "Translation Sets"})
	TranslationSets = createCollection(LocalizationTranslationSet);
}