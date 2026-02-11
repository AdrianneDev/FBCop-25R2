import { CustomEventType, GridColumnShowHideMode, PXFieldOptions, PXFieldState, PXViewCollection, RowSelectedHandlerArgs, columnConfig, handleEvent, linkCommand, CellCssHandlerArgs } from "client-controls";
import { CRDuplicateRecordForMerging, CRDuplicateRecordForLinking, DuplicatesBase } from "src/screens/CR/common/tabs/tab-duplicates/tab-duplicates";
import { CR302000 } from "../CR302000";

export interface CR302000_Duplicates extends CR302000, DuplicatesBase {}
export class CR302000_Duplicates extends DuplicatesBase {
	// temporary workaround until the AC-310687 is fixed
	@handleEvent(CustomEventType.RowSelected, { view: "DuplicatesForMerging" })
	onDuplicateForMergingSelected(args: RowSelectedHandlerArgs<PXViewCollection<CRDuplicateRecordForMerging>>) {
		const model = args.viewModel;

		if (model?.DuplicateMerge) {
			model.DuplicateMerge.enabled = !!args.viewModel.activeRow?.CanBeMerged.value;
		}
	}

	GetValueToCompare(fieldName: string, args: CellCssHandlerArgs) {
		return (<CR302000>args.screenModel).Contact.getField(fieldName)?.value ??
					(<CR302000>args.screenModel).ContactCurrent.getField(fieldName)?.value ??
						(<CR302000>args.screenModel).AddressCurrent.getField(fieldName)?.value ??
							(<CR302000>args.screenModel).ContactActivityStatistics.getField(fieldName)?.value;
	}
}

export interface CR302000_CRDuplicateRecordForMerging extends CRDuplicateRecordForMerging { }
export class CR302000_CRDuplicateRecordForMerging {
	@linkCommand<CRDuplicateRecordForMerging>("ViewMergingDuplicate")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	DuplicateContact__DisplayName: PXFieldState;
	DuplicateContact__FullName: PXFieldState;
	DuplicateContact__OwnerID: PXFieldState;
	DuplicateContactID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__FirstName: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__LastName: PXFieldState<PXFieldOptions.Hidden>;
}

export interface CR302000_CRDuplicateRecordForLinking extends CRDuplicateRecordForLinking { }
export class CR302000_CRDuplicateRecordForLinking {
	DuplicateContact__FullName: PXFieldState;
}
