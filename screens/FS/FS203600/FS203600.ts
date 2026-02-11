import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	headerDescription,
	GridPreset,
	GridColumnShowHideMode,
	GridColumnDisplayMode,
	PXFieldOptions,
	viewInfo
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.FS.VehicleMaint", primaryView: "EPEquipmentRecords" })
export class FS203600 extends PXScreen {
	EPEquipmentRecords = createSingle(EPEquipment);
	VehicleSelected = createSingle(FSVehicle);
	@viewInfo({ containerName: "Attributes" })
	Answers = createCollection(CSAnswers);
}

export class FSVehicle extends PXView {
	VehicleTypeID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	RegistrationNbr: PXFieldState;
	SerialNumber: PXFieldState;
	Descr: PXFieldState;
	RegisteredDate: PXFieldState;
	EngineNo: PXFieldState;
	Axles: PXFieldState;
	MaxMiles: PXFieldState;
	TareWeight: PXFieldState;
	WeightCapacity: PXFieldState;
	GrossVehicleWeight: PXFieldState;
	Color: PXFieldState;
	ManufacturerID: PXFieldState;
	ManufacturerModelID: PXFieldState;
	ManufacturingYear: PXFieldState;
	FuelType: PXFieldState;
	FuelTank1: PXFieldState;
	FuelTank2: PXFieldState;
	PropertyType: PXFieldState;
	VendorID: PXFieldState;
	PurchDate: PXFieldState;
	PurchPONumber: PXFieldState;
	PurchAmount: PXFieldState;
	@headerDescription VehicleDescr: PXFieldState;
}

export class EPEquipment extends PXView {
	EquipmentCD: PXFieldState;
	VehicleSelected: PXFieldState;
	BranchLocationID: PXFieldState;
	FixedAssetID: PXFieldState;
	RegisteredDate: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly
})
export class CSAnswers extends PXView {
	@columnConfig({
		textField: "AttributeID_description",
		allowShowHide: GridColumnShowHideMode.False,
		hideViewLink: true,
		displayMode: GridColumnDisplayMode.Text,
		width: 300
	})
	AttributeID: PXFieldState;

	isRequired: PXFieldState;
	Value: PXFieldState;
}
