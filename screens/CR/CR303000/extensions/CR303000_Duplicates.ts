import { CellCssHandlerArgs, CustomEventType, handleEvent, PXFieldState } from "client-controls";
import { CRDuplicateRecordForMerging, DuplicatesBase } from "src/screens/CR/common/tabs/tab-duplicates/tab-duplicates";
import { CR303000 } from "../CR303000";

export interface CR303000_Duplicates extends CR303000, DuplicatesBase {}
export class CR303000_Duplicates extends DuplicatesBase {
	GetValueToCompare(fieldName: string, args: CellCssHandlerArgs) {
		return (<CR303000>args.screenModel).BAccount.getField(fieldName)?.value ??
					(<CR303000>args.screenModel).CurrentBAccount.getField(fieldName)?.value ??
						(<CR303000>args.screenModel).DefContact.getField(fieldName)?.value ??
							(<CR303000>args.screenModel).DefAddress.getField(fieldName)?.value ??
								(<CR303000>args.screenModel).BAccountActivityStatistics.getField(fieldName)?.value;
	}
}

export interface CR303000_CRDuplicateRecordForMerging extends CRDuplicateRecordForMerging { }
export class CR303000_CRDuplicateRecordForMerging {
	BAccountR__AcctName: PXFieldState;
	BAccountR__Status: PXFieldState;
	BAccountR__OwnerID: PXFieldState;
}
