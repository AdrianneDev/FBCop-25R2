import {
	PXView,
	PXFieldState,
	createSingle,
	viewInfo,
	fieldConfig,
} from "client-controls";

export abstract class ChangeIDBase {
	@viewInfo({ containerName: "Specify New ID" })
	ChangeIDDialog = createSingle(ChangeIDParameters);
}

export class ChangeIDParameters extends PXView {
	@fieldConfig({controlType: "qp-mask-editor"})
	CD: PXFieldState;
}
