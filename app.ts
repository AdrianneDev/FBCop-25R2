import { observable } from "aurelia-framework";
import { Disposable, bindable, autoinject, BindingEngine } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { EventAggregator } from "aurelia-event-aggregator";
import { EventManager, delegationStrategy, computedFrom } from "aurelia-binding";
import { Container } from "aurelia-dependency-injection";
import {
	QpEventManager, OpenPopupEvent, ExecuteCommandEvent, PXScreen,
	IDataComponentParams, IScreenService, RefreshScreenEvent, ReloadPageEvent, ScreenApiSettings, RedirectHelper,
	DefaultPreferencesDataComponent,
	UserPreferencesDataComponent,
	QpDataComponent,
	QpSplitterCustomElement,
	ClosePopupEvent,
	SidePanelDataComponent,
	showInformer,
	TranslationValidationDataComponent,
	IScreenInitializedEvent,
	ScreenPlacement,
	LoadingStartedEvent,
	LoadingFinishedEvent,
	IScreenApiResult,
	IntergrationLaunched,
	IntergrationFinished,
	PXFieldState,
	IScreenPreferences, PreferencesService,
	localizable, QpTranslator,
	AlertService,
	ScreenService,
	PopupMessageOpenEvent,
	KeyboardService,
	DialogHelper,
	BusyCounter, cachedProperty, invalidateOnChange, Type,
	IQpDialogConfig, IGeneralDialogConfig,
	IInlineScreenConfig,
	topDocument, setDataDirection,
	LocalizationsService
} from "client-controls";
import { getScreenIdFromUrl, getScreenPath } from "./screen-utils";
import { getColorVariables } from "client-controls/utils/control-helper";
import { DialogController, DialogOpenResult } from "aurelia-dialog";
import { ThemeVariablesDataComponent } from "./systemScreens/theme-variables-data-component";
const logger = getLogger("qp-app");

@localizable
class Messages {
	static ScreenID = "Screen ID";
	static Note = "Note";
	static Loading = "Screen is loading...";
}

declare const HTML_MERGED: boolean;

@autoinject
export class App {
	@bindable screenName?: string;
	@bindable useStaticRendering: boolean = HTML_MERGED;
	initialized = false;
	loading = false;
	viewModel?: PXScreen;
	screenService?: IScreenService;
	contentElement!: HTMLElement;
	forceUI?: string;
	keyboardService: KeyboardService;
	localizationsService: LocalizationsService;
	busyService: BusyCounter;
	isMainFrame: boolean = true;

	eventSubscriptions: Disposable[] = [];
	bindingSubscriptions: Disposable[] = [];
	baseHref: string = "";
	editMode: boolean = false;
	siteMapScreenID?: string;
	loadingMessage: string = Messages.Loading;

	@observable sidePanelComponent?: QpDataComponent<SidePanelDataComponent>;
	@observable splitterVM?: QpSplitterCustomElement;

	private Msg = Messages;
	private screenEventManager: QpEventManager;
	private giScreenID = "GenericInquiry";
	private dashboardScreenID = "Dashboard";
	private translationValidationComponent = new TranslationValidationDataComponent();
	private openDialogs: DialogController[] = [];

	constructor(private container: Container,
		private eventAggregator: EventAggregator,
		private translator: QpTranslator,
		private alertServce: AlertService,
		private preferencesService: PreferencesService,
		protected eventManager: EventManager,
		private redirectHelper: RedirectHelper,
		private bindingEngine: BindingEngine,
		private screenApiSettings: ScreenApiSettings
	) {
		this.screenEventManager = container.get(QpEventManager);
		this.keyboardService = container.invoke(KeyboardService);
		this.localizationsService = this.container.get(LocalizationsService);
		container.registerInstance(KeyboardService, this.keyboardService);
		this.busyService = container.get(BusyCounter);
		this.busyService.increment();
	}

	@computedFrom(
		"sidePanelComponent",
		"sidePanelComponent.component",
		"sidePanelComponent.component.sidePanelVM",
		"sidePanelComponent.component.collapsed",
		"sidePanelComponent.component.maximized"
	)
	private get sidebarDisabled(): boolean {
		const { sidePanelComponent } = this;

		return !sidePanelComponent || !sidePanelComponent.component || !sidePanelComponent.component.sidePanelVM
			|| sidePanelComponent.component.collapsed || sidePanelComponent.component.maximized;
	}

	@computedFrom("screenApiSettings", "screenApiSettings.placement")
	private get placement(): ScreenPlacement {
		return this.screenApiSettings.placement;
	}

