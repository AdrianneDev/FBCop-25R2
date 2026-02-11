import {
	PXView,
	PXActionState,
	PXFieldState,

	createCollection,

	viewInfo,
	gridConfig,
	columnConfig,
	GridPreset,
} from "client-controls";
import { IN101000 } from "../IN101000";

export interface IN101000_RestrictionGroups extends IN101000 { }
export class IN101000_RestrictionGroups {
	@viewInfo({ containerName: "Restriction Groups" })
	Groups = createCollection(RestrictionGroups);
}

@gridConfig({
	preset: GridPreset.Details,
})
export class RestrictionGroups extends PXView {
	ViewRestrictionGroup: PXActionState;

	@columnConfig({ hideViewLink: true })

	Description: PXFieldState;
	Active: PXFieldState;

	@columnConfig({ hideViewLink: true })
	GroupType: PXFieldState;
}
