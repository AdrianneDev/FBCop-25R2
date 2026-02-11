import {
	PXView,
	PXFieldState,
	createSingle,
	viewInfo,
	PXFieldOptions,
} from "client-controls";
import { SalesforceBase } from "src/screens/SF/common/tabs/tab-salesforce/tab-salesforce";
import { CR306000 } from "../CR306000";

export interface CR306000_Salesforce extends CR306000, SalesforceBase {}
export class CR306000_Salesforce extends SalesforceBase {
	@viewInfo({ containerName: "Owner User" })
	OwnerUser = createSingle(Users);
}

export class Users extends PXView {
	PKID: PXFieldState<PXFieldOptions.Hidden>;
}
