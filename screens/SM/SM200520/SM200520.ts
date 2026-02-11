// TODO: Apply to Multiple Tenants smart panel loses its DialogResult (https://jira.acumatica.com/browse/AC-290473)
// TODO: hide Import from Excel button (https://jira.acumatica.com/browse/AC-290457)
// TODO: toolbar actions are in invalid order (https://jira.acumatica.com/browse/AC-290471)

import {
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	columnConfig,
	viewInfo,
	GridPagerMode,
	GridPreset,
	customDataHandler,
	localizable,
	createSingle,
	Messages as SysMessages
} from "client-controls";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@localizable
export class SiteMapMessages {
    static Copy: string = "Copy";
}

@graphInfo({
	graphType: "PX.SiteMap.Graph.SiteMapMaint",
	primaryView: "SiteMap",
})
export class SM200520 extends PXScreenWithSiteMapSupport {
	SysMessages = SysMessages;
	SiteMapMessages = SiteMapMessages;

	SiteMap = createCollection(SiteMap);

	@viewInfo({ containerName: "Copy UI Setting to Tenants" })
	ViewCompanyListFilter = createSingle(ViewCompanyListFilter);
}

@gridConfig({
	preset: GridPreset.Primary,
	// TODO: add "fastFilterByAllFields: false" once available in the main UI Pool branch
})
export class SiteMap extends PXView {
	@columnConfig({ allowFastFilter: true })
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowFastFilter: true })
	Title: PXFieldState;

	@columnConfig({ allowFastFilter: false, fullState: true }) // TODO: remove allowFastFilter: false once fastFilterByAllFields is available
	SelectedUI: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowFastFilter: false })
	Url: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ allowFastFilter: false })
	Graphtype: PXFieldState;

	@columnConfig({ allowFastFilter: false })
	Workspaces: PXFieldState;

	@columnConfig({ allowFastFilter: false })
	Category: PXFieldState;

	@columnConfig({ allowFastFilter: false })
	ListIsEntryPoint: PXFieldState;
}

export class ViewCompanyListFilter extends PXView {
	SelectedCompany: PXFieldState<PXFieldOptions.CommitChanges>;
}
