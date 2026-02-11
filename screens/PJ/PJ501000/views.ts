import {
	columnConfig,
	gridConfig,
	linkCommand,
	GridColumnDisplayMode,
	GridColumnShowHideMode,
	GridPreset,
	PXFieldState,
	PXView,
	TextAlign
} from "client-controls";

@gridConfig({ preset: GridPreset.Processing })
export class RequestsForInformation extends PXView {
	@columnConfig({
		allowCheckAll: true,
		allowShowHide: GridColumnShowHideMode.False
	})
	Selected: PXFieldState;
	@linkCommand("RequestsForInformation_ViewDetails")
	RequestForInformationCd: PXFieldState;
	Summary: PXFieldState;
	Status: PXFieldState;
	Reason: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		width: 80
	})
	PriorityId: PXFieldState;
	DueResponseDate: PXFieldState;
	@columnConfig({ hideViewLink: true })
	ClassId: PXFieldState;
	@linkCommand("RequestsForInformation_EntityDetails")
	BusinessAccountId: PXFieldState;
	@linkCommand("RequestsForInformation_ContactDetails")
	@columnConfig({
		displayMode: GridColumnDisplayMode.Text,
		textAlign: TextAlign.Left,
		width: 150
	})
	ContactId: PXFieldState;
	@columnConfig({
		hideViewLink: true,
		textAlign: TextAlign.Left,
		width: 150
	})
	OwnerId: PXFieldState;
	CreationDate: PXFieldState;
}
