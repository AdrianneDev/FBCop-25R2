import { PXView, PXFieldState, gridConfig, PXFieldOptions, columnConfig, GridColumnShowHideMode, PXActionState, GridPreset, GridColumnDisplayMode } from "client-controls";

// Views

export class ImportSnapshotSettings extends PXView {
	Company: PXFieldState<PXFieldOptions.Disabled>;
	Name: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState<PXFieldOptions.Disabled>;
}

export class ExportSnapshotSettings extends PXView {
	Company: PXFieldState<PXFieldOptions.Disabled>;
	Description: PXFieldState;
	ExportMode: PXFieldState;
	Prepare: PXFieldState<PXFieldOptions.CommitChanges>;
	PrepareMode: PXFieldState;
	DataType: PXFieldState;
}

export class CopyCompanySettings extends PXView {
	CompanyID: PXFieldState;
}

export class UPCompany extends PXView {
	CompanyID: PXFieldState;
	CompanyCD: PXFieldState;
	LoginName: PXFieldState;
	Status: PXFieldState<PXFieldOptions.Disabled>;
}

@gridConfig({ preset: GridPreset.ReadOnly, syncPosition: true })
export class UPSnapshot extends PXView {
	UploadSnapshotCommand: PXActionState;
	DeleteSnapshotCommand: PXActionState;
	PrepareAdbSnapshotCommand: PXActionState;
	PrepareXmlSnapshotCommand: PXActionState;
	DownloadSnapshotCommand: PXActionState;
	ChangeVisibilityCommand: PXActionState;

	SnapshotID: PXFieldState;
	@columnConfig({ width: 300 })
	Name: PXFieldState;
	Description: PXFieldState;
	Prepared: PXFieldState;
	@columnConfig({ allowShowHide: GridColumnShowHideMode.Server }) SizePrepared: PXFieldState;
	Date: PXFieldState;
	Version: PXFieldState;
	ExportMode: PXFieldState;
	@columnConfig({ hideViewLink: true, displayMode: GridColumnDisplayMode.Text }) SourceCompany: PXFieldState;
	Customization: PXFieldState;
	IsSafe: PXFieldState;
}

@gridConfig({ preset: GridPreset.ReadOnly, adjustPageSize: true })
export class UPSnapshotHistory extends PXView {
	SnapshotID: PXFieldState;
	@columnConfig({ width: 300 })
	UPSnapshot__Name: PXFieldState;
	UPSnapshot__Description: PXFieldState;
	@columnConfig({ hideViewLink: true }) UserID: PXFieldState;
	CreatedDateTime: PXFieldState;
	UPSnapshot__Version: PXFieldState;
	IsSafe: PXFieldState;
	Dismissed: PXFieldState;
}

@gridConfig({preset: GridPreset.ReadOnly })
export class Users extends PXView {
	ManageUsersCommand: PXActionState;

	@columnConfig({ hideViewLink: true }) Username: PXFieldState;
	IsApproved: PXFieldState;
	FirstName: PXFieldState;
	LastName: PXFieldState;
	Email: PXFieldState;
	Phone: PXFieldState;
	Comment: PXFieldState;
	IsOnLine: PXFieldState;
	IsLockedOut: PXFieldState;
	PasswordChangeOnNextLogin: PXFieldState;
	AllowPasswordRecovery: PXFieldState;
	PasswordNeverExpires: PXFieldState;
}
