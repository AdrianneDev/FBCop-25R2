import {
	autoinject, createCollection, createSingle, customDataHandler, CustomEventType, graphInfo, handleEvent, localizable, PXActionState,
	PXFieldState, QpCodeEditorCustomElement, RowSelectedHandlerArgs, ScreenApiClient, QpTabbarCustomElement,
	IFieldListParent, IFieldListParentView,
	EditElementType, IEditableElementView, IEditElementOptions, IItemAction,
	ServerCommand,
	ValueChangedHandlerArgs,
	ScreenUpdateParams,
	IWizardConfig,
	CallbackCompletedHandlerArgs,
	IMenuControlConfig
} from "client-controls";

import { CustObject, RowPageTitle, RowExtensionInfo, RowScreenHtmlEdit, RowScreenTsEdit, NewTsDataFieldFilter, NewFieldPropsFilter, NewTsDataViewFilter, RowNewFieldToTs, EditTsFilter, RowAttributesEditor, NewFilterNewBaseViewPropsFilter, NewFilterNewViewPropsFilter, RowFilterAddAttributes, RowAddDecorators, RowAddDecoratorProperties, NewEventHandlerProps } from "./views";
import { AuBaseScreen } from "../common/au-base-screen";
import { IFieldListItem, IFieldListItemView } from "client-controls/controls/container/fieldset/types";
import { bindable, observable } from "aurelia-framework";
import { CustomizationEditorClient } from "./customization-editor-client";

@localizable
class Names {
	static UserDefinedFields = "User-Defined Fields";
	static SaveTsExtensionButton = "Save";
	static ExpandHierarchy = "Expand control hierarchy";
	static CollapseHierarchy = "Collapse control hierarchy";
	static AddFieldToHtml = "Add field to HTML";
	static FilterCustomizedButtonTooltip = "Show only customized controls";
	static FilterAllButtonTooltip = "Show all controls";
	static ShowProperties = "Show field properties";
	static CustomizedControlLabel = "Customized";
	static ChangedControlLabel = "Modified";
	static CustomizedControlWarning = "This control is customized in the current project.";
	static AddCodeSnippet = "Add Code Snippet";
	static AddField = "Add Field";
	static AddDataViewExtension = "Add Data View Extension";
	static AddView = "Add View";
	static AddGridView = "Add Grid View";
	static AddCustomHandler = "Add Custom Event Handler";
	static FormatCode = "Format";
	static Warning = "Warning";
	static Ok = "Ok";
	static Cancel = "Cancel";
	// static RemoveCustomField = "Remove Custom Field"; // these are example strings
	// static EditInEditor = "Edit in Editor"; // so they're commented out to pass strings compare test
}

interface EditorParams {
	position?: number;
}

const defaultAction = {
	isEnabled: () => true,
	isReadonly: () => false,
	getState: () => ""
};

function getIndentation(text: string, index: number): string {
	const prevNewLine = text.lastIndexOf("\n", index - 1);
	const start = prevNewLine >= 0 ? prevNewLine + 1 : 0;
	let result = "";
	for (let i = start; i < text.length && (text[i] === " " || text[i] === "\t"); i++) {
		result += text[i];
	}
	return result;
}

function splitAfterCurrentLine(text: string, index: number): { before: string; after: string } {
	const newLinePosition = text.indexOf("\n", index);
	if (newLinePosition >= 0) {
		return {
			before: text.substring(0, newLinePosition + 1),
			after: text.substring(newLinePosition + 1),
		};
	}
	else {
		const lastCharacter = text.substring(text.length - 1);
		return {
			before: lastCharacter === "\n" ? text : `${text}\n`,
			after: "",
		};
	}
}

function cloneFieldList(list: ICustomizationFieldListParent[]): ICustomizationFieldListParentView[] {
	return list.map(v => ({
		...v,
		collapsed: false,
		children: v.children.map(f => ({
			...f,
			hovered: false,
			selected: false
		})).filter(el => el.name)
	}));
}

