import { autoinject, PLATFORM, BindingEngine, Disposable, computedFrom } from "aurelia-framework";
import {
	PXView,
	graphInfo,
	createSingle,
	createCollection,
	PXScreen,
	QpGridCustomElement,
	DashboardApiClient,
	DASHBOARD_ID_KEY,
	PXActionState,
	actionConfig,
	PXFieldState,
	fieldConfig,
	QpFilterBarCustomElement,
	QpGridEventArgs,
	PXFieldOptions,
	GridNoteFilesShowMode,
	GridFilterPickerVisibility,
	SearchParamsClass,
	DashboardDataComponent,
	IColumnsDialogConfig,
	GridColumnDisplayMode, GridColumnShowHideMode, GridPreset, GridRowStatus, HttpCodes, IGridColumn, NetType,
	columnConfig, controlConfig, gridConfig, DashboardWidgetsUpdateEvent, SortDirection, ITreeSelectorConfig,
	PreferencesService,
	siteRoot,
	getColumnKey, getFilterRowDisplayText,
	PXSelectorMode,
	ScreenPlacement,
} from "client-controls";
import { Container } from "aurelia-dependency-injection";
import { DialogService } from "aurelia-dialog";

@graphInfo({
	graphType: "PX.Dashboards.LayoutV2Maint",
	primaryView: "Filter",
	hideScreenToolbar: true,
})
@autoinject
export class DB000000 extends PXScreen {
	Filter = createSingle(Filter);

	linkSettings = createSingle(LinkSettings);
	inlineFrameSettings = createSingle(InlineFrameSettings);
	powerbiSettings = createSingle(PowerBISettings);
	trendcardSettings = createSingle(TrendcardSettings);
	scorecardSettings = createSingle(ScorecardSettings);
	gaugeSettings = createSingle(GaugeSettings);
	wikiSettings = createSingle(WikiSettings);
	tableSettings = createSingle(TableSettings);
	lineSettings = createSingle(SerialSettings);
	columnSettings = createSingle(SerialSettings);
	stackedcolSettings = createSingle(SerialSettings);
	barSettings = createSingle(SerialSettings);
	stackedbarSettings = createSingle(SerialSettings);
	doughnutSettings = createSingle(DoughnutSettings);
	funnelSettings = createSingle(DoughnutSettings);
	pivotSettings = createSingle(PivotSettings);

	Columns = createCollection(Columns);

	CurrentWidget = createSingle(CurrentWidget);
	widgetParameters = createCollection(WidgetParameters);

	inquiryParameters = createCollection(InquiryParameters);

	filterRows = createCollection(FilterRows);
	filterColumns = createCollection(FilterColumns);

	ActiveFilter = createCollection(ActiveFilter);
	DashboardFilterColumns = createCollection(DashboardFilterColumns);

	hideFilters: boolean = true;
	dashboardFilterColumnsGridVM: QpGridCustomElement;
	filtersGridVM: QpGridCustomElement;
	dashboardFilterBarVM: QpFilterBarCustomElement;

	viewModel: PXScreen;

	columnSettingsGrid: QpGridCustomElement;

	@actionConfig({
		imageUrl: "svg:main@dashboard",
		displayIconAndText: true,
	})
	designMode: PXActionState;

	@actionConfig({
		imageUrl: "svg:main@refresh",
		displayIconAndText: true,
	})
	refreshAll: PXActionState;

	private subscriptions: Disposable[] = [];

	private readonly layoutComponentName = "DashboardData";
	private searchParams: string;
	private previousFilterRows: any[] = [];

	constructor(
		container: Container,
		protected dashboardSearchParams: SearchParamsClass,
		protected dialogService: DialogService,
		protected bindingEngine: BindingEngine,
		private preferencesService: PreferencesService,
	) {
		super();

		this.searchParams = dashboardSearchParams.searchParams;

		container.registerInstance(DASHBOARD_ID_KEY, this.dashboardId);
		this.registerService(DashboardApiClient);
	}

	// this method runs immediately after ctor executing and property injection
	afterConstructor() {
		super.afterConstructor();
		this.screenService.registerDataComponentOneTime(this.layoutComponentName,
			() => new DashboardDataComponent(this.viewModel, this.container));
	}

