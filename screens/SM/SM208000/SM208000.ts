import {
	createCollection,
	createSingle,
	graphInfo,
	PXActionState,
	viewInfo,
	handleEvent,
	CustomEventType,
	RowSelectedHandlerArgs,
	CurrentRowChangedHandlerArgs,
	PXViewCollection,
	PXDatetimeFieldState,
	IGIHelper,
	PreferenceBase,
	getScreenID,
	PreferencesService,
	IPreferencesTarget,
	IPreferencesPair,
	autoinject,
	localizable,
	CallbackCompletedHandlerArgs,
	ICommandUpdateResult,
	QpCodeEditorCustomElement,
	QpGridCustomElement
} from "client-controls";
import {
	ComboValues,
	RelatedTable,
	SingleTable,
	ChangeIDParam,
	GIDesign,
	GIDesign2,
	GITable,
	GIRelation,
	GIOn,
	GIFilter,
	GIWhere,
	GIGroupBy,
	GISort,
	GIResult,
	GIRecordDefault,
	GINavigationScreen,
	GINavigationScreen2,
	GINavigationParameter,
	GINavigationCondition,
	GIMassUpdateField,
	GIMassAction,
	CustomMessageDialogParams,
	CustomMessageDialogParams2,
	CustomMessageDialogParams3,
	CustomMessageDialogParams4,
	SiteMapWithAccessRights,
	GIMLGroups,
	ExitAdvancedModeDialogParams,
	SaveDraftDialogParams
} from "./views";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";
import { Container } from "aurelia-dependency-injection";
import { observable  } from "aurelia-framework";

@graphInfo({ graphType: "PX.Data.Maintenance.GI.GenericInquiryDesigner", primaryView: "Designs" })
@autoinject
export class SM208000 extends PXScreenWithSiteMapSupport implements IGIHelper, IPreferencesTarget {
	loading: boolean = false;
	NavigateToDataSource: PXActionState;
	showAvailableValues: PXActionState;
	parametersSelected: PXActionState;
	queryCodeEditor: QpCodeEditorCustomElement;
	parametersGrid: QpGridCustomElement;
	revertDraft: PXActionState;

   	@viewInfo({containerName: "Inquiry Summary"})
	Designs = createSingle(GIDesign);
   	CurrentDesign = createSingle(GIDesign2);
   	@viewInfo({containerName: "Combo Box Values"})
	ValuesLabels = createCollection(ComboValues);
	@viewInfo({ containerName: "Related Tables" })
	RelatedTables = createSingle(RelatedTable);
	TablesInformation = createCollection(SingleTable);
	@viewInfo({ containerName: "Change Inquiry Title" })
	ChangeIDDialog = createSingle(ChangeIDParam);
   	@viewInfo({containerName: "Data Sources"})
	Tables = createCollection(GITable);
	@viewInfo({ containerName: "Table Relations" })
	Relations = createCollection(GIRelation);
	@viewInfo({ containerName: "Data Field Links For Active Relation" })
	JoinConditions = createCollection(GIOn);
	@viewInfo({ containerName: "Parameters" })
	Parameters = createCollection(GIFilter);
	@viewInfo({ containerName: "Conditions" })
	Wheres = createCollection(GIWhere);
	@viewInfo({ containerName: "Grouping" })
	GroupBy = createCollection(GIGroupBy);
	@viewInfo({ containerName: "Sort Order" })
	Sortings = createCollection(GISort);
	@viewInfo({ containerName: "Results Grid" })
	Results = createCollection(GIResult);
	@viewInfo({ containerName: "New Record Defaults" })
	RecordDefaults = createCollection(GIRecordDefault);
	@viewInfo({ containerName: "Navigation Targets" })
	NavigationScreens = createCollection(GINavigationScreen);
	CurrentNavigationScreen = createSingle(GINavigationScreen2);
	@viewInfo({ containerName: "Navigation Parameters" })
	NavigationParameters = createCollection(GINavigationParameter);
	@viewInfo({ containerName: "Visibility Conditions" })
	NavigationConditions = createCollection(GINavigationCondition);
	@viewInfo({ containerName: "Mass Update Fields" })
	MassUpdateFields = createCollection(GIMassUpdateField);
	@viewInfo({ containerName: "Mass Actions" })
	MassActions = createCollection(GIMassAction);
	@viewInfo({ containerName: "Copy Generic Inquiry" })
	CreateCopyOrOverwriteGIDialog = createSingle(CustomMessageDialogParams);
	@viewInfo({ containerName: "Delete Generic Inquiry" })
	DeleteUsedGIDialog = createSingle(CustomMessageDialogParams2);
	@viewInfo({ containerName: "Remove Field" })
	DeleteUsedFieldDialog = createSingle(CustomMessageDialogParams3);
	@viewInfo({ containerName: "Import Generic Inquiries" })
	OverwriteExistingOnImportDialog = createSingle(CustomMessageDialogParams4);
	@viewInfo({ containerName: "Publish to the UI" })
	PublishToUIDialog = createSingle(SiteMapWithAccessRights);
	@viewInfo({ containerName: "Exit Advanced Mode" })
	ExitAdvancedModeDialog = createSingle(ExitAdvancedModeDialogParams);
	@viewInfo({ containerName: "Save Generic Inquiry" })
	SaveDraftDialog = createSingle(SaveDraftDialogParams);

