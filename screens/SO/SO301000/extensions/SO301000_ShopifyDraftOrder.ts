import {
	PXFieldState,
	PXFieldOptions,
} from "client-controls";
import {SOOrderHeader } from "../SO301000";

export interface SO301000_ShopifyDraftOrders extends SOOrderHeader { }
export class SO301000_ShopifyDraftOrders {
	ExternalQuoteStatus: PXFieldState<PXFieldOptions.Disabled>;
	ExternalQuoteNbr: PXFieldState<PXFieldOptions.Disabled>;
}