	get dashboardId(): string {
		const urlParams = new URLSearchParams(this.searchParams ?? PLATFORM.global.location.search.toLowerCase());
		const id = urlParams?.get("id");
		if (!id) return "";
		return id;
	}

	@computedFrom("screenService.screenApiSettings.placement")
	get isInsideSidePanel(): boolean {
		return this.screenService.screenApiClient.getPlacement() === ScreenPlacement.SidePanel;
	}

	showTableColumnSettings(dashboardId: string, widgetId: string) {
		const cols = (this.Columns as any).rowsData.map(col => ({
			field: col.cells.DataField.value,
			caption: col.cells.DisplayName.value,
			visible: col.cells.Visible.value,
			allowShowHide: GridColumnShowHideMode.True,
		}));
		const model : IColumnsDialogConfig = {
			id: "table_settings_columns_dialog",
			columns: [...cols],
			hasSavedLayout: (this.columnSettingsGrid as any).hasSavedLayout,
			allowSkipTabs: false,
		};
		const visibles: Map<string, boolean | undefined> = new Map(cols.map(c => [getColumnKey(c), c.visible]));

		this.dialogService.open({
			viewModel: PLATFORM.moduleName("client-controls/controls/compound/grid/dialogs/columns-dialog"),
			model: model,
			lock: false,
			childContainer: this.container.createChild(),
			keyEvent: "keydown",
		}).whenClosed((response: any) => {
			if (response.wasCancelled) return;
			if (response.output === "reset") {
				// TODO: it working without preferences now, so we don't know if there are some changes and how to reset them
				// this.columnSettingsGrid.resetLayout();
			}
			else {
				cols.splice(0, cols.length, ...response.output);
				cols.forEach(c => {
					if (c.visible !== visibles.get(getColumnKey(c))) (this.Columns as any).rowsData.find((item) => item.id === c.field).cells.Visible.value = c.visible;
				});
				this.saveGridLayout(cols);
			}
		});
	}

	async saveGridLayout(columns: IGridColumn[]) {
		const rows = columns.map((row, index) => ({
			status: GridRowStatus.Modified,
			cells: {
				DataField: { value: row.field, changed: true },
				DisplayName: { value: row.caption, changed: true},
				Visible: { value: row.visible, changed: true },
				Position: { value: index, changed: true },
				Width: { value: row.width, changed: true },
			}
		}));
		(this.columnSettingsGrid.rows as any) = rows;
	}

	powerBISignIn(powerbiSettings: PowerBISettings) {
		new PowerBIWidgetHelper(powerbiSettings).authorize();
	}

	getFilterColumns(columnsGrid: QpGridCustomElement) {
		const itemsList = columnsGrid.rows.map((row) => row.cells.FieldName);
		return itemsList?.map((item) => {
			const cells = columnsGrid.rows.find((row) => row.cells.FieldName.value === item.value)?.cells;
			const columnState = cells?.DefaultValue;
			return {
				field: item.value,
				caption: cells?.DisplayName.value ?? columnState?.text,
				visible: true,
				allowFilter: true,
				dataType: columnState?.type || NetType.String,
				dateMask: columnState?.type === NetType.DateTime ? "04/08/03 10:17 15" : undefined, // the default "04/08/03 10:17 15" stands for "M/d/yyyy h:mm tt" (you can check these mask formats in the _fieldValue method of qp-datetime-edit)
				format: columnState?.format ?? (columnState?.type === NetType.DateTime ? "g" : undefined),
				viewName: columnState?.viewName,
				valueItems: columnState?.options ? { items: columnState?.options } : undefined,
				fieldList: columnState?.fieldList,
				headerList: columnState?.headerList,
				valueField: columnState?.valueField,
				state: columnState,
				displayMode: columnState?.selectorMode === PXSelectorMode.DisplayModeText ? GridColumnDisplayMode.Text : GridColumnDisplayMode.Value,
			};
		}) || [];
	}

