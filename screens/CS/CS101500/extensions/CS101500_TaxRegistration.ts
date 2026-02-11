import {
	PXView, PXFieldState, PXFieldOptions, gridConfig, GridPreset,
	createCollection, viewInfo, featureInstalled
} from "client-controls";

import { CS101500 } from "../CS101500";

export interface CS101500_TaxRegistration extends CS101500 { }
@featureInstalled("PX.Objects.CS.FeaturesSet+CanadianLocalization")
export class CS101500_TaxRegistration {
	@viewInfo({ containerName: "Taxes" })
	Taxes = createCollection(TaxRegistration);
}

@gridConfig({ preset: GridPreset.Details })
export class TaxRegistration extends PXView {
	TaxID: PXFieldState<PXFieldOptions.CommitChanges>;
	TaxID_Tax_descr: PXFieldState;
	TaxRegistrationNumber: PXFieldState;
}
