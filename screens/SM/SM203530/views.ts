import {PXView, PXFieldState, gridConfig, linkCommand, PXActionState, localizable, actionConfig } from "client-controls";

// Views

@localizable
class Messages {
	static Up = "Move Up";
	static Down = "Move Down";
}

@gridConfig({
	allowDelete: false, allowInsert: false, allowUpdate: false,
	adjustPageSize: true, syncPosition: true, keepPosition: true,
	actionsConfig: {
		MoveCompanyUp: {images: { normal: "main@ArrowUp"}, text: Messages.Up},
		MoveCompanyDown: {images: { normal: "main@ArrowDown"}, text: Messages.Down},
	},
})
export class UPCompany extends PXView {
	@actionConfig({
		popupCommand: "Refresh" // can't do it on backend as it breaks logic of the Classic UI
	})
	InsertCompanyCommand: PXActionState;
	MoveCompanyUp: PXActionState;
	MoveCompanyDown: PXActionState;

	Current: PXFieldState;
	@linkCommand("UPCompany_View")
	CompanyID: PXFieldState;
	CompanyCD: PXFieldState;
	LoginName: PXFieldState;
	Status: PXFieldState;
}