	getFilterRows() {
		const columns = this.dashboardFilterColumnsGridVM.rows;
		const rows = (this.filtersGridVM as any).filterRows;

		if (!rows) return [];

		const emptyFilters = columns.filter((column) => !rows.map(row => row.field).includes(column.cells.FieldName.value))
			.map((row) => ({
				status: GridRowStatus.Inserted,
				cells: {
					DataField: {
						value: row.cells.FieldName.value,
						cellText: row.cells.FieldName.cellText,
						changed: true
					},
					Condition: { value: "EQ", changed: true },
					Value1: { value: undefined, changed: true },
					Value2: { value: undefined, changed: true },
					Operation: { value: "A", changed: true },
					OpenBrackets: { value: 0, changed: true },
					CloseBrackets: { value: 0, changed: true },
					LineNbr: { value: (row as any).lineNbr },
				}
			}));

		const filterRows = [
			...rows.map((row) => {
				const fr = row;
				return {
					...fr,
					text: getFilterRowDisplayText(fr, {
						field: fr.field,
						// caption: fr.field,
						dataType: NetType.String,
					}),
				};
			}),
			...emptyFilters.map((row) => {
				const fr = {
					field: row.cells.DataField.value,
					condition: row.cells.Condition.value,
					value: row.cells.Value1.value,
					value2: row.cells.Value2.value,
					orOperator: false,
					openBrackets: row.cells.OpenBrackets.value,
					closeBrackets: row.cells.CloseBrackets.value,
					lineNbr: row.cells.LineNbr.value,
				};
				return {
					...fr,
					text: getFilterRowDisplayText(fr, {
						field: fr.field,
						caption: row.cells.DataField.cellText,
						dataType: NetType.String,
					}),
				};
			})
		];

		(this.filtersGridVM as any).filterRows = filterRows;
		return filterRows;
	}

	onActiveFilterGridReady() {
		(this.filtersGridVM as any).filterSelectorConfig.showFilterPicker = GridFilterPickerVisibility.False;
	}

	reloadFilters() {
		this.hideFilters = true;
		this.tq.queueTask(() => {
			this.hideFilters = false;
			if (JSON.stringify((<any> this.filtersGridVM).filterRows) !== JSON.stringify(this.previousFilterRows)) {
				this.previousFilterRows = (this.filtersGridVM as any).filterRows;
				this.screenEventManager.publish(new DashboardWidgetsUpdateEvent());
			}
		});
	}

	saveFilters(args: QpGridEventArgs) {
		(this.filtersGridVM as any).filterRows = this.previousFilterRows = this.dashboardFilterBarVM.filterRows;
		args.grid.updateScreen().then(() => {
			this.screenEventManager.publish(new DashboardWidgetsUpdateEvent());
		});
	}

	detached() {
		super.detached();
		this.subscriptions.forEach(ss => ss.dispose());
		this.subscriptions = [];
	}
}

export class Filter extends PXView {
}

@gridConfig({
	preset: GridPreset.Empty
})
export class Columns extends PXView {
	Field: PXFieldState;
	Visible: PXFieldState;
	DisplayName: PXFieldState;
	Position: PXFieldState;
	Width: PXFieldState;
}

export class BaseSettings extends PXView {

	@controlConfig({
		displayMode: "text"
	})
	InquiryScreenID: PXFieldState;

	FilterID: PXFieldState;
	RefreshData: PXFieldState;

}

@gridConfig({
	preset: GridPreset.Empty,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	columns: [
		{ field: "Name" },
		{ field: "DisplayName" },
		{ field: "Value", fullState: true },
		{ field: "UseDefault" },
	],
})
export class InquiryParameters extends PXView {

	Name: PXFieldState;
	DisplayName: PXFieldState;
	UseDefault: PXFieldState;

	@columnConfig({
		editorConfig: {
			allowCustomItems: true,
			customItems: ["@Today", "@WeekStart", "@WeekEnd", "@MonthStart", "@MonthEnd", "@QuarterStart", "@QuarterEnd", "@PeriodStart", "@PeriodEnd", "@YearStart", "@YearEnd"],
		},
	})
	Value: PXFieldState;

}

export class LinkSettings extends PXView {

	Link: PXFieldState;
	Paramenters: PXFieldState;
	WindowMode: PXFieldState;
	Description: PXFieldState;

