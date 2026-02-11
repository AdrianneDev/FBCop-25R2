import {
	PXScreen,
	createCollection,
	graphInfo,
} from "client-controls";

import {
	Items,
	ProjectTaskSources,
	LaborItemSources,
	CostCodeRanges,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.WorkCodeMaint",
	primaryView: "Items",
	hideNotesIndicator: true,
	hideFilesIndicator: true,
})
export class PM209800 extends PXScreen {
	Items = createCollection(Items);
	ProjectTaskSources = createCollection(ProjectTaskSources);
	LaborItemSources = createCollection(LaborItemSources);
	CostCodeRanges = createCollection(CostCodeRanges);
}