	viewModelActivated() {
		this.screenService = this.viewModel.getScreenService();
		if (window.frameElement) {
			if (!this.isGI && !this.isDashboard && this.isMainFrame) {
				if (this.screenService) this.screenService.siteMapScreenID = this.siteMapScreenID;
			}
		}
		this.container.registerInstance(ScreenService, this.screenService);

		// all default screen preferences come on first GET request
		this.screenService.registerDataComponentOneTime("DefaultScreenPreferences",
			() => new DefaultPreferencesDataComponent(this.preferencesService));
		// this data component works only on first POST request - all user preferences come on first POST request
		this.screenService.registerDataComponentOneTime("UserScreenPreferences",
			new UserPreferencesDataComponent(this.preferencesService));

		// this.screenService.registerDataComponentOneTime("DashboardData",
		// 	() => new DashboardDataComponent(this.preferencesService));

		this.screenService.registerDataComponentOneTime("TranslationValidation",
			this.translationValidationComponent);

		this.screenService.registerDataComponentOneTime("ThemeVariablesState",
			() => new ThemeVariablesDataComponent(this.viewModel));
	}

	@computedFrom("siteMapScreenID", "giScreenID")
	get isGI(): boolean {
		return this.siteMapScreenID === this.giScreenID;
	}

	@computedFrom("siteMapScreenID", "dashboardScreenID")
	get isDashboard(): boolean {
		return this.siteMapScreenID === this.dashboardScreenID;
	}

	screenIsDirty(): boolean {
		if (this.viewModel) return this.viewModel.isDirty;
		return false;
	}

	applyScreenPreferences(result: IScreenPreferences, mode: "user" | "def"): void {
		for (const cid in result) {
			this.preferencesService.setPreferences(cid, result[cid], mode);
		}
	}

	getQueryParams(): IDataComponentParams {
		return {};
	}

	@cachedProperty(invalidateOnChange("viewModel"))
	get dialogHelper(): DialogHelper {
		return this.viewModel?.container.get(DialogHelper) ?? this.container.get(DialogHelper);
	}

	async openDialog(msg: OpenPopupEvent) {
		this.busyService.increment();
		const generalDialogConfig: IGeneralDialogConfig = {
			context: this.viewModel,
			rootElement: this.contentElement,
			command: msg.command,
			autoRepaint: msg.autoRepaint,
			caption: msg.dialogMessage,
			dirtyValues: msg.dirtyValues
		};
		const dialogConfig: IQpDialogConfig = {
			...generalDialogConfig,
			...msg.detail?.content,
			...{ id: msg.dialogId, data: msg.detail?.data },
			onPopupClose: msg.onPopupClose,
		};

		const inlineScreenConfig = msg.detail?.data as IInlineScreenConfig;
		if (inlineScreenConfig) {
			const baseClass = "inline-screen-dialog";
			dialogConfig.cssClass = `${baseClass}${ inlineScreenConfig.uiType === "E" ? ` ${baseClass}--legacy-ui` : "" }`;
		}

		await this.dialogHelper.openDialog(dialogConfig, {
			overlayDismiss: false
		}, (r: DialogOpenResult) => {
			this.openDialogs.push(r.controller);
			this.busyService.decrement();
		}).whenClosed(() => {
			this.openDialogs.length = this.openDialogs.length - 1;
			if (msg.popupCommand) {
				if (Type.isString(msg.popupCommand)) {
					this.screenService.executeCommand(msg.popupCommand);
				}
				else if (Type.isObject(msg.popupCommand)) {
					this.screenService.executeCommand(msg.popupCommand.name, msg.popupCommand.updateParams);
				}
			}
		});
	}

