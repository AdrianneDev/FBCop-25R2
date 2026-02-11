import { createSingle, PXFieldState, PXView, viewInfo } from "client-controls";
import { AuBaseScreen } from "./au-base-screen";

export class AuWorkflowBaseScreen extends AuBaseScreen {
	@viewInfo({syncAlways: true})
	AUMaintBaseParamsView = createSingle(AUMaintBaseParams);
}

export class AUMaintBaseParams extends PXView {
	EditScreenID: PXFieldState;
	ObjID: PXFieldState;
	CodeFile: PXFieldState;
	TableName: PXFieldState;
	EditMobileScreenID: PXFieldState;
	WorkflowID: PXFieldState;
}