	Icon: PXFieldState;

}

export class InlineFrameSettings extends PXView {

	Source: PXFieldState;

}

export class PowerBISettings extends PXView {

	ClientID: PXFieldState;
	ClientSecret: PXFieldState;
	DashboardID: PXFieldState;
	TileID: PXFieldState;
	AccessCode: PXFieldState;
	RedirectUri: PXFieldState;
	AccessToken: PXFieldState;
	RefreshToken: PXFieldState;

}

export class TrendcardSettings extends BaseSettings {

	AggregateField: PXFieldState;
	AggregateFunction: PXFieldState;
	TimelineField: PXFieldState;
	Period: PXFieldState;

	@fieldConfig({
		controlType: "qp-drop-down",
		controlConfig: {
			colorMode: true,
		},
	})
	NormalColor: PXFieldState;

	@fieldConfig({
		controlType: "qp-drop-down",
		controlConfig: {
			colorMode: true,
		},
	})
	WarningColor: PXFieldState;

	@fieldConfig({
		controlType: "qp-drop-down",
		controlConfig: {
			colorMode: true,
		},
	})
	ErrorColor: PXFieldState;

}

export class ScorecardSettings extends BaseSettings {

	AggregateField: PXFieldState;
	AggregateFunction: PXFieldState;

	@fieldConfig({
		controlType: "qp-drop-down",
		controlConfig: {
			colorMode: true,
		},
	})
	NormalColor: PXFieldState;

	NormalLevelType: PXFieldState;
	NormalLevelField: PXFieldState;
	NormalLevel: PXFieldState;

	@fieldConfig({
		controlType: "qp-drop-down",
		controlConfig: {
			colorMode: true,
		},
	})
	WarningColor: PXFieldState;

	@fieldConfig({
		controlType: "qp-drop-down",
		controlConfig: {
			colorMode: true,
		},
	})
	ErrorColor: PXFieldState;

	ErrorLevelType: PXFieldState;
	ErrorLevelField: PXFieldState;
	ErrorLevel: PXFieldState;
	VisualizationType: PXFieldState;
	Icon: PXFieldState;

}

export class GaugeSettings extends ScorecardSettings {
}

export class WikiSettings extends PXView {
	@fieldConfig({ controlType: "qp-tree-selector" })
	@controlConfig<ITreeSelectorConfig>({
		treeConfig: {
			hideRootNode: true,
			idField: "NodeID",
			dataMember: "WikiTreeItems",
			textField: "Title",
			parentIdField: "ParentID",
			columns: "Title NodeID ParentID",
			mode: "single",
			dynamic: true,
			openedLayers: 1
		}
	})
	PageID: PXFieldState;
}

export class TableSettings extends BaseSettings {

	RecordsLimit: PXFieldState;
	AutoHeight: PXFieldState;

}

export class PivotSettings extends BaseSettings {

	PivotTableID: PXFieldState;

}

export class SerialSettings extends BaseSettings {

	CategoryField: PXFieldState;
	CategorySortType: PXFieldState;
	CategorySortOrder: PXFieldState;
	CategorySortField: PXFieldState;
	CategoryTotalAfter: PXFieldState;
	CategoryShowTotal: PXFieldState;
	CategoryDateRounding: PXFieldState;
	CategoryFormat: PXFieldState;

	SeriesField: PXFieldState;
	SeriesSortType: PXFieldState;
	SeriesSortOrder: PXFieldState;
	SeriesSortField: PXFieldState;
	SeriesTotalAfter: PXFieldState;
	SeriesShowTotal: PXFieldState;
	SeriesDateRounding: PXFieldState;
	SeriesFormat: PXFieldState;

	@fieldConfig({
		controlType: "qp-formula-editor",
		controlConfig: {
			parameters: [
				"Value",
				"DisplayValue",
			],
		}
	})
	SeriesColor: PXFieldState;

	ValueField: PXFieldState;
	ValueAggregate: PXFieldState;
	ValueFormat: PXFieldState;

}

export class DoughnutSettings extends BaseSettings {

	LegendPosition: PXFieldState;

