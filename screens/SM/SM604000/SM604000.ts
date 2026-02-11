import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, RowSelectedHandlerArgs, PXViewCollection } from "client-controls";
import { MainInformationFilterClass, LicenseStatisticMonthlyView, SMLicenseStatisticDailyView, SMLicenseViolations, HistoryFilterClass, ConstraintHistoryView, TransactionData, TransactionDataFilter, SMLicenseERPTranDetailsAction, ErpTranDocDetailsRecord } from "./views";

@graphInfo({graphType: "PX.Data.Licensing.SM.SMLicenseManagment", primaryView: "MainInformationFilter", hideFilesIndicator: true, hideNotesIndicator: true, hideScreenToolbar: true})
export class SM604000 extends PXScreen {

	RecognitionHistory: PXActionState;
	@viewInfo({containerName: "License Monitoring Console"})
	MainInformationFilter = createSingle(MainInformationFilterClass);
	@viewInfo({containerName: "Monthly"})
	LicenseStatisticMonthly = createCollection(LicenseStatisticMonthlyView);


	@viewInfo({containerName: "Daily"})
	LicenseStatisticDaily = createCollection(SMLicenseStatisticDailyView);


	@viewInfo({containerName: "Violation History"})
	Violations = createCollection(SMLicenseViolations);


	@viewInfo({containerName: "Constraint History"})
	HistoryFilter = createSingle(HistoryFilterClass);
	@viewInfo({containerName: "Constraint History"})
	ConstraintHistory = createCollection(ConstraintHistoryView);


	@viewInfo({containerName: "Transaction Details"})
	TransactionDetailsFilter = createSingle(TransactionDataFilter);
	@viewInfo({containerName: "Transaction Details"})
	TransactionDetails = createCollection(TransactionData);


	@viewInfo({containerName: "Transaction Details"})
	TransactionDetailsActions = createCollection(SMLicenseERPTranDetailsAction);


	@viewInfo({containerName: "Transaction Details"})
	TranDocumentDetails = createCollection(ErpTranDocDetailsRecord);

}
