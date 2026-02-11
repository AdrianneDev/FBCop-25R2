import {
	PXFieldState,
	PXFieldOptions,
	columnConfig,
} from "client-controls";

import { AR202010 } from "../AR202010";
import { AddItemLookupBase, AddItemLookupParameters, AddItemLookupResults } from "src/screens/IN/common/panel-add-item-lookup/panel-add-item-lookup";

export interface AR202010_AddItemLookup extends AR202010, AddItemLookupBase { }
export class AR202010_AddItemLookup extends AddItemLookupBase { }

export interface AR202010_AddItemLookupParameters extends AddItemLookupParameters { }
export class AR202010_AddItemLookupParameters {
	PriceType: PXFieldState<PXFieldOptions.CommitChanges>;
	PriceCode: PXFieldState<PXFieldOptions.CommitChanges>;
	SkipLineDiscounts: PXFieldState<PXFieldOptions.CommitChanges>;
}

export interface AR202010_AddItemLookupResults extends AddItemLookupResults { }
export class AR202010_AddItemLookupResults {

	@columnConfig({ hideViewLink: true })
	PriceWorkgroupID: PXFieldState;

	PriceManagerID: PXFieldState;
}