function filterCustomizationFieldList(
	list: ICustomizationFieldListParentView[],
	filter: string,
	filterCustomized: boolean,
	options?: {
		searchParent?: boolean;
		toogleCollapse?: boolean;
		primaryViewId?: string;
		sort?: boolean;
		searchInChildViewId?: boolean;
		leaveEmptyParents?: boolean;
	}): ICustomizationFieldListParentView[] {
	const filterLower = filter?.toLowerCase();
	const filtered: ICustomizationFieldListParentView[] = [];
	for (const parent of list) {
		let parentContains = false;
		if (options?.searchParent
			&& (!filterLower ||
				parent.name?.toLowerCase().includes(filterLower) ||
				parent.id?.toLowerCase().includes(filterLower))
			&& (!filterCustomized || parent.isCustomized)) {
			filtered.push(parent);
			parentContains = true;
		}

		let childrenContains = false;
		if (parent.children) {
			const filteredChildren1 = !filterLower ? parent.children : parent.children.filter((c) => {
				if (c.name?.toLowerCase().includes(filterLower)) {
					return true;
				}
				if (options?.searchInChildViewId || !c.id) {
					return c.id?.toLowerCase().includes(filterLower);
				}

				const idSplit = c.id.split(".");
				const id = idSplit.length > 1 ? idSplit[1] : idSplit[0];
				return id.toLowerCase().includes(filterLower);
			});

			const filteredChildren2 = !filterCustomized ? filteredChildren1 : filteredChildren1.filter(c => c.isCustomized);

			if (!parentContains && (filteredChildren2.length > 0 || options?.leaveEmptyParents)) {
				filtered.push({ ...parent, children: filteredChildren2 });
			}
			childrenContains = filteredChildren2.length > 0;
		}

		if (options?.toogleCollapse) {
			parent.collapsed = !filterLower || !childrenContains;
		}
	}

	if (options?.sort) {
		filtered.forEach(parent => {
			if (!parent.children || parent.children.length < 2) {
				return;
			}
			parent.children.sort((a, b) => a.name.localeCompare(b.name));
		});
		filtered.sort((a, b) => {
			if (a.id === "UserDefinedFields") return -1;
			if (b.id === "UserDefinedFields") return 1;
			if (options?.primaryViewId) {
				if (a.id === options.primaryViewId) {
					return b.id === options.primaryViewId ? 0 : -1;
				}
				if (b.id === options.primaryViewId) {
					return 1;
				}
			}
			return a.id.localeCompare(b.id);
		});
	}

	return filtered;
};

interface ICustomizationFieldListParent extends IFieldListParent {
	isGrid: boolean;
	isCustomized: boolean;
	isChanged;
	label?: string;
	labelTooltip?: string;
	children: ICustomizationFieldListItem[];
}

interface ICustomizationFieldListParentView extends IFieldListParentView {
	isGrid: boolean;
	isCustomized: boolean;
	isChanged: boolean;
	selected?: boolean;
	label?: string;
	children: ICustomizationFieldListItemView[];
}

interface ICustomizationFieldListItem extends IFieldListItem {
	isCustomized: boolean;
	isChanged;
	deletable: boolean;
	label?: string;
	labelTooltip?: string;
}

interface ICustomizationFieldListItemView extends IFieldListItemView {
	isCustomized: boolean;
	isChanged: boolean;
	label?: string;
	selected: boolean;
}

@graphInfo({ graphType: "PX.SM.AUModernUIScreenMaint", primaryView: "Items", })
export class AU201080 extends AuBaseScreen {
	saveAll: PXActionState;
	cancelAll: PXActionState;
	rollbackHtml: PXActionState;
	htmlDiff: PXActionState;
	newExtension: PXActionState;
	format: PXActionState;
	validate: PXActionState;
	AddFields: PXActionState;
	CloseAddPanel: PXActionState;

	finishAddDataFieldToTs: PXActionState;
	finishAddFieldSnippet: PXActionState;
	finishAddEventHandlerSnippet: PXActionState;
	actionAddDecorators: PXActionState;

	ViewPageTitle = createSingle(RowPageTitle);
	Items = createCollection(CustObject);
	ExtensionInfo = createSingle(RowExtensionInfo);
	ScreenHtmlEdit = createSingle(RowScreenHtmlEdit);
	FilterNewField = createSingle(NewTsDataFieldFilter);
	FilterNewFieldProps = createSingle(NewFieldPropsFilter);
	FilterNewBaseViewPropsFilter = createSingle(NewFilterNewBaseViewPropsFilter);
	FilterNewViewPropsFilter = createSingle(NewFilterNewViewPropsFilter);
	FilterNewView = createSingle(NewTsDataViewFilter);
	FilterNewEventHandlerProps = createSingle(NewEventHandlerProps);

