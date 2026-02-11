import { noView } from "aurelia-framework";
import {
	IDataComponent, IDataComponentParams, PXScreen
} from "client-controls";

@noView
export class ThemeVariablesDataComponent implements IDataComponent {
	constructor(private screenVM: PXScreen) {
	}

	getQueryParams(): IDataComponentParams {
		return {};
	}

	setComponentData(result: { variables: string }): void {
		const screen = this.screenVM;
		screen.setColors(result);
	}
}
