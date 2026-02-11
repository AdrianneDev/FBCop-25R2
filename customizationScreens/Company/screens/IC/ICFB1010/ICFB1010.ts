import { Messages as SysMessages } from "client-controls/services/messages";
import { createCollection, createSingle, PXScreen, graphInfo, PXActionState, viewInfo, handleEvent, CustomEventType, actionConfig, RowSelectedHandlerArgs, PXViewCollection, PXPageLoadBehavior, ControlParameter, PXView, PXFieldState, gridConfig, treeConfig, fieldConfig, controlConfig, headerDescription, ICurrencyInfo, disabled, PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, TextAlign, GridPreset, GridFilterBarVisibility, GridFastFilterVisibility, ISelectorControlConfig } from "client-controls";

@graphInfo({graphType: "ICFBCustomization.Graph.Profile.ICFBLocationStatusMaint", primaryView: "LocationStatuses", })
export class ICFB1010 extends PXScreen {

	LocationStatuses = createCollection(ICFBLocationStatus);
}// Views

@gridConfig({
	showFastFilter: GridFastFilterVisibility.False,
	mergeToolbarWith: "ScreenToolbar",
	preset: GridPreset.Primary
})
export class ICFBLocationStatus extends PXView  {
@columnConfig({
  width: 140
})
	LocationStatusID : PXFieldState;
@columnConfig({
  width: 300
})
	Description : PXFieldState;
}