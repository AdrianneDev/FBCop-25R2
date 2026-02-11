import {
	 createCollection, createSingle, graphInfo, viewInfo, handleEvent,
	 PXScreen, PXView, PXViewCollection, PXFieldState, PXFieldOptions, PXDatetimeFieldState,
	 gridConfig, columnConfig, controlConfig,
	 GridColumnType, GridPreset, GridFastFilterVisibility, TextAlign,
	 CustomEventType, RowSelectedHandlerArgs,
} from "client-controls";

import { NullTextValues } from "../../common/messages";

@graphInfo({graphType: "PX.Objects.CS.CSFilterMaint", primaryView: "Filter", })
export class CS209010 extends PXScreen {
   	@viewInfo({containerName: "Filter Summary"})
	Filter = createSingle(FilterHeader);

   	@viewInfo({containerName: "Details"})
	FilterDetails = createCollection(FilterRow);

	@handleEvent(CustomEventType.RowSelected, { view: "FilterDetails" })
   	onFilterRowSelected(args: RowSelectedHandlerArgs<PXViewCollection<FilterRow>>) {
   		const activeRow = args.viewModel.activeRow;

   		if (activeRow) {
   			activeRow.ValueSt?.to(PXDatetimeFieldState).showRelativeDates();
   			activeRow.ValueSt2?.to(PXDatetimeFieldState).showRelativeDates();
   		}
   	}
}

export class FilterHeader extends PXView {

	@controlConfig({ displayMode: "text", nullText: NullTextValues.New })
	FilterID: PXFieldState;
	FilterName: PXFieldState;

	@controlConfig({ displayMode: "text" })
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	@controlConfig({ valueField: "Name", textField: "DisplayName" })
	ViewName: PXFieldState<PXFieldOptions.CommitChanges>;
	IsDefault: PXFieldState;
	IsSystem: PXFieldState;
}

@gridConfig({
	 preset: GridPreset.Details,
	 showFastFilter: GridFastFilterVisibility.False
})
export class FilterRow extends PXView {
	@columnConfig({ width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox })
	IsUsed: PXFieldState;

	@columnConfig({ width: 50 }) OpenBrackets: PXFieldState;

	@columnConfig({ width: 200, fullState: true }) DataField: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 100, fullState: true, editorType: "qp-drop-down", textAlign: TextAlign.Left })
	Condition: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ width: 200, fullState: true }) ValueSt: PXFieldState;

	@columnConfig({ width: 200, fullState: true }) ValueSt2: PXFieldState;

	@columnConfig({ width: 50 }) CloseBrackets: PXFieldState;

	@columnConfig({ width: 50 }) Operator: PXFieldState;
}
