import { autoinject, PLATFORM, computedFrom } from "aurelia-framework";
import {
	REPORT_ID_KEY,
	ReportApiClient,
	PXScreen,
	graphInfo,
	viewInfo,
	ReportSettings,
	createSingle,
	createCollection,
	IFieldsetLayoutField,
	IFieldsetSingleLayout,
	GridFilter,
	Disposables,
	ReportTemplate,
	QpGridCustomElement,
	GridFilterRow,
	IGridColumn,
	QpFilterEditorCustomElement,
	ServerCommand,
	PreferencesService,
	BEFORE_CALLBACK_EVENT,
	handleEvent,
	CustomEventType,
	CurrentRowChangedHandlerArgs,
	PXViewCollection,
	PXActionState,
	GridReportApiClient,
	FavoritePreferences,
	FavoritePreferencesManager,
	ScreenToolbarDataComponent,
	localizable,
	IToolBarMenuOptions,
} from "client-controls";
import { Container } from "aurelia-dependency-injection";
import {
	EditTemplateDialog,
	EmailNotification,
	FilterData,
	ReportExp,
	ReportParameters,
	ReportSettingsExp,
	SortData,
	UserReport
} from "./report-views";
import { ReportScreenDataComponent } from "./report-screen-data-component";
import { Messages } from "../screens/common/messages";
import {
	mapConditionsColumns, mapConditionsRows, setParameterDependencies, syncFilterToGrid
} from "./report-utils";

@localizable
export class WarningMessages {
	static WarningPdfSign = "No valid certificate is found for signing the PDF report.";
}

@graphInfo({ graphType: "PX.Data.Reports.ReportMaint", primaryView: "Report" })
@autoinject
export class ReportScreen extends PXScreen {
	WarningMessages = WarningMessages;

	viewNotification: PXActionState;

	@viewInfo({ containerName: "Parameters" })
	Parameters = createSingle(ReportParameters);

	@viewInfo({ containerName: "Sorting" })
	Sorting = createCollection(SortData);

	@viewInfo({ containerName: "Versions" })
	ReportVersion = createCollection(UserReport);

	@viewInfo({ containerName: "Filters" })
	Conditions = createCollection(FilterData);

	@viewInfo({ containerName: "Report" })
	Report = createSingle(ReportExp);

	@viewInfo({ containerName: "ReportSettings" })
	ReportSettings = createSingle(ReportSettingsExp);

	@viewInfo({ containerName: "ReportNotifications" })
	ReportNotifications = createCollection(EmailNotification);

	EditTemplateDialog = createSingle(EditTemplateDialog);

	private reportDefaults: ReportSettings;
	private paramsLayout: IFieldsetSingleLayout;
	private readonly layoutComponentName = "ReportDefaults";
	private templates: GridFilter[] = [];
	private selectedTemplateId: string | undefined;
	private subscriptions: Disposables = new Disposables();
	private msg = Messages;
	private conditionsGridVM?: QpGridCustomElement;
	private conditionsRows: GridFilterRow[] = [];
	private conditionsColumns: IGridColumn[] = [];
	private conditionsEditorVM?: QpFilterEditorCustomElement;
	private versionsGridVM?: QpGridCustomElement;
	private preferencesManager: FavoritePreferencesManager;
	private requestedTemplateId?: string;
	private createNewTemplate = true;
	private templateMenuIndex?: number;

	constructor(container: Container, private preferencesService: PreferencesService) {
		super();
		container.registerInstance(REPORT_ID_KEY, this.reportId);
		this.registerService(ReportApiClient);
		this.registerService(GridReportApiClient);
		this.preferencesManager = new FavoritePreferencesManager(
			preferencesService,
			ReportFavoritePreferences,
			this.onPreferencesChanged.bind(this));
		this.preferencesManager.subscribe("reportFavorites");
	}

	@computedFrom("templates", "selectedTemplateId")
	get ReportTemplates(): GridFilter[] {
		if (!this.selectedTemplateId) {
			return this.templates;
		}
		return [{
			filterID: "none",
			filterName: Messages.None,
			isNotFavoritable: true,
			showOnTop: true
		},
		...this.templates
		];
	}

