import {
	graphInfo,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	createSingle,
	viewInfo
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.FS.ManufacturerMaint", primaryView: "ManufacturerRecords" })
export class FS204400 extends PXScreen {
	ViewonMap: PXActionState;
	ManufacturerRecords = createSingle(FSManufacturer);

	@viewInfo({ containerName: "General"})
	CurrentManufacturer = createSingle(FSManufacturerSelected);

	@viewInfo({ containerName: "General -> Main Address"})
	Manufacturer_Address = createSingle(Address);

	@viewInfo({ containerName: "General -> Main Contact"})
	Manufacturer_Contact = createSingle(Contact);
}

export class FSManufacturer extends PXView {
	ManufacturerCD: PXFieldState;
	Descr: PXFieldState;
	ContactID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class FSManufacturerSelected extends PXView {
	AllowOverrideContactAddress: PXFieldState<PXFieldOptions.CommitChanges>;
}
