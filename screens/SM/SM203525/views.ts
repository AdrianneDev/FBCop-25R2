import { PXView, PXFieldState, gridConfig, linkCommand, columnConfig, PXActionState, PXFieldOptions, GridPreset } from "client-controls";

// Views

export class SpaceUsageCalculationHistory extends PXView {
	CalculationDate: PXFieldState;
	UsedTotal: PXFieldState;
	UsedByCompanies: PXFieldState;
	UsedBySnapshots: PXFieldState;
	FreeSpace: PXFieldState;
	QuotaSize: PXFieldState;
	CurrentStatus: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	fastFilterByAllFields: false,
	syncPosition: true
})
export class UPCompany extends PXView {
	ViewCompanyTables: PXActionState;

	Current: PXFieldState;
	@columnConfig({ hideViewLink: true })
	CompanyID: PXFieldState;
	@linkCommand("ViewCompany")
	CompanyCD: PXFieldState;
	LoginName: PXFieldState;
	Status: PXFieldState;
	SizeMB: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	fastFilterByAllFields: false,
	syncPosition: true
})
export class UPSnapshot extends PXView {
	ViewSnapshotTables: PXActionState;

	@linkCommand("ViewSnapshot")
	Name: PXFieldState;
	Description: PXFieldState;
	CreatedDateTime: PXFieldState;
	ExportMode: PXFieldState;
	SizeInDbMB: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	fastFilterByAllFields: false,
	syncPosition: true
})
export class Tables extends PXView {
	ViewCompaniesByTable: PXActionState;

	TableName: PXFieldState;
	CountOfCompanyRecords: PXFieldState;
	FullSizeByCompanyMB: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class TableSize extends PXView {
	TableName: PXFieldState;
	CountOfCompanyRecords: PXFieldState;
	FullSizeByCompanyMB: PXFieldState;
}

export class PopupCompanyTablesHeader extends PXView {
	CompanyName: PXFieldState<PXFieldOptions.Disabled>;
	SizeMB: PXFieldState;
}

export class PopupSnapshotTablesHeader extends PXView {
	SnapshotName: PXFieldState<PXFieldOptions.Disabled>;
	SizeMB: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true
})
export class PopupCompaniesByTableDefinition extends PXView {
	Type: PXFieldState;
	Name: PXFieldState;
	CountOfCompanyRecords: PXFieldState;
	FullSizeByCompanyMB: PXFieldState;
}

export class PopupCompaniesByTableHeader extends PXView {
	TableName: PXFieldState<PXFieldOptions.Disabled>;
	Size: PXFieldState;
}