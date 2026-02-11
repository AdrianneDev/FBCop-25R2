import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo
} from "client-controls";

import {
	PMWipAdjustment,
	PMWipAdjustmentFinancial,
	PMWipAdjustmentLine,
	CurrencyInfo
} from "./views";

@graphInfo({graphType: "PX.Objects.PM.ProjectWipAdjustmentEntry", primaryView: "Document" })
export class PM305600 extends PXScreen {
   	@viewInfo({containerName: "Selection"})
	Document = createSingle(PMWipAdjustment);
	CurrentDocument = createSingle(PMWipAdjustmentFinancial);
   	@viewInfo({containerName: "Items"})
	Items = createCollection(PMWipAdjustmentLine);
   	@viewInfo({containerName: "Approvals"})
	CurrencyInfo = createSingle(CurrencyInfo);
}