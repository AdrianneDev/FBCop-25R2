import {
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,

	createSingle,
	createCollection,

	gridConfig,
	columnConfig,
	GridPreset,

	viewInfo,
	TextAlign,
	GridColumnGeneration,
	IGridColumn,
	GridFastFilterVisibility,
} from "client-controls";

export abstract class AddLotSerialNumbersBase {
	AddSelectedLotSerialNbrs: PXActionState;

	@viewInfo({ containerName: "Lot/Serial Attributes Header" })
	LotSerialNbrHeader = createSingle(LotSerialNbrFilter);

	@viewInfo({ containerName: "Result" })
	lotSerialNbrResult = createCollection(LotSerialNbrResult);

	private readonly AttributePrefix = "Attribute";
	private readonly LotSerialNbrFields = ["Selected", "QtySelected", "InventoryID", "LotSerialNbr", "MfgLotSerialNbr", "Descr", "SiteID", "LocationCD", "BaseUnit", "QtyOnHand", "QtyAvail", "QtyHardAvail"];

	attributesColumnsGenerated(columns: IGridColumn[]): void {
		const attributes = this.LotSerialNbrHeader.AttributeIdentifiers?.value?.map(x => this.AttributePrefix.concat(x));
		if (attributes === undefined || attributes == null || attributes.length === 0) return;

		// attribute columns should be filterable
		for (const column of columns) {
			if (column.field !== undefined && column.field.startsWith(this.AttributePrefix)) {
				column.allowFastFilter = true;
			}
		}

		// reorder attribute columns the same way a server ordered them
		columns = columns.sort((a, b) => attributes.indexOf(a.field) - attributes.indexOf(b.field));
	}

	attributesOnFilterColumns(column: IGridColumn): boolean {
		const attributes = this.LotSerialNbrHeader.AttributeIdentifiers?.value?.map(f => this.AttributePrefix.concat(f));

		// by default platform adds a lot of extra columns (e.g. descriptions) so we should filter out everything that isn't expected
		return column.field !== undefined &&
			((attributes !== undefined && attributes.includes(column.field)) ||
			this.LotSerialNbrFields.includes(column.field));
	}
}

export class LotSerialNbrFilter extends PXView {
	LotSerClassID: PXFieldState<PXFieldOptions.CommitChanges>;
	InventoryID: PXFieldState<PXFieldOptions.CommitChanges>;
	Search: PXFieldState<PXFieldOptions.CommitChanges>;
	OnlyAvailable: PXFieldState<PXFieldOptions.CommitChanges>;
	AttributeIdentifiers: PXFieldState<PXFieldOptions.CommitChanges | PXFieldOptions.Hidden>;
}

@gridConfig({
	preset: GridPreset.Details,
	generateColumns: GridColumnGeneration.Append,
	showFastFilter:	GridFastFilterVisibility.False,
	fastFilterByAllFields: false,
	adjustPageSize: true,
})
export class LotSerialNbrResult extends PXView {
	@columnConfig({ allowCheckAll: true, allowNull: false })
	Selected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ textAlign: TextAlign.Right, allowNull: false })
	QtySelected: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ hideViewLink: true, allowFastFilter: true })
	InventoryID: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	LotSerialNbr: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	MfgLotSerialNbr: PXFieldState;

	@columnConfig({ allowFastFilter: true })
	Descr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	SiteID: PXFieldState;

	@columnConfig({ hideViewLink: true })
	LocationCD: PXFieldState;

	@columnConfig({ hideViewLink: true })
	BaseUnit: PXFieldState;

	QtyOnHand: PXFieldState;
	QtyAvail: PXFieldState;
	QtyHardAvail: PXFieldState;
}