	FilterEditExtension = createSingle(EditTsFilter);
	NewFields = createCollection(RowNewFieldToTs);
	NewFieldsForNewView = createCollection(RowNewFieldToTs);
	ScreenTsEdit = createSingle(RowScreenTsEdit);
	AttributesEditor = createSingle(RowAttributesEditor);

	FilterAddAttributes = createSingle(RowFilterAddAttributes);
	AddDecorators = createCollection(RowAddDecorators);
	AddDecoratorProperties = createCollection(RowAddDecoratorProperties);

	wizardConfig: IWizardConfig = {
		nextCommand: "WNext",
		saveCommand: "WSave",
		buttons: {
			done: "Finish",
		},
		validateInput: true,
	};

	@observable	extensionsMenuConfig:IMenuControlConfig = {
		id: "addSnippetActionsMenu",
		text: Names.AddCodeSnippet,
		options: [
			{
				id: "addFieldAction",
				text: Names.AddField,
				type: "MenuButton",
				commandName: "addFieldSnippet",
			}, {
				id: "addBaseViewAction",
				text: Names.AddDataViewExtension,
				type: "MenuButton",
				commandName: "addBaseViewSnippet",
			}, {
				id: "addViewAction",
				text: Names.AddView,
				type: "MenuButton",
				commandName: "addViewSnippet",
			}, {
				id: "addGridViewAction",
				text: Names.AddGridView,
				type: "MenuButton",
				commandName: "addGridViewSnippet",
			}, {
				id: "addCustomHandlerAction",
				text: Names.AddCustomHandler,
				type: "MenuButton",
				commandName: "addCustomHandlerSnippet",
			}
		]
	};

	@observable	allFields: ICustomizationFieldListParentView[] = [];
	currentAvailableFields: ICustomizationFieldListParentView[];

	private prevAvailableFieldsFilter: string;
	private prevFilterCustomized: boolean = false;
	private htmlContentControl: QpCodeEditorCustomElement;
	private editTsControl: QpCodeEditorCustomElement;

	@autoinject
	protected customizationEditorClient: CustomizationEditorClient;

	private filteredByCustomized: boolean = false;
	private customPropertiesModified: boolean = false;

	private selectedNodeId?: string = undefined;
	private collapsedNodes: string[] = [];

	private readonly Names = Names;


	private deleteViewOrFieldDialogConfig = {
		caption: Names.Warning,
		templateId: "deleteViewOrField-dialog",
		hideMaximizer: true,
		cssClass: "non-responsive-dialog"
	};

	private deleteViewOrFieldOkButtonConfig = {
		text: Names.Ok,
		id: "deleteViewOrField-dialog-ok",
		dialogResult: 1,
		enabled: true
	};

	private deleteViewOrFieldCancelButtonConfig = {
		text: Names.Cancel,
		id: "deleteViewOrField-dialog-cancel",
		dialogResult: 2,
		enabled: true
	};

	private customizationTreeNodeMenuConfig = {
		images: { normal: "svg:main@dots" },
		hideOpener: true,
		tabIndex: -1,
	};

	getCustomizationTreeNodeMenuConfig(field: ICustomizationFieldListItem) {
		const options = [];
		if (field.deletable) {
			// TODO: uncomment these strings in the Names class when they will be approved
			options.push({ type: "MenuButton", text: "" /* Names.RemoveCustomField */, commandName: "remove", images: { normal: "svg:main@delete" } });
		}
		options.push({ type: "MenuButton", text: "" /* Names.EditInEditor */, commandName: "edit", images: { normal: "svg:main@edit" } });
		return {
			...this.customizationTreeNodeMenuConfig,
			id: `customization_editor_node_menu_${field.id}`,
			options: options,
		};
	}

	async processSnippetMenuSelected(e: CustomEvent) {
		await this.screenService.executeCommand(e.detail.commandName);
	}

	processCustomizationTreeNodeMenu(e: CustomEvent, config: IEditableElementView) {
		const fieldId = config.id;

		switch (e.detail.commandName) {
			case "edit":
				this.editInEditor(fieldId);
				break;
			case "remove":
				this.removeCustomField(fieldId);
				break;
		}
	}

	editInEditor(fieldId: string) {
		//
	}

	removeCustomField(fieldId: string) {
		//
	}

