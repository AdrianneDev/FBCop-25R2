import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	columnConfig,
	linkCommand,
	gridConfig,
	GridPreset,
} from "client-controls";

export class Filter extends PXView {
	Action: PXFieldState<PXFieldOptions.CommitChanges>;
	MasterEntity: PXFieldState<PXFieldOptions.CommitChanges>;
	DocumentDateWithinXDays: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Processing,
})
export class SelectedItems extends PXView {
	@columnConfig({
		allowCheckAll: true,
		width: 60,
	})
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	Type: PXFieldState;

	@linkCommand("OpenEntity")
	Reference: PXFieldState;

	MasterEntityType: PXFieldState;
	Pseudonymized: PXFieldState;
	ShipToCompanyName: PXFieldState;
	ShipToAttention: PXFieldState;
	ShipToEmail: PXFieldState;
	ShipToPhone1: PXFieldState;
	ShipToAddressLine1: PXFieldState;
	ShipToAddressLine2: PXFieldState;
	ShipToCity: PXFieldState;
	ShipToState: PXFieldState;
	ShipToCountry: PXFieldState;
	ShipToPostalCode: PXFieldState;
	ShipToDepartment: PXFieldState<PXFieldOptions.Hidden>;
	ShipToSubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	ShipToStreetName: PXFieldState<PXFieldOptions.Hidden>;
	ShipToBuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	ShipToBuildingName: PXFieldState<PXFieldOptions.Hidden>;
	ShipToFloor: PXFieldState<PXFieldOptions.Hidden>;
	ShipToUnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	ShipToTownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	ShipToPostBox: PXFieldState<PXFieldOptions.Hidden>;
	ShipToRoom: PXFieldState<PXFieldOptions.Hidden>;
	ShipToDistrictName: PXFieldState<PXFieldOptions.Hidden>;
	BillToCompanyName: PXFieldState;
	BillToAttention: PXFieldState;
	BillToEmail: PXFieldState;
	BillToPhone1: PXFieldState;
	BillToAddressLine1: PXFieldState;
	BillToAddressLine2: PXFieldState;
	BillToCity: PXFieldState;
	BillToState: PXFieldState;
	BillToCountry: PXFieldState;
	BillToPostalCode: PXFieldState;
	BillToDepartment: PXFieldState<PXFieldOptions.Hidden>;
	BillToSubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	BillToStreetName: PXFieldState<PXFieldOptions.Hidden>;
	BillToBuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	BillToBuildingName: PXFieldState<PXFieldOptions.Hidden>;
	BillToFloor: PXFieldState<PXFieldOptions.Hidden>;
	BillToUnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	BillToPostBox: PXFieldState<PXFieldOptions.Hidden>;
	BillToRoom: PXFieldState<PXFieldOptions.Hidden>;
	BillToTownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	BillToDistrictName: PXFieldState<PXFieldOptions.Hidden>;
}
