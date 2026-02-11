import { PXFieldState, columnConfig } from "client-controls";
import { MailingPrintingPreferencesBase, NotificationSetup } from "src/screens/CR/common/tabs/tab-mailing-printing-preferences/tab-mailing-printing-preferences";
import { SO101000 } from "../SO101000";

export interface SO101000_MailingPrintingPreferences extends SO101000, MailingPrintingPreferencesBase {}
export class SO101000_MailingPrintingPreferences extends MailingPrintingPreferencesBase {}

export interface SO101000_NotificationSource extends NotificationSetup { }
export class SO101000_NotificationSource {
	@columnConfig({ hideViewLink: true })
	ShipVia: PXFieldState;
}
