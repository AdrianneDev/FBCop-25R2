// TODO: missing PXSelector.FilterByAllFields (https://jira.acumatica.com/browse/AC-290454)
// TODO: missing PXSelector.DisplayMode and PXSelector.TextField (https://jira.acumatica.com/browse/AC-285843)
// TODO: disable FastFilter in the grid (https://jira.acumatica.com/browse/AC-290459)
// TODO: hide Import from Excel button (https://jira.acumatica.com/browse/AC-290457)

import {
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	PXFieldOptions,
	gridConfig,
	columnConfig,
	GridColumnDisplayMode,
	GridPreset} from "client-controls";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@graphInfo({ graphType: "PX.Data.LEPMaint", primaryView: "Items" })
export class SM208500 extends PXScreenWithSiteMapSupport {
	Items = createCollection(ListEntryPoint);
}

@gridConfig({
	preset: GridPreset.Primary
})
export class ListEntryPoint extends PXView {
	IsActive: PXFieldState;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both, width: 300, hideViewLink: true })
	EntryScreenID: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ displayMode: GridColumnDisplayMode.Both, width: 300, hideViewLink: true })
	ListScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
}
