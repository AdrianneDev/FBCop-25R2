import {
	IGridColumn,
	handleEvent,
	CustomEventType,
	RowCssHandlerArgs,
	CellCssHandlerArgs,
	PXViewCollection,
} from "client-controls";
import {
	CreateMatrixItemsBase,
	EntryMatrix,
	CreateMatrixGridManager,
} from "../../common/matrix-items/panel-create-matrix-items/panel-create-matrix-items";
import { IN203500 } from "../IN203500";

export interface IN203500_CreateMatrixItems extends IN203500, CreateMatrixItemsBase { }
export class IN203500_CreateMatrixItems extends CreateMatrixItemsBase {
	onFilterColumns(column: IGridColumn): boolean {
		return CreateMatrixGridManager.AdditionalAttributesFilterColumns(column);
	}

	matrixItemsForCreationOnFilterColumns(column: IGridColumn): boolean {
		return CreateMatrixGridManager.MatrixItemsForCreationFilterColumns(column);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "Matrix" })
	getMatrixRowCss(args: RowCssHandlerArgs<PXViewCollection<EntryMatrix>>) : string {
		return CreateMatrixGridManager.GetCreateMatrixRowCss(args?.selector?.row);
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "Matrix", column: CreateMatrixGridManager.PreliminaryColumn })
	getMatrixCellCss(args: CellCssHandlerArgs) : string {
		return CreateMatrixGridManager.GetCreateMatrixCellCss(args?.selector?.row, CreateMatrixGridManager.PreliminaryColumn);
	}
}