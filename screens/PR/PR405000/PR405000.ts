import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, PXActionState } from "client-controls";
import { PRPayment, PRTaxFormBatch, PayrollDocumentsFilter } from "./views";

@graphInfo({graphType: "PX.Objects.PR.PRPayStubInq", primaryView: "Filter" })
export class PR405000 extends PXScreen {
	ViewStubReport: PXActionState;
	ViewTaxForm: PXActionState;

	@viewInfo({containerName: "Pay Stubs"})
	PayChecks = createCollection(PRPayment);

	@viewInfo({containerName: "Annual Forms"})
	TaxForms = createCollection(PRTaxFormBatch);

	@viewInfo({ syncAlways: true })
	Filter = createSingle(PayrollDocumentsFilter);
}
