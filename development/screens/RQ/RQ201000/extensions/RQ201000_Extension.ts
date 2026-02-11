import { PXFieldState, PXFieldOptions } from "client-controls";
import {
	RQ201000,
	RQRequestClassHeader as RQRequestClassHeader_Base
} from "src/screens/RQ/RQ201000/RQ201000";

export interface RQ201000_Extension extends RQ201000 {}
export class RQ201000_Extension {}

export interface RQRequestClassHeader extends RQRequestClassHeader_Base {}
export class RQRequestClassHeader {
	UsrICFBShowPotentialLoss: PXFieldState;
	UsrICFBAllowOverrideCustomization: PXFieldState<PXFieldOptions.CommitChanges>;
}
