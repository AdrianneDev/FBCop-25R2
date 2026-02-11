import {
	createCollection,
	viewInfo,
} from "client-controls";
import { NotificationSetup, MailingPrintingPreferencesBase } from "src/screens/CR/common/tabs/tab-mailing-printing-preferences/tab-mailing-printing-preferences";
import { CL301000 } from "../CL301000";

export interface CL301000_MailingPrintingPreferences extends CL301000, MailingPrintingPreferencesBase {}
export class CL301000_MailingPrintingPreferences extends MailingPrintingPreferencesBase {

	@viewInfo({ containerName: "Default Sources" })
	ComplianceNotifications = createCollection(NotificationSetup);
}
