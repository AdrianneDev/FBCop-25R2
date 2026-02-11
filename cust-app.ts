import { Disposable, bindable, autoinject, BindingEngine } from "aurelia-framework";
import { getLogger } from "aurelia-logging";
import { EventAggregator } from "aurelia-event-aggregator";
import { EventManager, delegationStrategy } from "aurelia-binding";
import { Container } from "aurelia-dependency-injection";
import {
	QpEventManager, OpenPopupEvent, ExecuteCommandEvent, PXScreen,
	IDataComponentParams, IScreenService, RefreshScreenEvent, ReloadPageEvent, ScreenApiSettings, RedirectHelper,
	DefaultPreferencesDataComponent,
	UserPreferencesDataComponent,
	ClosePopupEvent,
	showInformer,
	TranslationValidationDataComponent,
	IScreenInitializedEvent,
	ScreenPlacement,
	LoadingStartedEvent,
	LoadingFinishedEvent,
	IScreenApiResult,
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
	topDocument
} from "client-controls";
import { getScreenIdFromUrl, getScreenPath } from "./screen-utils";
import { DialogController, DialogOpenResult } from "aurelia-dialog";
const logger = getLogger("qp-app");

@localizable
class Messages {
	static ScreenID = "Screen ID";
	static Note = "Note";
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
	busyService: BusyCounter;
	isMainFrame: boolean = true;

	eventSubscriptions: Disposable[] = [];
	bindingSubscriptions: Disposable[] = [];
	baseHref: string = "";
	editMode: boolean = false;
	siteMapScreenID?: string;

	private Msg = Messages;
	private screenEventManager: QpEventManager;
	private giScreenID = "GenericInquiry";
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
		container.registerInstance(KeyboardService, this.keyboardService);
		this.busyService = container.get(BusyCounter);
		this.busyService.increment();
	}

	viewModelActivated() {
		this.screenService = this.viewModel.getScreenService();
		if (window.frameElement) {
			if (this.siteMapScreenID !== this.giScreenID && this.isMainFrame) {
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

		this.screenService.registerDataComponentOneTime("TranslationValidation",
			this.translationValidationComponent);
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
			caption: msg.dialogMessage
		};
		const dialogConfig: IQpDialogConfig = {
			...generalDialogConfig, ...msg.detail?.content, ...{ id: msg.dialogId, data: msg.detail?.data }
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

		this.screenEventManager.subscribe(OpenPopupEvent, (message: OpenPopupEvent) => {
			message.stop();
			this.openDialog(message);
		});

		this.screenEventManager.subscribe(ClosePopupEvent, () => {
			if (this.openDialogs.length) {
				this.openDialogs[this.openDialogs.length - 1].close(false);
			}
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
					this.viewModel.setupParameters(this.screenApiSettings.getOnlyAppParams());
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
			})
		);

		this.eventSubscriptions.push(
			ea.subscribe("screen-updated", (data: IScreenApiResult) => {
				if (ready && this.viewModel?.screenID === data?.screenID) {
					this.initialized = true;
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
			this.screenEventManager.subscribe(LoadingFinishedEvent, (e: LoadingStartedEvent) => {
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