	@viewInfo({containerName: "Anomaly Detection"})
	MLGroups = createCollection(GIMLGroups);

	DesignerModeCaption = DesignerMode;

	@observable({ changeHandler: "modeChanged" }) Mode: string;
	private currentMode: string = "L";
	private preferencesBase = new SM208000_Preferences();
	private readonly prefId = "designerMode";

	private get preferences() {
		return this.preferencesBase.preferences as SM208000_PreferenceData;
	}

	constructor(
		public element: Element,
		public container: Container,
		private preferencesService: PreferencesService) {
		super();
		container.registerInstance(IGIHelper, this);
	}

	async attached() {
		this.preferencesService.subscribe(this.prefId, this);
		await super.attached();
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Parameters" })
	onGIFilterSelected(args: RowSelectedHandlerArgs<PXViewCollection<GIFilter>>) {
		const ar = args.viewModel.activeRow;
		ar?.DefaultValue?.to(PXDatetimeFieldState).showRelativeDates();
	}

	@handleEvent(CustomEventType.RowSelected, { view: "Wheres" })
	onGIWhereSelected(args: RowSelectedHandlerArgs<PXViewCollection<GIWhere>>) {
		const ar = args.viewModel.activeRow;
		ar?.Value1?.to(PXDatetimeFieldState).showRelativeDates();
		ar?.Value2?.to(PXDatetimeFieldState).showRelativeDates();
	}

	@handleEvent(CustomEventType.RowSelected, { view: "NavigationConditions" })
	onGINavigationConditionSelected(args: RowSelectedHandlerArgs<PXViewCollection<GINavigationCondition>>) {
		const ar = args.viewModel.activeRow;
		ar?.ValueSt?.to(PXDatetimeFieldState).showRelativeDates();
		ar?.ValueSt2?.to(PXDatetimeFieldState).showRelativeDates();
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "Tables" })
	onGITableChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GITable>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.addRelatedTable) {
			model.addRelatedTable.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "Relations" })
	onGIRelationChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GIRelation>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.addRelatedTableRelations) {
			model.addRelatedTableRelations.enabled = !!ar;
		}

		if (model.moveUpRelations) {
			model.moveUpRelations.enabled = !!ar;
		}

		if (model.moveDownRelations) {
			model.moveDownRelations.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "JoinConditions" })
	onGIOnChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GIOn>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.browseForRelation) {
			model.browseForRelation.enabled = !!ar;
		}

		if (model.moveUpOn) {
			model.moveUpOn.enabled = !!ar;
		}

		if (model.moveDownOn) {
			model.moveDownOn.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "Parameters" })
	onGIFilterChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GIFilter>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.showAvailableValues) {
			model.showAvailableValues.enabled = !!ar;
		}

		if (model.moveUpFilter) {
			model.moveUpFilter.enabled = !!ar;
		}

		if (model.moveDownFilter) {
			model.moveDownFilter.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "Wheres" })
	onGIWhereChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GIWhere>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.moveUpCondition) {
			model.moveUpCondition.enabled = !!ar;
		}

		if (model.moveDownCondition) {
			model.moveDownCondition.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "GroupBy" })
	onGIGroupByChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GIGroupBy>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.moveUpGroupBy) {
			model.moveUpGroupBy.enabled = !!ar;
		}

		if (model.moveDownGroupBy) {
			model.moveDownGroupBy.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.CurrentRowChanged, { view: "Sortings" })
	onGISortChanged(args: CurrentRowChangedHandlerArgs<PXViewCollection<GISort>>) {
		const model = args.viewModel;
		const ar = args.viewModel.activeRow;

		if (model.moveUpSortings) {
			model.moveUpSortings.enabled = !!ar;
		}

		if (model.moveDownSortings) {
			model.moveDownSortings.enabled = !!ar;
		}
	}

	@handleEvent(CustomEventType.CallbackCompleted)
	onCallbackCompleted(args: CallbackCompletedHandlerArgs<ICommandUpdateResult>) {
		let designerMode = this.CurrentDesign.DesignerMode.value;
		if (!args.data?.succeeded) {
			// Exception
			this.Mode = designerMode;
			this.loading = false;
			return;
		}

		if (this.Mode === "A" && designerMode === null) {
			// Opened another GI in Advanced mode
			this.loading = true;
			this.CurrentDesign.toAdvancedMode.press();
			return;
		}

		if (args.actionName === "toAdvancedMode") {
			this.loading = false;

			if (this.Mode !== designerMode) {
				this.Mode = designerMode;
			}
		}
		else if (args.actionName === "toLowCodeMode") {
			designerMode = designerMode ?? "L";
			if (this.Mode !== designerMode) {
				this.Mode = designerMode;
			}
		}
	}

	getDesignID(): string | undefined {
		return this.CurrentDesign?.DesignID?.value;
	}

	getParameters(): string[] {
		const result = [];
		if ((this.Parameters?.records.length ?? 0) === 0) {
			return result;
		}

		this.Parameters.records.forEach((filter: GIFilter) => {
			result.push(filter.Name.value);
		});

		return result;
	}

	public applyPreferences(prefs: IPreferencesPair<SM208000_Preferences>) {
		this.preferencesBase = new SM208000_Preferences(prefs.user?.preferences);
		this.actualizePreferences();
	}

	protected async modeChanged() {
		if (!this.preferences) return;

		this.preferences.designerMode = this.Mode;
		await this.savePreferences();

		if (this.currentMode !== this.Mode) {
			this.currentMode = this.Mode;
			if (this.Mode === "L") {
				this.CurrentDesign.toLowCodeMode.press();
			}
			else {
				this.loading = true;
				this.CurrentDesign.toAdvancedMode.press();
			}
		}
	}

	protected actualizePreferences() {
		switch (this.preferences.designerMode) {
			case "A":
				this.Mode = "A";
				break;
			default: // "L" or undefined
				this.Mode = "L";
				break;
		}
	}

	protected async savePreferences() {
		const userPreferences = new SM208000_Preferences(this.preferences);
		await this.preferencesService.saveUserPreferences(getScreenID(), this.prefId, userPreferences);
	}
}
export class SM208000_PreferenceData {
	public designerMode: string;

	constructor(preferences: SM208000_PreferenceData = null) {
		if (preferences === null) return;
		this.designerMode = "L";
	}
}

class SM208000_Preferences extends PreferenceBase {
	public preferences = new SM208000_PreferenceData();

	constructor(preferences: SM208000_PreferenceData = null) {
		super();
		this.type = "SM208000";
		if (preferences === null) return;
		this.preferences.designerMode = preferences.designerMode;
	}
}

@localizable
class DesignerMode {
	static LowCode = "Low-Code";
	static Advanced = "Advanced";
}
