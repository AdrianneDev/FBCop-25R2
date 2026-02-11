import {
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";

export abstract class ImportCCPaymentBase {
	ImportDocumentPaymentCreate: PXActionState;

	@viewInfo({ containerName: "Import CC Payment" })
	ImportExternalTran = createSingle(SOImportExternalTran);
}

export class SOImportExternalTran extends PXView {
	TranNumber: PXFieldState<PXFieldOptions.CommitChanges>;
	ProcessingCenterID: PXFieldState<PXFieldOptions.CommitChanges>;
}