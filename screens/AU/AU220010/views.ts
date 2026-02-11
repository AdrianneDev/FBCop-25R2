import { PXView, PXFieldState, PXFieldOptions, fieldConfig, ITextEditorControlConfig, controlConfig } from "client-controls";


// Views

export class RowPageTitle extends PXView  {
	PageTitle: PXFieldState;
}

export class FilterMobileSiteMap extends PXView  {
}

export class CustObject extends PXView  {
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	Script: PXFieldState;
	@controlConfig<ITextEditorControlConfig>({
		selectOnFocus: false,
	})
	Errors: PXFieldState<PXFieldOptions.Multiline | PXFieldOptions.Disabled>;
	@fieldConfig({
		controlType: "qp-code-editor",
	})
	PreviewResult: PXFieldState;
}
