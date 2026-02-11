import { CellCssHandlerArgs, CustomEventType, GridColumnShowHideMode, IPXScreen, PXFieldOptions, PXFieldState, columnConfig, handleEvent, linkCommand } from "client-controls";
import { DuplicatesBase, CRDuplicateRecordForMerging } from "src/screens/CR/common/tabs/tab-duplicates/tab-duplicates";
import { CR301000 } from "../CR301000";

export interface CR301000_Duplicates extends CR301000, DuplicatesBase {}
export class CR301000_Duplicates extends DuplicatesBase {
	GetValueToCompare(fieldName: string, args: CellCssHandlerArgs) {
		return (<CR301000>args.screenModel).Lead.getField(fieldName)?.value ??
					(<CR301000>args.screenModel).LeadCurrent.getField(fieldName)?.value ??
						(<CR301000>args.screenModel).AddressCurrent.getField(fieldName)?.value ??
							(<CR301000>args.screenModel).LeadActivityStatistics.getField(fieldName)?.value;
	}
}

export interface CR301000_CRDuplicateRecordForMerging extends CRDuplicateRecordForMerging { }
export class CR301000_CRDuplicateRecordForMerging {
	@linkCommand<CRDuplicateRecordForMerging>("ViewMergingDuplicate")
	@columnConfig({ allowShowHide: GridColumnShowHideMode.False })
	DuplicateContact__DisplayName: PXFieldState;
	DuplicateContact__FullName: PXFieldState;
	CRLead__Description: PXFieldState;
	@linkCommand<CRDuplicateRecordForMerging>("ViewMergingDuplicateRefContact")
	CRLead__RefContactID: PXFieldState;
	CRLead__Status: PXFieldState;
	DuplicateContact__Source: PXFieldState;
	DuplicateContact__OwnerID: PXFieldState;
	DuplicateContactID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__CampaignID: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__FirstName: PXFieldState<PXFieldOptions.Hidden>;
	DuplicateContact__LastName: PXFieldState<PXFieldOptions.Hidden>;
}
