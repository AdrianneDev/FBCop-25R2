import {
	commitChanges,
	createCollection,
	createSingle,
	graphInfo,
	PXFieldState,
	PXView,
	PXScreen,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";

export class TaxPlugin extends PXView {
	@commitChanges TaxPluginID: PXFieldState;
	Description: PXFieldState;
	@commitChanges PluginTypeName: PXFieldState;
	TaxCalcMode: PXFieldState;
	IsActive: PXFieldState;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	adjustPageSize: true,
})
export class TaxPluginDetail extends PXView {
	SettingID: PXFieldState;
	Description: PXFieldState;
	Value: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	adjustPageSize: true,
	allowDelete: true,
	allowInsert: true,
})
export class TaxPluginMapping extends PXView {
	@columnConfig({ hideViewLink: true }) BranchID: PXFieldState;
	CompanyCode: PXFieldState;
}

@graphInfo({
	graphType: "PX.Objects.TX.TaxPluginMaint",
	primaryView: "Plugin"
})
export class TX102000 extends PXScreen {

	Plugin = createSingle(TaxPlugin);

	Details = createCollection(TaxPluginDetail);

	Mapping = createCollection(TaxPluginMapping);
}
