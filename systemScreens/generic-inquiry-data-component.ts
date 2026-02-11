import { noView } from "aurelia-framework";
import {
	IDataComponent, IDataComponentParams, PXScreen,
	IFieldsetLayout, IFieldsetSingleLayout, ScreenUpdateParams
} from "client-controls";
import { GI000000 } from "./GenericInquiry";

@noView
export class GenericInquiryDataComponent implements IDataComponent {
	constructor(private screenVM: PXScreen) {
	}
	getQueryParams(queryParams?: ScreenUpdateParams): IDataComponentParams {
		return {};
	}
	setComponentData(result: IGenericInquiryLayout): void {
		const giScreen = this.screenVM as GI000000;
		const layouts: IFieldsetSingleLayout[] = [];
		result.fields.forEach(fieldArray => {
			layouts.push({
				fields: fieldArray,
				viewName: "Filter",
			});
		});
		giScreen.layout = layouts;

		if (!giScreen.gridVM) return;

		if (result.pageSize) {
			giScreen.gridVM.config.adjustPageSize = false;
			giScreen.gridVM.config.pageSize = result.pageSize;
		}
		giScreen.gridVM.config.exportRowsLimit = result.exportTop;
	}
}

export interface IGenericInquiryLayout extends IFieldsetLayout {
	pageSize?: number;
	exportTop?: number;
}