	async addFieldToHtml(e: MouseEvent, config: IEditableElementView) {
		e.stopPropagation();

		const html = this.ScreenHtmlEdit.HtmlContent.value;
		if (!html) return;

		const editorPosition = this.htmlContentControl.currentCursorPosition;
		const indentation = getIndentation(html, editorPosition);
		const { before, after } = splitAfterCurrentLine(html, editorPosition);
		// config.id has the form "view.field", which is what exactly required in <field> tag
		const fieldHtml = `${indentation}<field name="${config.id}"></field>\n`;
		this.ScreenHtmlEdit.HtmlContent.value = before + fieldHtml + after;
		await this.screenService.update();
		this.htmlContentControl.currentCursorPosition = before.length + fieldHtml.length - 1;
		this.htmlContentControl.scrollCursorIntoView();
		this.saveAll.enabled = true;
	}

	async showItemProperties(e: MouseEvent, config: IEditableElementView) {
		e.stopPropagation();
		const parts = config.id.split(".");
		if (parts.length >= 2) {
			this.AttributesEditor.ViewName.value = parts[0];
			this.AttributesEditor.FieldName.value = parts[1];
			await this.screenService.executeCommand(new ServerCommand("readFieldAttributes", ["changeItemMode"]), new ScreenUpdateParams({ views: ["AttributesEditor"], }));
		}
	}

	async showViewProperties(e: MouseEvent, config: IEditableElementView) {
		e.stopPropagation();
		this.AttributesEditor.ViewName.value = config.id;
		this.AttributesEditor.FieldName.value = "";
		await this.screenService.executeCommand(new ServerCommand("readViewAttributes", ["changeItemMode"]), new ScreenUpdateParams({ views: ["AttributesEditor"], }));
	}

	deleteViewOrField() {
		const model = {
			...this.deleteViewOrFieldDialogConfig,
			context: this,
		};
		this.dialogHelper.openDialog(model);
	}

	doDeleteViewOrField() {
		this.screenService.executeCommand(new ServerCommand("deleteViewOrField"));
	}

	@handleEvent(CustomEventType.ValueChanged, { view: "AttributesEditor", field: "CustomProperties" })
	attributesEditor_CustomProperties_ValueChanged(args: ValueChangedHandlerArgs) {
		this.updateCustomPropertiesModified();
		this.allFields.forEach(view => {
			if (view.id === this.AttributesEditor.ViewName.value) {
				if (this.AttributesEditor.FieldName.value) {
					view.children.forEach(field => {
						if (field.id === `${view.id}.${this.AttributesEditor.FieldName.value}`) {
							field.label = Names.ChangedControlLabel;
							field.isChanged = true;
						}
					});

				} else {
					view.label = Names.ChangedControlLabel;
					view.isChanged = true;
				}
			}
		});
	}


	@handleEvent(CustomEventType.RowSelected, { view: "AttributesEditor" })
	attributesEditor_RowSelected(args: RowSelectedHandlerArgs) {
		this.updateCustomPropertiesModified();
	}

	@handleEvent(CustomEventType.RowSelected, { view: "ScreenHtmlEdit" })
	async screenHtmlEditRowSelected(args: RowSelectedHandlerArgs<RowScreenHtmlEdit>): Promise<void> {
		this.updateCustomPropertiesModified();

		const fieldStates = await this.customizationEditorClient.getFieldsData(args.viewModel.ScreenId.value);

		if (!fieldStates) {
			throw new Error("Screen should have any structure data");
		}

		const allFields: ICustomizationFieldListParent[] = [];
		const udfParent: ICustomizationFieldListParent = {
			id: "UserDefinedFields",
			name: Names.UserDefinedFields,
			visible: true,
			children: [],
			isGrid: false,
			isCustomized: false,
			isChanged: false
		};

		const sortedViews = Object.entries(fieldStates.views)
			.map(([key, view]) => ({ key, ...view }))
			.sort((a, b) => a.order - b.order);

		for (const view of sortedViews) {
			const viewName = view.key;
			const children = [];

			const sortedFields = Object.entries(view.fields)
				.map(([key, field]) => ({ key, ...field }))
				.sort((a, b) => a.order - b.order);

			for (const field of sortedFields) {
				const fieldName = field.key;
				const isUdf = false;
				const id = `${viewName}.${fieldName}`;
				const fieldModel: ICustomizationFieldListItem = {
					id,
					name: field.displayName,
					parentId: isUdf ? "UserDefinedFields" : viewName,
					visible: true,
					tabSkip: false,
					pinned: false,
					required: false,
					deletable: false,
					isUdf: isUdf,
					visibility: undefined,
					isCustomized: field.isCustomized,
					isChanged: field.isChanged,
					label: field.isChanged ? Names.ChangedControlLabel :  field.isCustomized ? Names.CustomizedControlLabel : null,
					labelTooltip: field.isCustomized ? Names.CustomizedControlWarning : null,
				};

				if (isUdf) {
					udfParent.children.push(fieldModel);
				}
				else {
					children.push(fieldModel);
				}
			}
			const parent: ICustomizationFieldListParent = {
				id: viewName,
				name: view.displayName ?? viewName,
				visible: true,
				children: children,
				isGrid: view.isGrid,
				isCustomized: view.isCustomized,
				isChanged: view.isChanged,
				label: view.isChanged ? Names.ChangedControlLabel : view.isCustomized ? Names.CustomizedControlLabel : null,
				labelTooltip: view.isCustomized ? Names.CustomizedControlWarning : null,
			};
			allFields.push(parent);

		}
		if (udfParent.children.length > 0) {
			allFields.unshift(udfParent);
		}

		this.allFields = cloneFieldList(allFields);
		this.searchAvailableFields(this.prevAvailableFieldsFilter ?? "", this.prevFilterCustomized, true);
	}

