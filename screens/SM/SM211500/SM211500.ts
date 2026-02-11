import { createCollection, createSingle, PXScreen, graphInfo, PXActionState } from "client-controls";
import { LocalizationTranslationSet, SiteMap, LocalizationTranslationSetItem } from "./views";

@graphInfo({
	graphType: "PX.SiteMap.Graph.ModernTranslationSetMaint",
	primaryView: "TranslationSet"
})
export class SM211500 extends PXScreen {
	TranslationSet = createSingle(LocalizationTranslationSet);
	EntitiesTree = createCollection(SiteMap);
	TranslationSetItem = createCollection(LocalizationTranslationSetItem);
}
