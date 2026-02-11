import {
	PXView,
	PXFieldState,
	PXFieldOptions,

	createSingle,

	viewInfo,
} from "client-controls";
import { SO302020 } from "../SO302020";

export interface SO302020_UserSetup extends SO302020 { }
export class SO302020_UserSetup {
	@viewInfo({ containerName: "User Setup" })
	UserSetupView = createSingle(UserSetup);
}

export class UserSetup extends PXView {
	DefaultLocationFromShipment: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultLotSerialFromShipment: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintShipmentConfirmation: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintShipmentLabels: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintCommercialInvoices: PXFieldState<PXFieldOptions.CommitChanges>;
	UseScale: PXFieldState<PXFieldOptions.CommitChanges>;
	ScaleDeviceID: PXFieldState<PXFieldOptions.CommitChanges>;
	EnterSizeForPackages: PXFieldState<PXFieldOptions.CommitChanges>;
}