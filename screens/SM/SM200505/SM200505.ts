import {
	createSingle,
	PXScreen,
	graphInfo,
	viewInfo,
	fieldConfig,
	PXView,
	PXActionState,
	PXFieldState,
	PXFieldOptions,
} from "client-controls";
import { PXScreenWithSiteMapSupport } from "src/screens/common/screen-with-site-map-refresh";

@graphInfo({
	graphType: "PX.SM.PreferencesGeneralMaint",
	primaryView: "Prefs",
	hideFilesIndicator: true,
	hideNotesIndicator: true,
})
export class SM200505 extends PXScreenWithSiteMapSupport {
	ResetColors: PXActionState;

	@viewInfo({ containerName: "General Settings" })
	Prefs = createSingle(PreferencesGeneral);
	@viewInfo({ containerName: "Global Settings" })
	PrefsGlobal = createSingle(PreferencesGlobal);
}

export class PreferencesGeneral extends PXView {
	HomePage: PXFieldState;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				hideRootNode: true,
				idField: "PageID",
				valueField: "PageID",
				dataMember: "ArticlesForHelp",
				textField: "Title",
				iconField: "Icon",
				mode: "single"
			}
		}
	})
	HelpPage: PXFieldState<PXFieldOptions.CommitChanges>;
	UseMLSearch: PXFieldState;
	AddressLookupPluginID: PXFieldState;
	MapViewer: PXFieldState;
	TimeZone: PXFieldState;
	Theme: PXFieldState<PXFieldOptions.CommitChanges>;
	PrimaryColor: PXFieldState<PXFieldOptions.CommitChanges>;
	BackgroundColor: PXFieldState<PXFieldOptions.CommitChanges>;
	@fieldConfig({
		controlType: "qp-tree-selector",
		controlConfig: {
			treeConfig: {
				hideRootNode: true,
				idField: "PageID",
				valueField: "PageID",
				dataMember: "Articles",
				textField: "Title",
				iconField: "Icon",
				mode: "single"
			}
		}
	})
	GetLinkTemplate: PXFieldState<PXFieldOptions.CommitChanges>;
	PortalExternalAccessLink: PXFieldState;
	PersonNameFormat: PXFieldState<PXFieldOptions.CommitChanges>;
	DefaultUI: PXFieldState<PXFieldOptions.CommitChanges>;
	GridFastFilterCondition: PXFieldState;
	GridFastFilterMaxLength: PXFieldState;
	GridActionsText: PXFieldState;
	DeletingMLEventsMode: PXFieldState<PXFieldOptions.CommitChanges>;
	MLEventsRetentionAge: PXFieldState;
	SpellCheck: PXFieldState;
	Border: PXFieldState;
	BorderColor: PXFieldState;
	HiddenSkip: PXFieldState;
	ApplyToEmptyCells: PXFieldState;
	HeaderFont: PXFieldState;
	HeaderFontSize: PXFieldState;
	HeaderFontColor: PXFieldState;
	HeaderFontType: PXFieldState;
	HeaderFillColor: PXFieldState;
	BodyFont: PXFieldState;
	BodyFontSize: PXFieldState;
	BodyFontColor: PXFieldState;
	BodyFontType: PXFieldState;
	BodyFillColor: PXFieldState;
}

export class PreferencesGlobal extends PXView {
	EnableTelemetry: PXFieldState<PXFieldOptions.CommitChanges>;
}
