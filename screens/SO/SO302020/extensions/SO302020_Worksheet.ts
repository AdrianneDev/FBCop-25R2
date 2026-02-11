import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
	PXViewCollection,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
	GridNoteFilesShowMode,

	handleEvent,
	CustomEventType,
	RowCssHandlerArgs,
	RowSelectedHandlerArgs,
} from "client-controls";
import { SO302020 } from "../SO302020";

export interface SO302020_Worksheet extends SO302020 { }
export class SO302020_Worksheet {
	@viewInfo({ containerName: "Pick List Entries" })
	PickListOfPicker = createCollection(PickListEntriesForPick);

	@handleEvent(CustomEventType.GetRowCss, { view: "PickListOfPicker" })
	getPickListOfPickerRowCss(args: RowCssHandlerArgs<PXViewCollection<PickListEntriesForPick>>) {
		const shipLine = args?.selector?.row;

		if (shipLine == null) {
			return undefined;
		}
		else if (shipLine.PickedQty.value > shipLine.Qty.value) {
			return "startedLine excessedLine";
		}
		else if (shipLine.PickedQty.value === shipLine.Qty.value) {
			return "startedLine completedLine";
		}
		else if (shipLine.PickedQty.value > 0) {
			return "startedLine";
		}

		return undefined;
	}

	@handleEvent(CustomEventType.RowSelected, { view: "PickListOfPicker" })
	onPickListOfPickerSelected(args: RowSelectedHandlerArgs<PXViewCollection<PickListEntriesForPick>>) {
		const model = args.viewModel;

		if (model?.ReopenLineQty) {
			model.ReopenLineQty.enabled = !!args.viewModel.activeRow?.ForceCompleted.value;
		}
	}
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	allowUpdate: false,
})
export class PickListEntriesForPick extends PXView {
	ReopenLineQty: PXActionState;

	FitsWS: PXFieldState<PXFieldOptions.Disabled>;
	SiteID: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	LocationID: PXFieldState<PXFieldOptions.Disabled>;

	InventoryID: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	LotSerialNbr: PXFieldState<PXFieldOptions.Disabled>;

	ExpireDate: PXFieldState<PXFieldOptions.Disabled>;
	PickedQty: PXFieldState<PXFieldOptions.Disabled>;
	Qty: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	UOM: PXFieldState<PXFieldOptions.Disabled>;

	ShipmentNbr: PXFieldState<PXFieldOptions.Disabled>;
	ForceCompleted: PXFieldState<PXFieldOptions.Disabled>;

	@columnConfig({ hideViewLink: true })
	ToteID: PXFieldState<PXFieldOptions.Disabled>;
}
