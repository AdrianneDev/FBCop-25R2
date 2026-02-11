import {
	PXView,
	PXFieldState,
	graphInfo,
	PXScreen,
	createCollection,
	createSingle,
	PXFieldOptions,
	treeConfig,
	PXPageLoadBehavior,
	PXActionState,
	gridConfig,
	GridPreset,
	localizable,
	GridNoteFilesShowMode,
	columnConfig
} from "client-controls";

@localizable
class Tooltips {
	static CopyValidationRules = "Copy Validation Rules";
	static PasteValidationRules = "Paste validation rules from clipboard";
}

@graphInfo({
	graphType: "PX.Objects.CR.CRDuplicateValidationSetupMaint",
	primaryView: "Setup",
	pageLoadBehavior: PXPageLoadBehavior.InsertRecord,
})
export class CR103000 extends PXScreen {
	CurrentNode = createSingle(Node);
	Setup = createSingle(Setup);
	ValidationRules = createCollection(ValidationRules);
	Nodes = createCollection(Nodes);
}

@treeConfig({
	dynamic: true,
	hideRootNode: true,
	idField: "ID",
	textField: "Description",
	modifiable: false,
	mode: "single",
	singleClickSelect: true,
	selectFirstNode: true,
	syncPosition: true,
	hideToolbarSearch: true,
})
export class Nodes extends PXView {
	ID: PXFieldState;
	Description: PXFieldState;
}

export class Node extends PXView {
	ValidationThreshold: PXFieldState<PXFieldOptions.CommitChanges>;
	ValidateOnEntry: PXFieldState<PXFieldOptions.CommitChanges>;
}

@gridConfig({
	preset: GridPreset.Details,
	fastFilterByAllFields: false,
	showNoteFiles: GridNoteFilesShowMode.Suppress,
	initNewRow: true,
	topBarItems: {
		Copy: {
			index: 3,
			config: {
				commandName: "Copy",
				images: {
					normal: "main@Copy"
				},
				toolTip: Tooltips.CopyValidationRules
			},
		},
		Paste: {
			index: 4,
			config: {
				commandName: "Paste",
				images: {
					normal: "main@Paste"
				},
				toolTip: Tooltips.PasteValidationRules
			},
		},
	},
	actionsConfig: {
		exportToExcel: { hidden: true },
	}
})
export class ValidationRules extends PXView {
	Copy: PXActionState;
	Paste: PXActionState;

	ValidationType: PXFieldState;
	@columnConfig({ editorType: "qp-drop-down" })
	MatchingFieldUI: PXFieldState<PXFieldOptions.CommitChanges>;
	ScoreWeight: PXFieldState<PXFieldOptions.CommitChanges>;
	TransformationRule: PXFieldState<PXFieldOptions.CommitChanges>;
	CreateOnEntry: PXFieldState<PXFieldOptions.CommitChanges>;
}

export class Setup extends PXView {
	DuplicateScoresNormalization: PXFieldState;
	DuplicateCharsDelimiters: PXFieldState;
}
