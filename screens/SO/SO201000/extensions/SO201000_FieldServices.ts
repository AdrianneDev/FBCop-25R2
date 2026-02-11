import {
	PXFieldState,
	PXFieldOptions
} from "client-controls";
import { SO201000, SOOrderTypeHeaderSettings } from "../SO201000";

export interface SO201000_FieldServices extends SO201000 { }
export class SO201000_FieldServices {
}

export interface SOOrderTypeHeaderSettingsFS extends SOOrderTypeHeaderSettings { }
export class SOOrderTypeHeaderSettingsFS {
	EnableFSIntegration: PXFieldState<PXFieldOptions.CommitChanges>;
}
