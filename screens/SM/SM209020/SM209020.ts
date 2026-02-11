import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection, PXPageLoadBehavior } from "client-controls";
import { AUTemplate, AUTemplateData } from "./views";

@graphInfo({graphType: "PX.SM.AUTemplateController", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.SearchSavedKeys})
export class SM209020 extends PXScreen {

   	@viewInfo({containerName: "Template"})
	Filter = createSingle(AUTemplate);
   	@viewInfo({containerName: "Values"})
	Items = createCollection(AUTemplateData);
}
