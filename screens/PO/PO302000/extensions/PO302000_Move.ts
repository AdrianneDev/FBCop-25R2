import {
	PXView,
	PXFieldState,
	viewInfo,
	createSingle,
} from "client-controls";
import { PO302000 } from "../PO302000";

export interface PO302000_Move extends PO302000 { }
export class PO302000_Move {
	@viewInfo({ containerName: "Move" })
	poReceiptAMBatch = createSingle(POReceiptAMBatch);
}

export class POReceiptAMBatch extends PXView {
	BatNbr: PXFieldState;
	DocType: PXFieldState;
	Status: PXFieldState;
	TranDate: PXFieldState;
	FinPeriodID: PXFieldState;
}
