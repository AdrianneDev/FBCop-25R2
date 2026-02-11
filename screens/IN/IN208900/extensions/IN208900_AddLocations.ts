import {
	PXView,
	PXFieldState,

	createSingle,

	viewInfo,
} from "client-controls";
import { IN208900 } from "../IN208900";

export interface IN208900_AddLocations extends IN208900 { }
export class IN208900_AddLocations {
	@viewInfo({ containerName: "Add Locations" })
	LocationFilter = createSingle(INPILocationFilter);
}

export class INPILocationFilter extends PXView {
	StartLocationID: PXFieldState;
	EndLocationID: PXFieldState;
}