import { autoinject } from "aurelia-framework";

import {
	createCollection,
	graphInfo,
	PXFieldState,
	PXView,
	PXScreen,
	PXFieldOptions,
	gridConfig,
	GridPreset,
	columnConfig,
	linkCommand,
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.TX.ExternalTaxPost",
	primaryView: "Items"
})
@autoinject
export class TX501500 extends PXScreen {
	Items = createCollection(Document);
}

@gridConfig({ preset: GridPreset.Processing })
export class Document extends PXView {
	ProcessingStatus: PXFieldState<PXFieldOptions.Hidden>;
	ProcessingMessage: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ allowCheckAll: true, allowSort: false })
	Selected: PXFieldState;

	Module: PXFieldState;
	DocType: PXFieldState;

	@linkCommand("ViewDocument")
	RefNbr: PXFieldState;

	DocDate: PXFieldState;

	FinPeriodID: PXFieldState;
	Amount: PXFieldState;
	CuryID: PXFieldState;
	DocDesc: PXFieldState;
}
