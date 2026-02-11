import { autoinject, inject, Container, PLATFORM } from "aurelia-framework";
import {
	PXView, GridApiClient, GridGenericInquiryApiClient, createCollection, graphInfo, createSingle,
	GenericInquiryApiClient, GENERIC_INQUIRE_ID_KEY, ScreenApiClient, GridPagerMode, PXScreen,
	gridConfig, PXFieldState, columnConfig, QpGridCustomElement, GridPreset,
	IFieldsetSingleLayout, PXFieldOptions, viewInfo,
	SearchParamsClass,
} from "client-controls";
import { GenericInquiryDataComponent, IGenericInquiryLayout } from "./generic-inquiry-data-component";

@graphInfo({ graphType: "PX.Data.PXGenericInqGrph", primaryView: "Filter" })
@autoinject
export class GI000000 extends PXScreen {

	Filter = createSingle(Filter);

	Results = createCollection(Results);
	@viewInfo({ syncAlways: true })
	Fields = createCollection(Fields);

	layout: IFieldsetSingleLayout[];
	gridVM: QpGridCustomElement;
	layoutTemplateSlots = {
		0: "A",
		1: "B",
		2: "C"
	};
	private readonly layoutComponentName = "GenericInquiryLayout";
	private searchParams: string;

	constructor(container: Container, protected giSearchParams: SearchParamsClass) {
		super();

		this.searchParams = giSearchParams.searchParams;

		container.registerInstance(GENERIC_INQUIRE_ID_KEY, this.genericInquiryId);
		this.registerService(GenericInquiryApiClient);
		this.registerService(GridGenericInquiryApiClient);
	}

	afterConstructor() {
		super.afterConstructor();
		this.screenService.registerDataComponentOneTime(this.layoutComponentName,
			() => new GenericInquiryDataComponent(this));
	}

	get genericInquiryId(): string | undefined {
		const urlParams = new URLSearchParams(this.searchParams ?? PLATFORM.global.location.search.toLowerCase());
		return urlParams.get("id");
	}
}

export class Filter extends PXView {
}

@gridConfig({
	preset: GridPreset.Inquiry,
	pagerMode: GridPagerMode.Numeric,
	defaultAction: "editDetail",
	allowStoredFilters: true,
	allowPresentations: true,
	preservePageIndex: true
})
export class Results extends PXView {
	@columnConfig({allowCheckAll: true})
	Selected: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Attributes
})
export class Fields extends PXView {
	@columnConfig({allowCheckAll: true})
	selected: PXFieldState<PXFieldOptions.CommitChanges>;
	fieldName: PXFieldState;
	displayName: PXFieldState;
	@columnConfig({fullState: true})
	value: PXFieldState<PXFieldOptions.CommitChanges>;
}
