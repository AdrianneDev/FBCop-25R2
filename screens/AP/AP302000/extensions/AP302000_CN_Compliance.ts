import { ComplianceDocumentBase, ComplianceDocuments } from "src/screens/PM/common/tabs/tab-compliance/tab-compliance";
import { AP302000 } from "../AP302000";
import {
	PXView, createCollection, PXFieldState, gridConfig, PXActionState, GridPreset, columnConfig,
	viewInfo
} from "client-controls";


export interface AP302000_Compliance extends AP302000, ComplianceDocumentBase {}
export class AP302000_Compliance extends ComplianceDocumentBase {
	@viewInfo({containerName: "Line Details"})
	ComplianceDetails = createCollection(ComplianceDetails);
}

export interface AP302000_ComplianceDocuments extends ComplianceDocuments {}
export class AP302000_ComplianceDocuments extends ComplianceDocuments {
	ComplianceViewDetails: PXActionState;
	SetAsFinal: PXActionState;
}


@gridConfig({ preset: GridPreset.Details, allowDelete: false, allowInsert: false, allowUpdate: false })
export class ComplianceDetails extends PXView {

	DocType: PXFieldState;
	RefNbr: PXFieldState;
	LineNbr: PXFieldState;

	@columnConfig({ hideViewLink: true })
	APInvoice__CuryID: PXFieldState;

	AmountPaid: PXFieldState;

}
