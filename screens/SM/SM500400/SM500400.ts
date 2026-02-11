import {
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridColumnGeneration,
	GridPreset,
	GridNoteFilesShowMode,
	IGridColumn,
	PXPageLoadBehavior,
	columnConfig
} from "client-controls";

@graphInfo({
	graphType: "PX.Data.Archiving.ArchiveProcess",
	primaryView: "Header",
	pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues,
})
export class SM500400 extends PXScreen {
	@viewInfo({ containerName: "Header" })
	Header = createSingle(Header);

	@viewInfo({ containerName: "Dates to Archive" })
	DatesToArchive = createCollection(DatesToArchive);

	private AllToArchiveField = "AllToArchive";
	private ToArchiveSuffix = "ToArchive";

	onFilterColumns(col: IGridColumn) {
			if (col.field !== this.AllToArchiveField && col.field.endsWith(this.ToArchiveSuffix)) {
			col.linkCommand = col.field;
		}
		return true;
	}
}

export class Header extends PXView {
	ArchivingProcessDurationLimitInHours: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Inquiry,
	batchUpdate: true,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowStoredFilters: false,
	generateColumns: GridColumnGeneration.AppendDynamic,
})
export class DatesToArchive extends PXView {
	@columnConfig({ allowCheckAll: true })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;
	Date: PXFieldState<PXFieldOptions.Disabled>;
}
