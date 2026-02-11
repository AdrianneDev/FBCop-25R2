import {
	AR301000
} from "../AR301000";

import {
	PXView, createCollection, createSingle, PXFieldState, PXFieldOptions, featureInstalled, PXActionState,
	linkCommand, localizable, gridConfig, columnConfig, viewInfo, GridPreset
} from "client-controls";


export interface AR301000_Retainage extends AR301000 { }

@featureInstalled("PX.Objects.CS.FeaturesSet+Retainage")
export class AR301000_Retainage {
	@viewInfo({ containerName: "Retainage" })
	RetainageDocuments = createCollection(ARRetainageInvoice);
}

@gridConfig({ preset: GridPreset.Details })
export class ARRetainageInvoice extends PXView {

	DocType: PXFieldState;

	@linkCommand("ViewRetainageDocument")
	RefNbr: PXFieldState;
	DocDate: PXFieldState;

	@columnConfig({ hideViewLink: true })
	FinPeriodID: PXFieldState;

	Status: PXFieldState;
	CuryRetainageReleasedAmt: PXFieldState;
	CuryRetainagePaidAmt: PXFieldState;
	CuryOrigDocAmt: PXFieldState;
	PaymentMethodID: PXFieldState;
	InvoiceNbr: PXFieldState;
	DocDesc: PXFieldState;
}
