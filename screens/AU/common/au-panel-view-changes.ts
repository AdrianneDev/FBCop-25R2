import { viewInfo, createSingle, PXView, PXFieldState, ExecuteCommandEvent, ClosePopupEvent, WebDialogResult, PXActionState } from "client-controls";
import { AuWorkflowBaseScreen } from "./au-workflow-maint-base";

export class AuPanelViewChangesScreen extends AuWorkflowBaseScreen {
	actionReset: PXActionState;

	@viewInfo({containerName: "Changes"})
	Changes = createSingle(PropertyTrackingChanges);

	afterConstructor() {
		super.afterConstructor();
		this.screenEventManager.subscribe(ExecuteCommandEvent, (evt: ExecuteCommandEvent) => {
			if (evt.Command?.contains("actionReset") && evt.Params.dialogCallback?.dialogResult === WebDialogResult.OK) {
				this.screenEventManager.publish(new ClosePopupEvent());
			}
		});
	}
}

export class PropertyTrackingChanges extends PXView  {
	Messages: PXFieldState;
}
