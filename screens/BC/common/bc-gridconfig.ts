import {
	gridConfig,
	GridPreset,
	GridPagerMode,
	GridAutoGrowMode,
} from "client-controls";

export const shortListGridConfig = gridConfig({
	preset: GridPreset.ShortList,
	autoGrowInHeight: GridAutoGrowMode.Fit,
	initNewRow: true,
	syncPosition: true,
	pagerMode: GridPagerMode.NextPrevFirstLast,
	adjustPageSize: true,
	allowFilter: true,
	actionsConfig: { adjust: { hidden: false }, exportToExcel: { hidden: false } },
});
