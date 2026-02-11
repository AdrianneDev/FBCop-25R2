import {
	graphInfo,
	gridConfig,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FS.LicenseTypeMaint",
	primaryView: "LicenseTypeRecords",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class FS200900 extends PXScreen {
	LicenseTypeRecords = createCollection(FSLicenseType);
}

@gridConfig({
	preset: GridPreset.Primary,
})
export class FSLicenseType extends PXView {
	@columnConfig({ hideViewLink: true })
	LicenseTypeCD: PXFieldState<PXFieldOptions.CommitChanges>;

	Descr: PXFieldState;
}
