import {
	createCollection,
	createSingle,
	graphInfo,
	PXScreen
} from "client-controls";

import {
	CurrentTag,
	Folders,
	Members,
	ParentFolders,
	SelectedFolders
} from "./views";

@graphInfo({
	graphType: "PX.Data.Wiki.Tags.TagMaint",
	primaryView: "SelectedFolders"
})
export class PM201500 extends PXScreen {

	SelectedFolders = createSingle(SelectedFolders);

	Folders = createCollection(Folders);

	CurrentTag = createSingle(CurrentTag);

	ParentFolders = createSingle(ParentFolders);

	Members = createCollection(Members);
}
