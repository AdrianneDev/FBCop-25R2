import {
	createCollection,
	graphInfo,
	PXScreen
} from "client-controls";

import {
	ProjectGroups,
} from "./views";

@graphInfo({
	graphType: "PX.Objects.PM.PMProjectGroupMaint",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
	primaryView: "ProjectGroups"
})
export class PM202500 extends PXScreen {
	ProjectGroups = createCollection(ProjectGroups);
}
