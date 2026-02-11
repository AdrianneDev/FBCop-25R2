import { autoinject, localizable, PXView } from "client-controls";
import { customElement } from "aurelia-framework";

import "./sp-ordered-items.scss";

@localizable
export class Messages {
    static Item = "Item";
    static Price = "Price";
    static UnitOfMeasure = "Unit of Measure";
    static Qty = "Qty.";
    static Quantity = "Quantity";
    static Discount = "Discount";
    static Total = "Total Price";
}

@autoinject
@customElement('sp-ordered-items')
export abstract class SPOrderedItems extends PXView {
    msg = Messages;
}