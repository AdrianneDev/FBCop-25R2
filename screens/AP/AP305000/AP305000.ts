import { CABatch, CABatchDetail, APPayment, AddendaInfo_APPayment, AddPaymentsFilter, VoidFilter } from "./views";
import { PXActionState, graphInfo, PXScreen, createSingle, createCollection, viewInfo } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CA.CABatchEntry", primaryView: "Document", bpEventsIndicator: true, showUDFIndicator: true })
export class AP305000 extends PXScreen {

	ViewAPDocument: PXActionState;

	@viewInfo({containerName: "Batch Summary"})
	Document = createSingle(CABatch);

	@viewInfo({containerName: "Payments"})
	BatchPayments = createCollection(CABatchDetail);

	@viewInfo({containerName: "Payments -> Reference Nbr. (RefNbr)"})
	AddendaInfo = createCollection(AddendaInfo_APPayment);

	@viewInfo({containerName: "Add Payments -> Payment Selection"})
	filter = createSingle(AddPaymentsFilter);

	@viewInfo({containerName: "Add Payments"})
	AvailablePayments = createCollection(APPayment);

	@viewInfo({containerName: "Void Batch Payments -> Void Batch Payments"})
	voidFilter = createSingle(VoidFilter);

}
