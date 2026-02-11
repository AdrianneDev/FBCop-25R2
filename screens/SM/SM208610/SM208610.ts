import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, gridConfig, GridPreset, GridNoteFilesShowMode } from "client-controls";
import { DashboardV2, Role, DashboardParameterV2, WidgetV2 } from "./views";

@graphInfo({graphType: "PX.Dashboards.DashboardV2Maint", primaryView: "Dashboards", })
export class SM208610 extends PXScreen {

   	@viewInfo({containerName: "Dashboard Summary"})
	Dashboards = createSingle(DashboardV2);
   	@viewInfo({containerName: "Visible To:"})
	EntityRoles = createCollection(Role);
   	@viewInfo({containerName: "Parameters"})
	Parameters = createCollection(DashboardParameterV2);

	@viewInfo({containerName: "Widgets"})
	@gridConfig({
		preset: GridPreset.Details,
		allowInsert: false,
		showNoteFiles: GridNoteFilesShowMode.Suppress,
		adjustPageSize: true
	})
	AllWidgets = createCollection(WidgetV2);

	// For hidden tab to support widgets in copy-paste operations
	@gridConfig({
		preset: GridPreset.Details,
		showNoteFiles: GridNoteFilesShowMode.Suppress,
		pageSize: 1
	})
	CopyPasteWidgets = createCollection(WidgetV2);
}