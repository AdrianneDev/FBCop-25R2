import {
	graphInfo,
	gridConfig,
	createSingle,
	createCollection,
	columnConfig,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	GridPreset
} from "client-controls";

@graphInfo({
	graphType: "PX.Objects.FS.CalendarComponentSetupMaint",
	primaryView: "SetupRecord",
	hideFilesIndicator: true,
	hideNotesIndicator: true
})
export class FS100500 extends PXScreen {
	StatusColorSelected = createSingle(FSAppointmentStatusColor);
	StatusColorRecords = createCollection(FSAppointmentStatusColor);
	AppointmentBoxFields = createCollection(AppointmentBoxComponentField);
	ServiceOrderFields = createCollection(ServiceOrderComponentField);
	UnassignedAppointmentFields = createCollection(UnassignedAppComponentField);
	SetupRecord = createSingle(FSSetup);
}

@gridConfig({
	preset: GridPreset.Details,
	autoRepaint: ["StatusColorSelected"],
	allowImport: true})
export class FSAppointmentStatusColor extends PXView {
	StatusID: PXFieldState<PXFieldOptions.CommitChanges>;
	StatusLabel: PXFieldState;
	BackgroundColor: PXFieldState;
	TextColor: PXFieldState;
	BandColor: PXFieldState;
	IsVisible: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "AppBoxFieldsPasteLineCmd"
})
export class AppointmentBoxComponentField extends PXView {
	@columnConfig({ allowDragDrop: true })
	@columnConfig({ editorType: "qp-drop-down" })
	ImageUrl: PXFieldState;

	@columnConfig({ fullState: true, allowDragDrop: true })
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	FieldName: PXFieldState;

	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: true,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "SOGridFieldsPasteLineCmd"
})
export class ServiceOrderComponentField extends PXView {
	@columnConfig({ fullState: true, allowDragDrop: true })
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	FieldName: PXFieldState;

	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowImport: true,
	initNewRow: true,
	allowDragRows: true,
	pasteCommand: "UAGridFieldsPasteLineCmd"
})
export class UnassignedAppComponentField extends PXView {
	@columnConfig({ fullState: true, allowDragDrop: true })
	ObjectName: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowDragDrop: true })
	FieldName: PXFieldState;

	IsActive: PXFieldState;
}

export class FSSetup extends PXView {
}