	afterConstructor() {
		super.afterConstructor();
		this.screenService.registerDataComponent(this.layoutComponentName,
			() => new ReportScreenDataComponent(this));

		this.subscriptions.append(
			this.eventAggregator.subscribe("screen-updated", () => {
				this.conditionsRows = mapConditionsRows(this.conditionsGridVM?.rows || []);
				this.selectedTemplateId = this.Report?.Template?.value;

				const dc = <ScreenToolbarDataComponent> this.screenService.getDataComponent("ScreenToolbar");
				if (!dc?.toolbar) {
					return;
				}
				this.templateMenuIndex = (dc.toolbar.items.ts_cancel?.index || 0) + menuIndexStep;
				if (dc.toolbar.items.ts_reportMenu?.config) {
					(dc.toolbar.items.ts_reportMenu.config as IToolBarMenuOptions).hideOpener = true;
				}
			})
		);
		this.subscriptions.append(
			this.eventAggregator.subscribe(BEFORE_CALLBACK_EVENT, (command?: ServerCommand) => {
				if (!command?.containsAny(["reportMenu@SaveTemplateAs", "reportMenu@TemplateSave", "reportMenu@EditTemplate"])) {
					return;
				}

				this.createNewTemplate = command.contains("reportMenu@SaveTemplateAs") ||
					!this.Report.Template?.value;
			}));
	}

	detached() {
		this.subscriptions?.dispose();
	}

	get reportId(): string | undefined {
		const urlParams = new URLSearchParams(PLATFORM.global.location.search);
		const key = [...urlParams.keys()].find(k => k.toLowerCase() === "id");
		return key ? urlParams.get(key) : undefined;
	}

	get siteMapScreenID(): string {
		return this.Report?.ScreenId?.value || "ReportScreen";
	}

	setReportDefaults(reportSettings: ReportSettings) {
		this.reportDefaults = reportSettings;
		const fields: IFieldsetLayoutField[] = [];
		const reportColumns = this.reportDefaults?.paramColumns || 2;
		const LayoutMaxSizeInColumns = 12;
		const colSpanToLayoutRate = Math.ceil(LayoutMaxSizeInColumns / reportColumns);

		this.templates = this.reportDefaults?.templates?.
			map((t: ReportTemplate) => ({
				filterID: t.name,
				filterName: t.name || Messages.None,
				isDefault: t.isDefault,
				isShared: t.isShared,
				isFavorite: t.isFavorite,
			})) || [];
		this.onPreferencesChanged();

		if (this.reportDefaults?.parameters) {
			let currentColumn = 0;
			for (const p of this.reportDefaults.parameters) {
				setParameterDependencies(this, p);
				const prevColumn = currentColumn;
				currentColumn += (p.columnSpan || 1);
				const addRow = currentColumn >= reportColumns;
				const marginRightColumns = (addRow ? (reportColumns - prevColumn - 1) : (p.columnSpan - 1)) * colSpanToLayoutRate;
				fields.push({
					name: p.name,
					position: {
						separateRow: false,
						small: { columns: colSpanToLayoutRate, marginRightColumns },
						medium: { columns: colSpanToLayoutRate, marginRightColumns },
						large: { columns: colSpanToLayoutRate, marginRightColumns }
					}
				});
				if (addRow) {
					currentColumn = 0;
				}
			}
		}

		this.paramsLayout = { viewName: "Parameters", fields };

		this.conditionsColumns = mapConditionsColumns(this.reportDefaults?.reportFields);
	}

	onPreferencesChanged() {
		const favList = this.preferencesManager.favoriteFilters;
		this.templates?.forEach(f => f.isFavorite = favList?.includes(f.filterID));
	}

	onTemplateFavoriteChanged(filterID: string, isFavorite: boolean) {
		if (isFavorite) this.preferencesManager.addFavouriteFilter(filterID, this.reportId.toUpperCase());
		else this.preferencesManager.deleteFavouriteFilter(filterID, this.reportId.toUpperCase());
	}

	async onTemplateChanged(filterID: string) {
		if (filterID !== this.requestedTemplateId) {
			this.requestedTemplateId = filterID;
			await this.screenService.executeCommand(new ServerCommand(
				"SelectTemplate", [filterID === "none" ? null : filterID]));
			this.requestedTemplateId = undefined;
		}
	}

	onConditionFilterChanged() {
		const rows = syncFilterToGrid(this.conditionsEditorVM?.filterRows, this.conditionsGridVM.rows);
		const result: any = {
			rows,
			totalRowCount: rows.length
		};
		this.conditionsGridVM.setComponentData(result);
		this.conditionsGridVM.updateScreen();
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "ReportVersion" })
	onUserReportChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<UserReport>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;
		const isActive = !!ar?.IsActive?.value;

		if (model.EditVersion) model.EditVersion.visible = !!ar;
		if (model.ActivateVersion) model.ActivateVersion.visible = !!ar && !isActive;
		if (model.DeactivateVersion) model.DeactivateVersion.visible = isActive;

		this.versionsGridVM?.recalculateTopToolbar();
	}
}

class ReportFavoritePreferences extends FavoritePreferences {
	constructor() {
		super("report");
	}
}

const menuIndexStep = 0.5;
