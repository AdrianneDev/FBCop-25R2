import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState, GridFastFilterVisibility, linkCommand, PXFieldOptions, controlConfig, featureInstalled, FeaturesSet, GridNoteFilesShowMode } from "client-controls";
import { PM301500 } from "../PM301500";

export interface PM301500_ProjectInventory extends PM301500 { }
@featureInstalled(FeaturesSet.MaterialManagement)
export class PM301500_ProjectInventory {
	ProjectInventory = createCollection(ProjectInventory);
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	pageSize: 0,
	showFastFilter: GridFastFilterVisibility.ToolBar,
	showNoteFiles: GridNoteFilesShowMode.HideByDefault
})
export class ProjectInventory extends PXView {
	InventoryCD: PXFieldState;
	INSite__SiteCD: PXFieldState;
	INLocation__LocationCD: PXFieldState;
	INLocationStatusByCostCenter__QtyOnHand: PXFieldState;
	INCostStatus__TotalCost: PXFieldState;
	PMTask__TaskCD: PXFieldState;
	INCostCenter__CostLayerType: PXFieldState;
}