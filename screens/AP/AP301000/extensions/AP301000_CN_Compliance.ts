import { PXFieldState, PXFieldOptions, placeBeforeProperty } from "client-controls";
import { ComplianceDocumentBase, ComplianceDocuments } from "src/screens/PM/common/tabs/tab-compliance/tab-compliance";
import { AP301000 } from "../AP301000";

export interface AP301000_Compliance extends AP301000, ComplianceDocumentBase {}
export class AP301000_Compliance extends ComplianceDocumentBase {}

export interface AP301000_ComplianceDocuments extends ComplianceDocuments {}
export class AP301000_ComplianceDocuments extends ComplianceDocuments {

    @placeBeforeProperty("ExpirationDate")
    LinkToPayment: PXFieldState<PXFieldOptions.CommitChanges>;
}
