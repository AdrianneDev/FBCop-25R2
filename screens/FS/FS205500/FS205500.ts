import {
	graphInfo,
	gridConfig,
	createCollection,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FS.SrvManagementEmployeeMaint",
	primaryView: "SrvManagementStaffRecords",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class FS205500 extends PXScreen {
	SrvManagementStaffRecords = createCollection(BAccountStaffMember);
}

@gridConfig({
	preset: GridPreset.Inquiry,
	allowUpdate: false
})
export class BAccountStaffMember extends PXView {
	AcctCD: PXFieldState;
	AcctName: PXFieldState;
	Type: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BAccountStaffMember__ParentBAccountID: PXFieldState;

	Contact__EMail: PXFieldState;
	Contact__Phone1: PXFieldState;
}
