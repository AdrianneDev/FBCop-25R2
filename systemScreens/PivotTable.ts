import { autoinject, PLATFORM  } from "aurelia-framework";
import { Container } from "aurelia-dependency-injection";
import { PXScreen, IPivotTableControlConfig, SearchParamsClass } from "client-controls";

@autoinject
export class PivotScreen extends PXScreen {

	pivotConfig: IPivotTableControlConfig;
	pivotTableId?: number;
	private searchParams: string;

	constructor(container: Container, protected giSearchParams: SearchParamsClass) {
		super();

		this.suppressInitialization = true;
		this.searchParams = giSearchParams.searchParams?.toLowerCase();
		this.pivotConfig = { id: "pivotTable", pivotScreenId: this.PivotScreenId, autoRefresh: true };
		this.pivotTableId = this.PivotTableId;
	}

	get SearchParams()  {
		return new URLSearchParams(this.searchParams ?? PLATFORM.global.location.search.toLowerCase());
	}

	get PivotScreenId(): string | undefined {
		return this.SearchParams.get("PivotScreenID".toLowerCase())?.toUpperCase();
	}

	get PivotTableId(): number | undefined {
		const id = this.SearchParams.get("PivotTableID".toLowerCase());
		return id ? parseInt(id) : undefined;
	}
}