	updateCustomPropertiesModified() {
		this.customPropertiesModified = this.AttributesEditor.CustomPropertiesModified.value || this.AttributesEditor.CustomProperties.getValueChanged();
	}

	toggleCollapse(e: MouseEvent, item: { id: string }) {
		e.stopPropagation();
		const isCollapsed = this.collapsedNodes.includes(item.id);
		isCollapsed ? this.collapsedNodes = this.collapsedNodes.filter(id => id !== item.id) : this.collapsedNodes = [ ...this.collapsedNodes, item.id ];
	}

	setActive(item: ICustomizationFieldListParentView | ICustomizationFieldListItemView) {
		this.selectedNodeId = item.id;
		return true;
	}

	filterCustomized() {
		this.filteredByCustomized = !this.filteredByCustomized;
		this.searchAvailableFields(this.prevAvailableFieldsFilter, this.filteredByCustomized);
	}

	searchAvailableFields(filter: string, filterCustomized: boolean, force?: boolean) {
		if (!force && filter === this.prevAvailableFieldsFilter && filterCustomized === this.prevFilterCustomized) {
			return;
		}
		this.currentAvailableFields = filterCustomizationFieldList(this.allFields, filter, filterCustomized, {
			searchParent: true,
			toogleCollapse: false,
			sort: false,
			primaryViewId: this.graphInfo.primaryView,
		});
		this.prevAvailableFieldsFilter = filter;
		this.prevFilterCustomized = filterCustomized;
	}

	@customDataHandler<EditorParams>((screen: AU201080) => {
		const editorPosition = screen?.editTsControl?.currentCursorPosition ?? Number.MIN_VALUE;
		return {
			position: editorPosition
		};
	})
	AU201080Handler(result: { SetFocusToExtensionName: boolean; SetFocusToTsCodeEditor: boolean; TsCodeEditorPosition: number }) {
		// if (result.SetFocusToExtensionName) {
		// 	const el = document.querySelector("[control-id='edFilterEditExtension-ExtensionName'] input") as HTMLElement;
		// 	if (el) {
		// 		el.focus();
		// 	}
		// } else if (result.SetFocusToTsCodeEditor) {
		// 	const timeOut = 50;
		// 	setTimeout(()=> {this.editTsControl.currentCursorPosition = result.TsCodeEditorPosition;}, timeOut);
		// 	this.editTsControl.currentCursorPosition = result.TsCodeEditorPosition;
		// }
	}

	async rollbackAttributes() {
		if (this.AttributesEditor.FieldName.value) {
			await this.screenService.executeCommand(new ServerCommand("readFieldAttributes", ["rollBackMode"]));
		}
		else {
			await this.screenService.executeCommand(new ServerCommand("readViewAttributes", ["rollBackMode"]));
		}
	}

	protected override onActionsUpdate(): void {
		super.onActionsUpdate();

		if (this.actions) {
			for (const o of this.extensionsMenuConfig.options) {
				o.disabled = false;
				if (o.commandName && this.actions.get(o.commandName)) {
					o.disabled = !this.actions.get(o.commandName).enabled;
				}
			};
		}
	}
}
