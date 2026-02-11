import {
	IGridColumn,
	createSingle,
	viewInfo,

	handleEvent,
	CustomEventType,
	RowCssHandlerArgs,
	CellCssHandlerArgs,
	PXViewCollection,
} from "client-controls";
import {
	CreateMatrixItemsBase,
	CreateMatrixHeaderBase,
	EntryMatrix,
	CreateMatrixGridManager,
} from "../../common/matrix-items/panel-create-matrix-items/panel-create-matrix-items";
import { IN203000 } from "../IN203000";

export interface IN203000_CreateMatrixItems extends IN203000, CreateMatrixItemsBase { }
export class IN203000_CreateMatrixItems extends CreateMatrixItemsBase {
	@viewInfo({ containerName: "Header" })
	Header = createSingle(CreateMatrixHeaderBase);

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
