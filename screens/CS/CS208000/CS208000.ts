import {
	PXScreen,
	createSingle,
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	PXActionState,
	viewInfo,
	headerDescription,
	gridConfig,
	GridFastFilterVisibility,
	GridPreset
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.CS.ShipTermsMaint", primaryView: "ShipTermsCurrent" })
export class CS208000 extends PXScreen {

	ViewDocument: PXActionState;

	@viewInfo({ containerName: "Shipping Terms Summary" })
	ShipTermsCurrent = createSingle(ShipTermsCurrent);
	@viewInfo({ containerName: "Terms Details" })
	ShipTermsDetail = createCollection(ShipTermsDetail);
}

export class ShipTermsCurrent extends PXView {
	ShipTermsID: PXFieldState;
	@headerDescription
	Description: PXFieldState;
	FreightAmountSource: PXFieldState<PXFieldOptions.CommitChanges>;
	PacejetFreightTerm: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	showFastFilter: GridFastFilterVisibility.False
})
export class ShipTermsDetail extends PXView {
	BreakAmount: PXFieldState;
	FreightCostPercent: PXFieldState;
	InvoiceAmountPercent: PXFieldState;
	ShippingHandling: PXFieldState;
	LineHandling: PXFieldState;
}
