import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, gridConfig, GridPreset, columnConfig, PXView, PXFieldState, PXFieldOptions, controlConfig } from "client-controls";

@graphInfo({graphType: "PX.Objects.GL.GLAccessByPrinter", primaryView: "Printers"})
export class SM106001 extends PXScreen {

   	@viewInfo({containerName: "Printer"})
	Printers = createSingle(SMPrinter);

   	@viewInfo({containerName: "Restriction Groups"})
	Groups = createCollection(RelationGroup);
}

export class SMPrinter extends PXView  {
	@controlConfig({ allowEdit: true, displayMode: "text" })
	PrinterID: PXFieldState<PXFieldOptions.CommitChanges>;

	DeviceHubID: PXFieldState;
	Description: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowDelete: false,
	allowInsert: false
})
export class RelationGroup extends PXView  {
	@columnConfig({allowCheckAll: true })
	Included: PXFieldState;
	@columnConfig({ hideViewLink: true })
	GroupName: PXFieldState;
	Description: PXFieldState;
	Active: PXFieldState;
	GroupType: PXFieldState;
}