	private async attached() {
		let ready = false;

		this.siteMapScreenID = getScreenIdFromUrl();
		this.screenName = this.siteMapScreenID ? getScreenPath(this.siteMapScreenID) : "not-found";

		this.screenApiSettings.updateFromBrowser();
		this.isMainFrame = this.screenApiSettings.isMainFrame;

		if (this.isMainFrame && ![ScreenPlacement.PopupDialog, ScreenPlacement.Embedded].includes(this.screenApiSettings.placement)) {
			this.screenApiSettings.updateBrowserLocation();
		}
		else {
			this.screenEventManager.setParent((window.parent.document.body as any).aurelia?.container?.viewModel?.screenEventManager);
		}

		document.body.classList.add(`placement-${this.placement}`);
		if (this.placement === ScreenPlacement.SidePanel) {
			if (window.parent.document.body.classList.contains("modern-ui")) {
				document.body.classList.add("modern-ui-parent");
			}
		}

		this.screenEventManager.subscribe(OpenPopupEvent, (message: OpenPopupEvent) => {
			message.stop();
			this.openDialog(message);
		});

		this.screenEventManager.subscribe(ClosePopupEvent, () => {
			if (this.openDialogs.length) {
				this.openDialogs[this.openDialogs.length - 1].close(false);
			}
		});

		this.screenEventManager.subscribe(IntergrationLaunched, () => {
			this.keyboardService.setActiveArea(null);
		});

		this.screenEventManager.subscribe(IntergrationFinished, () => {
			this.keyboardService.restorePreviousArea();
		});

		this.eventSubscriptions.push(this.screenEventManager.subscribe(RefreshScreenEvent, (message: RefreshScreenEvent) => {
			this.screenService.update();
		}));

		this.eventSubscriptions.push(this.screenEventManager.subscribe(ReloadPageEvent, (message: ReloadPageEvent) => {
			this.redirectHelper.reload();
		}));

		const ea = this.eventAggregator;
		this.eventSubscriptions.push(
			ea.subscribe("screen-initialize-data-ready", (data: { screenID: string } ) => {
				if (data.screenID === this.viewModel?.screenID) {
					this.viewModel.setupParameters(this.screenApiSettings.getOnlyAppParams(window.location));
				}
				// // We may set .placement on the screen service here, but also
				// // qp-inline-screen will set it for a New UI screen inside
				// // a New UI screen (sidepanel and dialog)
				// const screenService = this.viewModel.getScreenService();
				// if (screenService && data.screenID === this.viewModel.screenID &&
				// 	screenService.placement === ScreenPlacement.Default) {
				// 	screenService.placement = this.screenApiSettings.placement;
				// }
			})
		);

		this.eventSubscriptions.push(
			ea.subscribe("screen-initialized", (data: IScreenInitializedEvent) => {
				if (this.viewModel?.screenID === data?.screenID) ready = true;
				if (data?.failure || !data?.pendingUpdate) this.initialized = true;
				getColorVariables(topDocument.head, window.document);
				setDataDirection(this.localizationsService.getLang());
			})
		);
		this.eventSubscriptions.push(
			ea.subscribe("screen-initialize-completed", () => {
				this.initialized = true;
			})
		);

		this.eventSubscriptions.push(
			ea.subscribe("screen-updated", (data: IScreenApiResult) => {
				if (ready && this.viewModel?.screenID === data?.screenID) {
					this.initialized = true;
					if (this.isMainFrame && ![ScreenPlacement.PopupDialog, ScreenPlacement.Embedded].includes(this.screenApiSettings.placement)) {
						const primaryView = this.viewModel[this.viewModel.graphInfo.primaryView];
						const newParams = data?.urlFieldNames
							? data.urlFieldNames
								.reduce((prev, fieldName) => {
									const field = primaryView[fieldName] as PXFieldState;
									if (field) {
										if (field.systemValue !== "") {
											prev[fieldName] = field.systemValue;
										}
										else if (field.value) {
											prev[fieldName] = field.textValue;
										}
									}

									return prev;
								}, {})
							: this.viewModel.getKeys();

						this.screenApiSettings.updateBrowserLocation(
							this.viewModel.siteMapScreenID,
							this.viewModel.isNewEntry(),
							newParams,
							this.viewModel?.graphInfo.pageLoadBehavior
						);
					}
				}
			})
		);

		this.eventSubscriptions.push(
			this.screenEventManager.subscribe(LoadingStartedEvent, (e: LoadingStartedEvent) => {
				e.stop();
				this.loading = true;
			})
		);

		this.eventSubscriptions.push(
			this.screenEventManager.subscribe(LoadingFinishedEvent, (e: LoadingFinishedEvent) => {
				e.stop();
				this.loading = false;
			})
		);

		this.eventSubscriptions.push(
			ea.subscribe(
				PopupMessageOpenEvent,
				(eventArgs: PopupMessageOpenEvent) => {
					const model = {
						title: this.Msg.Note,
						message: eventArgs.popupMessage,
					};
					this.alertServce.openAlert(model).then((result) => undefined);
				}
			)
		);

		this.eventSubscriptions.push(this.eventManager.addEventListener(document.body, "startScreenConfiguration", () => {
			this.editMode = true;
		}, delegationStrategy.none, true));

		this.eventSubscriptions.push(this.eventManager.addEventListener(document.body, "endScreenConfiguration", () => {
			this.editMode = false;
		}, delegationStrategy.none, true));

		this.keyboardService.setActiveArea(this.contentElement);
		this.busyService.decrement();
		return;
	}

	private detached(): void {
		this.eventSubscriptions.forEach((s) => s.dispose());
		this.eventSubscriptions = [];
		this.bindingSubscriptions.forEach((s) => s.dispose());
		this.bindingSubscriptions = [];
	}
}
