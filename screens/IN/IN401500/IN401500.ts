import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
	GridColumnGeneration,
	IGridColumn,
	handleEvent,
	CustomEventType,
	CellCssHandlerArgs,
	RowCssHandlerArgs,
	columnConfig,
	GridColumnShowHideMode,
	GridAutoGrowMode,
	GridFastFilterVisibility,
	PXViewCollection
} from "client-controls";

import { MatrixGridManager } from "./../common/matrix-items/matrix-grid-manager";


@graphInfo({
	graphType: "PX.Objects.IN.Matrix.Graphs.MatrixItemsStatusInquiry",
	primaryView: "Header",
})
export class IN401500 extends PXScreen {
	MatrixGridCellChanged: PXActionState;
	ViewAllocationDetails: PXActionState;

	@viewInfo({ containerName: "Header" })
	Header = createSingle(EntryHeader);

	@viewInfo({ containerName: "Additional Attributes" })
	AdditionalAttributes = createCollection(AdditionalAttributes);

	@viewInfo({ containerName: "Create Matrix Items" })
	Matrix = createCollection(EntryMatrix);

	private RedirectLinkCommand = "ViewAllocationDetails";

	onFilterColumnsAdditionalAttributes(column: IGridColumn) {
		return MatrixGridManager.AdditionalAttributesFilterColumns(column);
	}

	onFilterColumnsMatrix(column: IGridColumn) {
		if (column.field !== undefined && column.field.startsWith(MatrixGridManager.AttributeValueTemplate)) {
			column.linkCommand = this.RedirectLinkCommand;
		}

		return true;
	}

	onColumnsGenerated(columns: IGridColumn[]) {
		return MatrixGridManager.MatrixColumnsGenerated(columns);
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "Matrix" })
	public getMatrixRowCss(args: RowCssHandlerArgs<PXViewCollection<EntryMatrix>>) {
		return MatrixGridManager.GetRowCss(args?.selector?.row);
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "Matrix", column: MatrixGridManager.ExtraColumn })
	public getMatrixCellCss(args: CellCssHandlerArgs) {
		return MatrixGridManager.GetCellCss(args?.selector?.row, MatrixGridManager.ExtraColumn);
	}

	onMatrixCellChanged(args: any) {
		return MatrixGridManager.SetColumnName(this.screenService, args.activeColumn?.field);
	}
}

export class EntryHeader extends PXView {
	TemplateItemID: PXFieldState<PXFieldOptions.CommitChanges>;
	ColAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	RowAttributeID: PXFieldState<PXFieldOptions.CommitChanges>;
	SiteID: PXFieldState<PXFieldOptions.CommitChanges>;
	LocationID: PXFieldState<PXFieldOptions.CommitChanges>;
	DisplayPlanType: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ShortList,
	showTopBar: false,
	allowInsert: false,
	allowDelete: false,
	generateColumns: GridColumnGeneration.Recreate
})
export class AdditionalAttributes extends PXView {
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	generateColumns: GridColumnGeneration.Append,
	showFastFilter: GridFastFilterVisibility.False,
	mergeToolbarWith: "ScreenToolbar"
})
export class EntryMatrix extends PXView {
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	IsTotal: PXFieldState<PXFieldOptions.Hidden>;
}
