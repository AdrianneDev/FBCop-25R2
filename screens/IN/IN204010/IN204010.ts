import {
	PXScreen,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,

	createSingle,
	createCollection,

	graphInfo,
	viewInfo,
	gridConfig,
	GridPreset,
	GridAutoGrowMode,
} from "client-controls";
import { Address } from "src/screens/common/form-address/form-address";

@graphInfo({
	graphType: "PX.Objects.IN.INSiteBuildingMaint",
	primaryView: "Buildings",
	showActivitiesIndicator: true
})
export class IN204010 extends PXScreen {
	ViewOnMap: PXActionState;

	@viewInfo({ containerName: "Warehouse Building Summary" })
	Buildings = createSingle(INSiteBuilding);

	@viewInfo({ containerName: "Warehouses" })
	Sites = createCollection(INSite);

	@viewInfo({ containerName: "Address" })
	Address = createSingle(Address);
}

export class INSiteBuilding extends PXView {
	BuildingCD: PXFieldState;
	BranchID: PXFieldState<PXFieldOptions.CommitChanges>;
	Descr: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: true,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	pageSize: 15
})
export class INSite extends PXView {
	SiteCD: PXFieldState;
	Descr: PXFieldState;
	Active: PXFieldState;
}
