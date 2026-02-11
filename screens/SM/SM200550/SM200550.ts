import {
	graphInfo,
	PXScreen,
	PXView,
	PXFieldState,
	PXFieldOptions,
	createSingle,
	createCollection,
	gridConfig,
	columnConfig,
	GridPreset,
	localizable,
	PXActionState,
} from "client-controls";

@localizable
class Labels {
	static SelectLanguages = "Select Input Languages";
	static SelectLanguagesExtension = "Select Languages for Multilingual Text Boxes";
	static AdditionalLanguages = "Additional Languages";
}

@graphInfo({ graphType: "PX.SM.LocaleMaintenance", primaryView: "Locales", bpEventsIndicator: false })
export class SM200550 extends PXScreen {
	Locales = createCollection(Locales);
	AlternativeDetails = createCollection(AlternativeDetails);

	AlternativeHeader = createSingle(AlternativeHeader);
	Formats = createSingle(Formats);
}

@gridConfig({
	preset: GridPreset.Primary,
	topBarItems: {
		setUpAlternatives: { config: {commandName: "setUpAlternatives", text: Labels.SelectLanguages, toolTip: Labels.SelectLanguagesExtension }}
	}
})
export class Locales extends PXView {
	setUpAlternatives: PXActionState;

	@columnConfig({hideViewLink: true})
	LocaleName: PXFieldState;
	CultureReadableName: PXFieldState;
	TranslatedName: PXFieldState;
	Description: PXFieldState;
	// eslint-disable-next-line id-denylist
	Number: PXFieldState;
	IsActive: PXFieldState;
	ShowValidationWarnings: PXFieldState;
	IsDefault: PXFieldState;
	IsAlternative: PXFieldState;
}

export class AlternativeHeader extends PXView {
	DefaultLanguageName: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.ReadOnly,
	syncPosition: true,
	caption: Labels.AdditionalLanguages,
})
export class AlternativeDetails extends PXView {
	@columnConfig({allowSort: false, allowCheckAll: true})
	IsAlternative: PXFieldState;
	LanguageName: PXFieldState;
	NativeName: PXFieldState;
}

export class Formats extends PXView {
	TemplateLocale: PXFieldState<PXFieldOptions.CommitChanges>;
	DateTimePattern: PXFieldState;
	TimeShortPattern: PXFieldState;
	TimeLongPattern: PXFieldState;
	DateShortPattern: PXFieldState;
	DateLongPattern: PXFieldState;
	AMDesignator: PXFieldState;
	PMDesignator: PXFieldState;
	NumberDecimalSeporator: PXFieldState<PXFieldOptions.CommitChanges>;
	NumberGroupSeparator: PXFieldState<PXFieldOptions.CommitChanges>;
}

