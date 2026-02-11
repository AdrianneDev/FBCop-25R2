import {
	createCollection,
	PXScreen,
	graphInfo,
	gridConfig,
	GridPreset,
	PXView,
	columnConfig,
	TextAlign, GridColumnType, PXFieldState
} from "client-controls";

@graphInfo({graphType: "PX.OAuthClient.ExternalApplicationProcess", primaryView: "ExternalApplications", })
export class SM501000 extends PXScreen {

	ExternalApplications = createCollection(OAuthAuthorizationProcessingModel);
}

@gridConfig({
	preset: GridPreset.Processing,
	fastFilterByAllFields: false,
	allowUpdate: false
})
export class OAuthAuthorizationProcessingModel extends PXView  {
	@columnConfig({allowCheckAll: true, width: 60, textAlign: TextAlign.Center, type: GridColumnType.CheckBox})
	Selected: PXFieldState;
	@columnConfig({textAlign: TextAlign.Right})
	ApplicationID: PXFieldState;
	ApplicationType: PXFieldState;
	@columnConfig({width: 200})
	ApplicationName: PXFieldState;
	@columnConfig({width: 90, format: "g"})
	ExpiresOn: PXFieldState;
	@columnConfig({width: 200})
	Bearer: PXFieldState;
}
