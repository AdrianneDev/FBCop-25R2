import {
	PXFieldState,
	PXFieldOptions,
} from "client-controls";

import { AP202010 } from "../AP202010";
import { AddItemLookupBase, AddItemLookupParameters, AddItemLookupResults } from "src/screens/IN/common/panel-add-item-lookup/panel-add-item-lookup";

export interface AP202010_AddItemLookup extends AP202010, AddItemLookupBase { }
export class AP202010_AddItemLookup extends AddItemLookupBase { }

export interface AP202010_AddItemLookupParameters extends AddItemLookupParameters { }
export class AP202010_AddItemLookupParameters {
	VendorID: PXFieldState<PXFieldOptions.CommitChanges>;
}

export interface AP202010_AddItemLookupResults extends AddItemLookupResults { }
export class AP202010_AddItemLookupResults {
	ProductWorkgroupID: PXFieldState;
	ProductManagerID: PXFieldState;
}
