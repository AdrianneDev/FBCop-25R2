import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset,
	viewInfo
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.GeoZoneMaint", primaryView: "GeoZoneRecords" })
export class FS201900 extends PXScreen {
	GeoZoneRecords = createSingle(FSGeoZone);

	@viewInfo({ containerName: "Employees" })
	GeoZoneEmpRecords = createCollection(FSGeoZone_Employee);

	@viewInfo({ containerName: "Postal Codes" })
	GeoZonePostalCodeRecords = createCollection(FSGeoZone_PostalCode);
}

export class FSGeoZone extends PXView {
	GeoZoneCD: PXFieldState;
	Descr: PXFieldState;
	CountryID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class FSGeoZone_Employee extends PXView {
	EmployeeID: PXFieldState<PXFieldOptions.CommitChanges>;
	EmployeeID_EPEmployee_acctName: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
})
export class FSGeoZone_PostalCode extends PXView {
	PostalCode: PXFieldState<PXFieldOptions.CommitChanges>;
}
