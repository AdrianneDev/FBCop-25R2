import { PXFieldState } from "client-controls";
import {
	GL202500,
	AccountRecords as AccountRecords_Base
} from "src/screens/GL/GL202500/GL202500";

export interface GL202500_Extension extends GL202500 {}
export class GL202500_Extension {}

// Extend the view class to add custom fields as grid columns
export interface AccountRecords extends AccountRecords_Base {}
export class AccountRecords {
	UsrICFBIsAccrualAccount: PXFieldState;
	UsrICFBIsRevalueOtherGLAccounts: PXFieldState;
}
