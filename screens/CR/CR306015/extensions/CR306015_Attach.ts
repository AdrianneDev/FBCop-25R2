import { CR306015 } from "../CR306015";

import {
	PXView,
	createCollection,
	PXFieldState,
	featureInstalled,
} from "client-controls";

export interface CR306015_Attach extends CR306015 {}
@featureInstalled("PX.Objects.CS.FeaturesSet+ConstructionProjectManagement")
export class CR306015_Attach {
	AttachedFiles = createCollection(AttachedFiles);
}

export class AttachedFiles extends PXView {
	IsAttached: PXFieldState;
	FileName: PXFieldState;
	FileSource: PXFieldState;
	DrawingLogCd: PXFieldState;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState;
	Revision: PXFieldState;
	IsDrawingLogCurrentFile: PXFieldState;
}
