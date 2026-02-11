import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	fieldConfig,
	controlConfig,
	ITextEditorControlConfig,
} from "client-controls";

export class Address extends PXView {
	OverrideAddress: PXFieldState<PXFieldOptions.CommitChanges>;
	AddressLine1: PXFieldState<PXFieldOptions.CommitChanges>;
	AddressLine2: PXFieldState<PXFieldOptions.CommitChanges>;
	AddressLine3: PXFieldState<PXFieldOptions.CommitChanges>;
	City: PXFieldState<PXFieldOptions.CommitChanges>;
	CountryID: PXFieldState<PXFieldOptions.CommitChanges>;
	State: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({controlType: "qp-mask-editor"})
	PostalCode: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig<ITextEditorControlConfig>({ allowNull: true })
	Latitude: PXFieldState;
	@controlConfig<ITextEditorControlConfig>({ allowNull: true })
	Longitude: PXFieldState;
	IsValidated: PXFieldState<PXFieldOptions.Disabled>;

	// invisible by default fields:
	Department: PXFieldState;
	SubDepartment: PXFieldState;
	StreetName: PXFieldState;
	BuildingNumber: PXFieldState;
	BuildingName: PXFieldState;
	Floor: PXFieldState;
	UnitNumber: PXFieldState;
	PostBox: PXFieldState;
	Room: PXFieldState;
	TownLocationName: PXFieldState;
	DistrictName: PXFieldState;
}
