import {
	PXView,
	PXFieldState,

	createSingle,

	viewInfo,
} from "client-controls";
import { IN208900 } from "../IN208900";

export interface IN208900_AddInventory extends IN208900 { }
export class IN208900_AddInventory {
	@viewInfo({ containerName: "Add Items" })
	InventoryFilter = createSingle(INPIInventoryFilter);
}

export class INPIInventoryFilter extends PXView {
	StartInventoryID: PXFieldState;
	EndInventoryID: PXFieldState;
}