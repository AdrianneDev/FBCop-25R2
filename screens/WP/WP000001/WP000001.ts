import {
	PXScreen,
	viewInfo,
	createSingle,
	graphInfo,
	PXView,
	PXFieldState,
	fieldConfig,
	controlConfig,
	PXFieldOptions,
} from "client-controls";

@graphInfo({ graphType: "PX.SM.KBFeedbackMaint", primaryView: "Responses" })
export class WP000001 extends PXScreen {
	@viewInfo({ containerName: "Responses" })
	Responses = createSingle(Response);
}

export class Response extends PXView {
	@fieldConfig({ controlType: "qp-drop-down" })
	IsFind: PXFieldState<PXFieldOptions.CommitChanges>;
	Satisfaction: PXFieldState;
	@controlConfig({ rows: 12 })
	Summary: PXFieldState<PXFieldOptions.Multiline>;
}
