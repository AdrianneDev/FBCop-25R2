import {
	graphInfo,
	gridConfig,
	linkCommand,
	createSingle,
	createCollection,
	PXScreen,
	PXView,
	PXFieldState,
	PXActionState,
	PXFieldOptions,
	GridPreset,
	GridNoteFilesShowMode,
	viewInfo
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";
import { Contact } from "src/screens/common/form-contact-profile/form-contact-profile";

@graphInfo({ graphType: "PX.Objects.FS.BranchLocationMaint", primaryView: "BranchLocationRecords" })
export class FS202500 extends PXScreen {
	OpenRoom: PXActionState;
	ViewonMap: PXActionState;
	BranchLocationRecords = createSingle(FSBranchLocation);

	@viewInfo({ containerName: "General -> Main Contact"})
	BranchLocation_Contact = createSingle(Contact);

	@viewInfo({ containerName: "General -> Main Address"})
	BranchLocation_Address = createSingle(Address);

	@viewInfo({ containerName: "General"})
	CurrentBranchLocation = createSingle(FSBranchLocationSelected);
	RoomRecords = createCollection(FSRoom);
}

export class FSBranchLocation extends PXView {
	BranchLocationCD: PXFieldState;
	Descr: PXFieldState;
	BranchID: PXFieldState;
	RoomFeatureEnabled: PXFieldState;
}

export class FSBranchLocationSelected extends PXView {
	SubID: PXFieldState;
	DfltSiteID: PXFieldState;
	DfltUOM: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class FSRoom extends PXView {
	@linkCommand("OpenRoom")
	RoomID: PXFieldState<PXFieldOptions.CommitChanges>;

	Descr: PXFieldState;
	FloorNbr: PXFieldState;
}
