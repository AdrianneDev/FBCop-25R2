import { PXView, PXFieldState, PXFieldOptions, ITextEditorControlConfig, controlConfig, fieldConfig } from "client-controls";

// Views

export class CustomizationPackage extends PXView {
	@fieldConfig({
		controlType: "qp-code-editor",
		controlConfig: { language: "html" }
	})
	Content: PXFieldState<PXFieldOptions.Multiline>;
}
