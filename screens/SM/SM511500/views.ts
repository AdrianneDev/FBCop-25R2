import { PXView, PXFieldState, gridConfig, columnConfig, PXActionState, GridPreset } from "client-controls";


// Views

@gridConfig({
	preset: GridPreset.Processing,
	allowUpdate: false,
	fastFilterByAllFields: false
})
export class LocalizationTranslationSet extends PXView  {
	viewTranslationSet: PXActionState;

	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState;
	Description: PXFieldState;
	IsCollected: PXFieldState;
	SystemVersion: PXFieldState;
	@columnConfig({format: "g"})
	SystemTime: PXFieldState;
}
