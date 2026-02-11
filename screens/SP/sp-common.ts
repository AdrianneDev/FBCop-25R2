import { autoinject } from 'aurelia-framework';
import { localizable } from "client-controls/services/localization";
import { Messages as SysMessages } from 'client-controls/services/messages';

@localizable
export class SPMessages extends SysMessages {
	static Close: string = "Close";
}

(<any>window).DisableWhitelistWarning = true;
