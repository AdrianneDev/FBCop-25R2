import {
	PXView,
	PXFieldState,
	linkCommand,
	PXFieldOptions,
	gridConfig,
	PXActionState,
	columnConfig,
	GridPreset,
	viewInfo,
	createCollection,
	GridNoteFilesShowMode,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	PXViewCollection,
	GridFilterBarVisibility,
} from "client-controls";

export abstract class LocationsBase {

	@viewInfo({ containerName: "Locations" })
	Locations = createCollection(LocationDetail);

	@handleEvent(CustomEventType.RowSelected, { view: "Locations" })
	onLocationSelected(args: RowSelectedHandlerArgs<PXViewCollection<LocationDetail>>) {
		const model = args.viewModel;

		if (model?.SetDefaultLocation) {
			model.SetDefaultLocation.enabled = !!args.viewModel.activeRow?.IsActive?.value && !args.viewModel.activeRow?.IsDefault?.value;
		}
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	allowUpdate: false,
	adjustPageSize: true,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault,
	showFilterBar: GridFilterBarVisibility.OnDemand,
	quickFilterFields: ["LocationCD", "Descr", "Address__City", "Address__State", "Address__CountryID"],
})
export class LocationDetail extends PXView {
	NewLocation: PXActionState;
	SetDefaultLocation: PXActionState;

	IsActive: PXFieldState;
	@linkCommand("ViewLocation")
	LocationCD: PXFieldState;
	Descr: PXFieldState;
	IsDefault: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Hidden>;
	Address__City: PXFieldState;
	@columnConfig({ hideViewLink: true })
	Address__State: PXFieldState;
	Address__State_description: PXFieldState<PXFieldOptions.Hidden>;
	@columnConfig({ hideViewLink: true })
	Address__CountryID: PXFieldState;
	Address__CountryID_description: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostalCode: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine1: PXFieldState<PXFieldOptions.Hidden>;
	Address__AddressLine2: PXFieldState<PXFieldOptions.Hidden>;
	Address__Department: PXFieldState<PXFieldOptions.Hidden>;
	Address__SubDepartment: PXFieldState<PXFieldOptions.Hidden>;
	Address__StreetName: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__BuildingName: PXFieldState<PXFieldOptions.Hidden>;
	Address__Floor: PXFieldState<PXFieldOptions.Hidden>;
	Address__UnitNumber: PXFieldState<PXFieldOptions.Hidden>;
	Address__PostBox: PXFieldState<PXFieldOptions.Hidden>;
	Address__Room: PXFieldState<PXFieldOptions.Hidden>;
	Address__TownLocationName: PXFieldState<PXFieldOptions.Hidden>;
	Address__DistrictName: PXFieldState<PXFieldOptions.Hidden>;
}
