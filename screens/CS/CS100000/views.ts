import { PXView, PXFieldState, PXFieldOptions } from "client-controls";


// Views

export class FeaturesSet extends PXView  {
	Status: PXFieldState<PXFieldOptions.Disabled>;
	LicenseID: PXFieldState<PXFieldOptions.Disabled>;
	ValidUntill: PXFieldState<PXFieldOptions.Disabled>;
}
