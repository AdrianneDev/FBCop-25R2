import { autoinject } from "aurelia-framework";
import { BaseApiClient } from "client-controls/client-controls";

const RESOURCE_ROUTE = "ui/customization-editor";

@autoinject
export class CustomizationEditorClient {
	constructor(protected client: BaseApiClient) {
	}

	getFieldsData(screenID: string): Promise<ICustomizationEditorTreeDto | undefined> {
		return this.client.getExt(
			`${RESOURCE_ROUTE}/fields?screen-id=${screenID}`,
			false,
			{ "content-type": "application/json" });
	}
}

export interface ICustomizationEditorTreeDto {
	views: { [key: string]: ICustomizationEditorTreeViewDto };
}

export interface ICustomizationEditorTreeViewDto {
	isGrid: boolean;
	isCustomized: boolean;
	isChanged: boolean;
	displayName?: string;
	order: number;
	fields: { [key: string]: ICustomizationEditorTreeFieldDto };
}

export interface ICustomizationEditorTreeFieldDto {
	isCustomized: boolean;
	isChanged: boolean;
	displayName: string;
	order: number;
}