	CategoryField: PXFieldState;
	CategorySortType: PXFieldState;
	CategorySortOrder: PXFieldState;
	CategoryTotalAfter: PXFieldState;
	CategoryShowTotal: PXFieldState;
	CategoryDateRounding: PXFieldState;
	CategoryFormat: PXFieldState;

	ValueField: PXFieldState;
	ValueAggregate: PXFieldState;
	ValueFormat: PXFieldState;

}

@gridConfig({
	preset: GridPreset.Empty,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	columns: [
		{ field: "DashboardID", sortDirection: SortDirection.Ascending },
		{ field: "DashboardParameterName" },
		{ field: "WidgetParameterName", fullState: true },
	],
})
export class WidgetParameters extends PXView {
	DashboardID: PXFieldState;
	DashboardParameterName: PXFieldState;

	@columnConfig({ fullState: true })
	WidgetParameterName: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class CurrentWidget extends PXView {
	Caption: PXFieldState;
	Type: PXFieldState;
	DashboardID: PXFieldState;
	WidgetID: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Empty,
	initNewRow: true,
})
export class FilterRows extends PXView {
	Field: PXFieldState;
	LineNbr: PXFieldState;
	IsActive: PXFieldState;
	OpenBrackets: PXFieldState;
	// @columnConfig({ fullState: true })
	DataField: PXFieldState;
	Condition: PXFieldState;
	IsParameter: PXFieldState;
	Value1: PXFieldState;
	Value2: PXFieldState;
	CloseBrackets: PXFieldState;
	Operation: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Empty,
	columns: [
		{ field: "FieldName" },
		{ field: "DisplayName" },
		{ field: "DefaultValue", fullState: true },
	],
})
export class FilterColumns extends PXView {
	FieldName: PXFieldState;
	DisplayName: PXFieldState;

	@columnConfig({
		fullState: true
	})
	DefaultValue: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Empty,
	preserveSortsAndFilters: true,
})
export class ActiveFilter extends PXView {
}

@gridConfig({
	preset: GridPreset.Empty,
	columns: [
		{ field: "FieldName" },
		{ field: "DisplayName" },
		{ field: "DefaultValue", fullState: true },
	],
})
export class DashboardFilterColumns extends PXView {
	FieldName: PXFieldState;
	DisplayName: PXFieldState;

	@columnConfig({
		fullState: true
	})
	DefaultValue: PXFieldState;
}

class PowerBIWidgetHelper {

	constructor(private powerbiSettings: PowerBISettings) {
	}

	authorize(): void {
		const trimSlash = (path: string): string => path.endsWith("/") ? path.substring(0, path.length - 1) : path;
		const baseUri = trimSlash(PLATFORM.global.location.origin + siteRoot);
		const powerBIController = "powerBI";
		const authEndpoint = "auth";
		const redirectUri = `${baseUri}/${powerBIController}/${authEndpoint}`;
		const resourceUri = "https://analysis.windows.net/powerbi/api";
		const authorityUri = "https://login.microsoftonline.com/common/oauth2/authorize?response_type=code";

		this.httpGet(redirectUri, (status: string, responseText: string) =>	{
			const resource = encodeURIComponent(resourceUri);
			const client = encodeURIComponent(this.powerbiSettings.ClientID.value);
			const redirect = encodeURIComponent(redirectUri);
			const uri = `${authorityUri}&client_id=${client}&resource=${resource}&redirect_uri=${redirect}&state=${responseText}`;

			window.open(uri);

			this.poll(redirectUri, responseText);
		});
	}

	private httpGet(uri: string, onLoad: Function): void {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", () => onLoad(oReq.status, oReq.responseText));
		oReq.open("GET", uri);
		oReq.send();
	}

	private poll(redirectUri: string, state: string): void	{
		const uri = `${redirectUri}?state=${state}`;
		this.httpGet(uri, (status: number, responseText: string) =>	{
			const second = 1000;
			switch (status) {
				case HttpCodes.NoContent:
					setTimeout(() => this.poll(redirectUri, state), second);
					return;
				case HttpCodes.Ok:
					this.powerbiSettings.RedirectUri.value = redirectUri;
					this.powerbiSettings.AccessCode.value = responseText;
					return;
			}
		});
	}
}
