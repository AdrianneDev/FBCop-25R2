import { PXView, PXFieldState, gridConfig, GridPreset } from "client-controls";

@gridConfig({
	preset: GridPreset.Primary,
	autoAdjustColumns: true,
	quickFilterFields: ["Name"]
})
export class ExcludedVendorDomain extends PXView  {
	Name: PXFieldState;
}