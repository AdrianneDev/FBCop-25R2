
import {
	IGridColumn,
	handleEvent,
	CustomEventType,
	RowCssHandlerArgs,
	CellCssHandlerArgs,
	PXViewCollection,
	QpGridEventArgs,
} from "client-controls";

import { AddMatrixItemsBase, EntryMatrix } from "../../../IN/common/matrix-items/panel-add-matrix-items/panel-add-matrix-items";
import { PO301000 } from "../PO301000";
import { MatrixGridManager } from "./../../../IN/common/matrix-items/matrix-grid-manager";

export interface PO301000_AddMatrixItems extends PO301000, AddMatrixItemsBase { }
export class PO301000_AddMatrixItems extends AddMatrixItemsBase {
	public AdditionalAttributesOnFilterColumns(column: IGridColumn) {
		return MatrixGridManager.AdditionalAttributesFilterColumns(column);
	}

	public MatrixOnFilterColumns(column: IGridColumn) {
		return MatrixGridManager.MatrixFilterColumns(column);
	}

	public MatrixOnColumnsGenerated(columns: IGridColumn[]) {
		return MatrixGridManager.MatrixColumnsGenerated(columns);
	}

	public MatrixItemsOnFilterColumns(column: IGridColumn) {
		return MatrixGridManager.MatrixItemsFilterColumns(column);
	}

	public MatrixItemsOnColumnsGenerated(columns: IGridColumn[]) {
		return MatrixGridManager.MatrixItemsColumnsGenerated(columns);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "Matrix" })
	public getMatrixRowCss(args: RowCssHandlerArgs<PXViewCollection<EntryMatrix>>) {
		return MatrixGridManager.GetRowCss(args?.selector?.row);
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "Matrix", column: MatrixGridManager.ExtraColumn })
	public getMatrixCellCss(args: CellCssHandlerArgs) {
		return MatrixGridManager.GetCellCss(args?.selector?.row, MatrixGridManager.ExtraColumn);
	}

	public onGetMatrixCellText(args: QpGridEventArgs) {
		return MatrixGridManager.GetMatrixCellText(args.activeColumn?.field, args.activeRow?.cells, args.activeCell?.cellText);
	}

	public onMatrixCellChanged(args: any) {
		if (this.Header.ShowAvailable.value === true) {
			MatrixGridManager.SetColumnName(this.screenService, args.activeColumn?.field);
		}
	}
}
