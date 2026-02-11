import { filter } from './../../SC/SC301000/views';
import { computedFrom, ElementEvents } from "aurelia-framework";

import {
	createCollection,
	graphInfo,
	PXView,
	PXFieldState,
	viewInfo,
	GridPreset,
	createSingle,
	GridPagerMode,
	localizable,
	ServerCommand,
	ScreenUpdateParams,
	QpGridCustomElement,
	readOnly,
	PXActionState,
	PXFieldOptions,
	RowCssHandlerArgs,
	PXViewCollection,
	CustomEventType,
	handleEvent,
	QpGridEventArgs,
	CellCssHandlerArgs,
	QpTabbarCustomElement,
	CallbackCompletedHandlerArgs,
	columnConfig,
	GridColumnType,
	IToolBarControlConfig,
	MenuItemRenderType,
	gridConfig,
	GridColumnShowHideMode,
	KeyboardService
} from "client-controls";

import { NewMenuButton, QpToolBarCustomElement } from "client-controls/controls/compound/tool-bar/qp-tool-bar";
import { RMDataSource, RMStyle } from "../common/arm/arm-reports-views";
import { ArmScreen, BorderType, RMParameters } from "../common/arm/arm-base";

@localizable
export class Labels {
	static NewRowSet = "New Row Set";
	static InsertRow = "Insert row";
	static Copy = "Copy";
	static Paste = "Paste";
	static Reset = "Reset";
	static CopyRowFormatting = "Copy Row Formatting (Ctrl+Shift+C)";
	static PasteRowFormatting = "Paste Row Formatting (Ctrl+Shift+V)";
	static ResetRowFormatting = "Reset Row Formatting";
	static CopyRows = "Copy Rows";
	static CutRows = "Cut Rows";
	static PasteRows = "Paste Rows";
	static AddItems = "Add Items";
	static Row = "Row";
}

export const nameof = (name: Extract<keyof CS206010, string>): string => name;

@graphInfo({ graphType: "PX.CS.RMRowSetMaint", primaryView: "RowSetOrdered" })
export class CS206010 extends ArmScreen {
	Renumber: PXActionState;
	// CopyRowSet: PXActionState;
	CopyFormatting: PXActionState;
	PasteFormatting: PXActionState;
	ResetFormatting: PXActionState;

	RowSetOrdered = createSingle(RMRowSet);
	CurrentRow = createSingle(RMRow);
	@viewInfo({syncAlways: true}) // this is somehow not enough, platform still sends "retrieveMode: 1" for CurrentRowDataSource
	CurrentRowDataSource = createSingle(RMDataSource);
	CurrentRowStyle = createSingle(RMStyle);
	NewRowSetPanel = createSingle(RMNewRowSetPanel);
	Parameter = createSingle(ParamFilter);

	formattingToolbarConfig : IToolBarControlConfig =  {
		id: "formattingToolbarId",
		items: {

			CopyFormatting: {
				// type: "menu-options",
				index: 0,
				config: {
					commandName: "CopyFormatting",
					toolTip: Labels.CopyRowFormatting,
					images: { normal: "main@Copy" },
					text: Labels.Copy,
					shortcutChar: "C",
					shortcutCtrl: true,
					shortcutShift: true,
					disabled: false,
					renderAs: MenuItemRenderType.IconAndText,
				}
			},
			PasteFormatting: {
				index: 1,
				config: {
					commandName: "PasteFormatting",
					toolTip: Labels.PasteRowFormatting,
					images: { normal: "main@Paste" },
					text: Labels.Paste,
					shortcutChar: "V",
					shortcutCtrl: true,
					shortcutShift: true,
					disabled: true,
					renderAs: MenuItemRenderType.IconAndText,
				}
			},
			ResetFormatting: {
				index: 2,
				config: {
					commandName: "ResetFormatting",
					toolTip: Labels.ResetRowFormatting,
					images: { normal: "main@RecordDel" },
					text: Labels.Reset,
					disabled: false,
					renderAs: MenuItemRenderType.IconAndText,
				}
			}
		},
		changed: true,
		styleChanged: true,
	};


	topBarConfig =  {
		id: "topBarItemsConfigID",
		items: {
			ts_First: { config: { hidden: true, } },
			ts_Next: { config: { hidden: true, } },
			ts_Previous: { config: { hidden: true, } },
			ts_Last: { config: { hidden: true, } },
			ts_CopyPaste: { config: { hidden: true, } },  // can't  use CanClipboardCopyPaste() as the buttons were hidden in ASPX but accessible via API
			"ts_CopyPaste@CopyDocument": { config: { hidden: true, } },
			"ts_CopyPaste@PasteDocument": { config: { hidden: true, } },
			"ts_CopyPaste@SaveTemplate": { config: { hidden: true, } },
		}
	};

	@viewInfo({ containerName: "Rows" })
	RowsOrdered = createCollection(RMRowMini);

	@viewInfo({ containerName: "Styles" })
	@gridConfig({
		preset: GridPreset.Details,
		pageSize: 0,
		pagerMode: GridPagerMode.NextPrevFirstLast,
	})
	Styles = createCollection(RMStyle);

	rowsOrderedGrid: QpGridCustomElement;
	splitterElement: HTMLElement;
	tabBarElement: HTMLElement;
	tabBar: QpTabbarCustomElement;
	private _domEvents: ElementEvents;
	private _rowStyles: Record<string, RMStyle>;
	private readonly _colorNums = 5; // eslint-disable-line @typescript-eslint/no-magic-numbers
	private readonly _printHidden = 1;

	private _lastManualTabId: string | null = null;

	async attached() {
		await super.attached();
		this.attachToolbarHandling();

		const dc = this.screenService.getDataComponent("ScreenToolbar");
		if (dc?.appendComponentData) {
			dc?.appendComponentData(this.topBarConfig);
		}

		if (this.rowsOrderedGrid) {
			const items = this.rowsOrderedGrid.config.topBarItems;
			if (items) {
				items.InsertRow.config.target = this.element;
				this.rowsOrderedGrid?.setTopBarButtonsState();
			}
			this.rowsOrderedGrid.config.topBarItems;
			this.rowsOrderedGrid.setTopBarButtonsState();
		}

		if (!this.RowSetOrdered.RowSetCode?.value?.id) {
			await this.screenService.update(new ServerCommand("insert"), new ScreenUpdateParams({ blockPage: false }));
		}
	}

	updateStylesheet(row: RMRowMini) {
		const cssClass = `arm-row-${row.SortOrder.value}-`;
		const styles = document.styleSheets;
		const stylesheet = Array.from(styles).find((s) => s.ownerNode?.textContent?.includes(cssClass));
		const newContent = this.prepareStlysheet(row);
		this.replaceCssStyle(stylesheet, newContent);
	}

	clearHighlightings() {
		const cssClassPrefix = `arm-row-highlighting`;
		const styles = Array.from(document.styleSheets).filter((s) => s.ownerNode?.textContent?.includes(cssClassPrefix));
		styles.forEach(stylesheet => {
			this.replaceCssStyle(stylesheet, "");
		});
	}

	highlightRowBorder(styleTop: string | null, styleBottom: string | null, styleStartEnd: string, cssClass: string) {
		const prefix = `${cssClass}:not(:has(> td.edit:not(.read-only)))`;
		let cssStyles = `
			.${prefix} > td:first-child {
				border-left: ${styleStartEnd};
			}
			.${prefix} > td:last-child {
				border-right: ${styleStartEnd};
			}
		`;
		if (!!styleTop && !!styleBottom) {
			cssStyles += `
				.${prefix} > td {
					border-top: ${styleTop};
					border-bottom: ${styleBottom};
				}
				.${prefix} > td > span {
					height: calc(var(--qp-grid-row-height) - 3px) !important;
				}`;
		}
		else if (!!styleTop) {
			cssStyles += `
				.${prefix} > td {
					border-top: ${styleTop};
				}
				.${prefix} > td > span {
					height: calc(var(--qp-grid-row-height) - 2px) !important;
				}`;
		}
		else if (!!styleBottom) {
			cssStyles += `
				.${prefix} > td {
					border-bottom: ${styleBottom};
				}
				.${prefix} > td > span {
					height: calc(var(--qp-grid-row-height) - 1px) !important;
				}`;
		}
		else {
			// cssStyles += `.${prefix} > td { }`;
		}
		return cssStyles;
	}

	getCssProperty(rule: string, name: string) {
		return rule.match(new RegExp(`${name}:([^;]*)`, "i"))?.[1].trim();
	}

	highlightRow(from: number, to: number, borderSnippets: Map<number, string>, overwrite: boolean, borderColor: string, backgroundColor: string | null, borderWidth: string) {
		const maxSortOrder = Math.max(...this.RowsOrdered.records.map(x => x.SortOrder?.value), 0);
		for (let row = from; row <= Math.min(to, maxSortOrder); row ++) {
			const cssClass = `arm-row-highlighting-${row}-`;
			const stylesheet = Array.from(document.styleSheets).find((s) => s.ownerNode?.textContent?.includes(cssClass));

			let cssStyles = !backgroundColor ? "" : `
				${overwrite ? ".modern-ui table tr" : ""}.${cssClass} > td {
					--qp-highlight-color: ${backgroundColor} ${overwrite ? "!important" : ""};
					--qp-grid-selected-bg-color: ${backgroundColor} ${overwrite ? "!important" : ""};
					background-color: ${backgroundColor} ${overwrite ? "!important" : ""};
				}
			`;

			const preparedStyle = borderSnippets.get(row);
			const oldTopStyle = !preparedStyle ? null : this.getCssProperty(preparedStyle, "border-top");
			const oldBottomStyle = !preparedStyle ? null : this.getCssProperty(preparedStyle, "border-bottom");
			const oldStartEndStyle = !preparedStyle ? null : this.getCssProperty(preparedStyle, "border-left");

			const borderStyle = `${borderWidth} solid ${borderColor} !important`;
			const styleTop = oldTopStyle ?? (row === from ? borderStyle : null);
			const styleBottom = oldBottomStyle ?? (row === to ? borderStyle : null);
			const styleStartEnd = oldStartEndStyle ?? borderStyle;
			const borderCss = this.highlightRowBorder(styleTop, styleBottom, styleStartEnd, cssClass);
			borderSnippets.set(row, borderCss);

			cssStyles += borderSnippets.get(row);
			this.replaceCssStyle(stylesheet, `${cssStyles}`);
		}
	}


	@handleEvent(CustomEventType.GetRowCss, { view: "RowsOrdered" })
	getReturnedRowCss(args: RowCssHandlerArgs<PXViewCollection<RMRowMini>>) {
		const row = args?.selector?.row as RMRowMini;
		this.updateStylesheet(row);
		return `arm-row-${args?.selector?.row.SortOrder.value}- arm-row-highlighting-${args?.selector?.row.SortOrder.value}-`;
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "RowsOrdered", column: "Description" } )
	getReturnedCellCssDescription(args: CellCssHandlerArgs<PXViewCollection<RMRowMini>>) {
		const row = args?.selector?.row;
		if (row.hasLineStyle) {
			return `arm-row-line-${args?.selector?.row.SortOrder.value}-`;
		}
		return `arm-row-description-${args?.selector?.row.SortOrder.value}-`;
	}

	@handleEvent(CustomEventType.GetCellCss, { view: "RowsOrdered", column: "Preview" } )
	getReturnedCellCssPreview(args: CellCssHandlerArgs<PXViewCollection<RMRowMini>>) {
		const row = args?.selector?.row;
		if (row.hasLineStyle) {
			return `arm-row-line-${args?.selector?.row.SortOrder.value}-`;
		}
		return "";
	}

	@handleEvent(CustomEventType.CallbackCompleted)
	async onActionCompleted(args: CallbackCompletedHandlerArgs<any>) {
		// Check if we need to restore the tab we were on
		if (!!this._lastManualTabId && !!this.CurrentRow?.DataVisible?.value) {
			this.tabBar?.showTab(this._lastManualTabId);
		}

		this.formattingToolbarConfig.items.PasteFormatting.config.disabled = !(this.PasteFormatting?.enabled ?? false);
		this.formattingToolbarConfig.changed = true;
	}

	protected prepareStlysheet(row: RMRowMini) {
		const cssMainClass = `
			.arm-row-${row.SortOrder.value}-:not(.active) > td:not(:has(input)),
			.arm-row-${row.SortOrder.value}- > td:not(.row-selector):not(:has(input))
			`;
		const cssLineClass = `.arm-row-line-${row.SortOrder.value}-`;
		const cssDescriptionClass = `.arm-row-description-${row.SortOrder.value}-`;
		const rowStyle = this._rowStyles[row.StyleID.value];
		if (!rowStyle) return "";

		const rowCssStyle = this.getFontCssStyle(rowStyle);
		const bgColor = row.PrintControl?.value === this._printHidden || row.RowType.value === ARmRowType.Sort
			? "var(--arm-hidden-background-color)"
			: rowStyle.BackColorRGBA.value;
		const rowBackgroundStyle = this.getBackgroundCssStyle(bgColor);
		const lineCssStyle = row.hasLineStyle ? this.getBorderCssStyle(row.LineStyle.value, rowStyle.ColorRGBA.value) : "";
		const descriptionCssStyle = `
			${(row.Indent.value > 0) ? `padding-left: ${row.Indent.value}px !important;` : ""}
			${this.getTextAlignCssStyle(rowStyle)}
		`;

		return `
			${cssMainClass}, ${cssMainClass} * { ${rowCssStyle} }
			${cssMainClass} { ${rowBackgroundStyle}}
			${cssDescriptionClass} > * { ${descriptionCssStyle} }
			${cssLineClass} > *:before  { ${lineCssStyle} }
			`;
	}

	protected attachToolbarHandling() {
		this._domEvents = new ElementEvents(this.element);
		this._domEvents.subscribe("buttonpressed", (e: CustomEvent) => this.processToolBarClick(e));
		const keyboardService = this.container.get(KeyboardService);
		keyboardService.setActiveArea(this.splitterElement); // make Formatting toolbar accessible from the main grid
	}

	protected async processToolBarClick(e: CustomEvent) {
		const btnConfig = e.detail?.config;
		const action = btnConfig?.commandName;
		let res: boolean;
		let promise: Promise<boolean> | Promise<void> | Promise<boolean | void> | null = null;

		let processed = true;
		switch (action) {
			case "InsertRow": promise = this.insertRow(); break;
			default:
				processed = false;
				break;
		}
		if (processed) {
			e.stopPropagation();
			(<any>e).propagationStopped = true;
		}
		await promise;
	}

	protected async insertRow() {
		try {
			const res = await this.screenService.update(new ServerCommand("InsertRow"), new ScreenUpdateParams({ blockPage: false, views: [nameof("RowsOrdered")] }));
			if (res.succeeded) {
				const newRowIndex = this.rowsOrderedGrid?.getNextRowIndex() ?? 0;
				const rowElement = this.rowsOrderedGrid?.getRowElem(newRowIndex);
				this.rowsOrderedGrid?.scrollIntoView(rowElement);
				this.rowsOrderedGrid?.setActiveRowIndex(newRowIndex);
			}
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected stylesDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as RMStyle);

		this._rowStyles = items.reduce((acc, item) => {
			acc[item.StyleID?.value] = item;
			return acc;
		}, {} as Record<string, RMStyle>);
	}

	protected tabSelected(newTabId: string) {
		this._lastManualTabId = newTabId;
	}

	protected highlightSelectedRow(from: number, to: number, borderSnippets: Map<number, string>) {
		this.highlightRow(from, to, borderSnippets, false,
			"var(--arm-selected-row-border-color)", null, "var(--arm-selected-row-border-width)");
	}

	protected redrawHighlights(editedFormula: string | null = null) {
		this.clearHighlightings();
		const borderSnippets = new Map<number, string>();
		const rows = this.rowsOrderedGrid.rows;
		let selectedBlockStart: number | null = null;
		for (let rowNum = 0; rowNum < rows.length; rowNum ++) {
			if (rows[rowNum].selected || rows[rowNum].isActive) {
				selectedBlockStart ??= rowNum;
			}
			else {
				if (selectedBlockStart != null) {
					this.highlightSelectedRow(selectedBlockStart + 1, rowNum, borderSnippets); // starting from 1
				}
				selectedBlockStart = null;
			}
		}
		if (!!selectedBlockStart) {
			this.highlightSelectedRow(selectedBlockStart + 1, rows.length, borderSnippets); // starting from 1
		}

		const activeRow = this.RowsOrdered.activeRow;
		if (!activeRow) return;

		if (!!activeRow.BaseRowCode?.value) {
			const baseRow = parseInt(activeRow.BaseRowCode?.value);
			this.highlightRow(baseRow, baseRow, borderSnippets, true,
				"var(--arm-base-row-border-color)", "var(--arm-base-row-background-color)", "var(--arm-base-row-border-width)");
		}

		if (!!activeRow.LinkedRowCode?.value) {
			const linkedRow = parseInt(activeRow.LinkedRowCode?.value);
			this.highlightRow(linkedRow, linkedRow, borderSnippets, true,
				"var(--arm-linked-row-border-color)", "var(--arm-linked-row-background-color)", "var(--arm-linked-row-border-width)");
		}

		const formula = editedFormula || activeRow.Formula?.value;
		if (!formula) return;

		const chunks = this.parseFormula(formula);
		for (let chunkNum = 0;  chunkNum < chunks.length; chunkNum ++) {
			const chunk = chunks[chunkNum];
			const colorNum = chunkNum % this._colorNums;
			this.highlightRow(chunk.fromRef, chunk.toRef, borderSnippets, true,
				`var(--arm-ref-border-color-${colorNum})`, `var(--arm-ref-background-color-${colorNum})`, "var(--arm-ref-border-width)");
		}
	}

	protected rowsKeyDown(sender: QpGridCustomElement, e: KeyboardEvent) {
		if ((e.key !== "Tab" && e.key !== "Enter") || e.ctrlKey || e.shiftKey || e.altKey
			|| this.rowsOrderedGrid.getActiveColumn()?.caption !== "Description") return;
		e?.preventDefault();
		e?.stopImmediatePropagation();
		const firtstField =  [...this.tabBarElement.querySelectorAll('input')].filter(x => !!x.offsetParent)?.[0];
		firtstField?.focus();
	}

	protected async rowsActiveRowChanged(args: QpGridEventArgs) {
		this.redrawHighlights();
	}

	protected async rowsSelectedRowsChanged(args: QpGridEventArgs, isDragging: boolean) {
		this.redrawHighlights();

		const selectedRows = this.rowsOrderedGrid.rows.filter(x => x.selected).map(x => x.cells.RowCodeRO.value).join(",");
		this.Parameter.SelectedRows.updateValue(selectedRows);
		if (isDragging) return;

		setTimeout(() => {
			this.screenService.update(undefined, new ScreenUpdateParams({ blockPage: false }));
		}, 0);
	}

	protected async rowsBeforeInsertRow(args: QpGridEventArgs) {
		await this.insertRow();
		return false; // prevent default insert row action
	}

	protected rowsGetCellText(args: QpGridEventArgs) {
		if (args.activeColumn.field !== "Preview") {
			return args.activeCell?.cellText;
		}
		const preview = args.activeCell?.cellText;
		if (!preview) {
			return "&nbsp;";
		}
		if (!preview.startsWith("[")) {
			return preview;
		}
		const parsedPreview = JSON.parse(preview);
		if (!parsedPreview) {
			return preview;
		}

		const chunks: string[] = parsedPreview.map((chunk) =>
			`<span class="arm-datasource-param--name">${Object.keys(chunk)[0]}:</span> ${Object.values(chunk)[0]}`);
		return `<div>${chunks.join(", ")}</div>`;
	}

	protected parseFormula(value: string) {
		// it's ok to have O(n^2) here since the formula is not expected to be long
		const chunks: FormulaChunks[] = [];

		const rangesPattern = /\(\s*'(\d+)'\s*,\s*'(\d+)'\s*/g;
		let match;
		while ((match = rangesPattern.exec(value))) {
			const [_, from, to] = match;
			const fromPosition = match.index + /'/.exec(match[0])?.index;
			const toPosition = match.index + match[0].length;
			chunks.push({ fromPos: fromPosition, toPos: toPosition, fromRef: parseInt(from), toRef: parseInt(to) });
		}

		const refPattern = /'(\d+)'|@(\d+)|[A-Z]+(\d+)/g;
		while ((match = refPattern.exec(value))) {
			const ref = parseInt(match[1]) || parseInt(match[2]) || parseInt(match[3]);
			const fromPosition = match.index;
			const toPosition = match.index + match[0].length;
			if (chunks.find(c => c.fromPos <= fromPosition && fromPosition < c.toPos)) {
				continue;
			}
			chunks.push({ fromPos: fromPosition, toPos: toPosition, fromRef: ref, toRef: ref });
		}
		chunks.sort((a, b) => a.fromPos - b.fromPos);
		return chunks;
	}

	protected getColorizeConfig() {
		return { colorize: (value) => this.colorizeHandler(value) };
	}

	protected colorizeHandler(value: string) {
		let result = "";
		const chunks = this.parseFormula(value);

		for (let chunkNum = 0;  chunkNum < chunks.length; chunkNum ++) {
			const colorNum = chunkNum % this._colorNums;
			const chunkPos = chunks[chunkNum].fromPos;
			const prevChunkEnd = chunkNum === 0 ? 0 : chunks[chunkNum - 1].toPos;
			result += value.substring(prevChunkEnd, chunkPos);
			result += `<span style="color:var(--arm-ref-border-color-${colorNum});">`;
			result += value.substring(chunkPos, chunks[chunkNum].toPos);
			result += `</span>`;
		}
		if (chunks.length > 0) {
			result += value.substring(chunks[chunks.length - 1].toPos);
		}
		else {
			result = value;
		}

		this.redrawHighlights(value);
		return result;
	}
}

interface FormulaChunks {
	fromPos: number;
	toPos: number;
	fromRef: number;
	toRef: number;
}

export class RMRowSet extends PXView {
	RowSetCode: PXFieldState;
	Description: PXFieldState;
	Type: PXFieldState;
}


export class ParamFilter extends PXView {
	NewRowSetCode: PXFieldState;
	Description: PXFieldState;
	SelectedRows: PXFieldState;
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: true,
	adjustPageSize: false,
	syncPosition: true,
	initNewRow: false,
	allowDragRows: true,
	allowSort: false,
	allowFilter: true,
	// autoAdjustColumns: true,
	preserveSelection: true,
	pasteCommand: "RowsPasteLine",
	pageSize: 1000, // 200 is too low
	pagerMode: GridPagerMode.NextPrevFirstLast,
	autoRepaint: [nameof("CurrentRow"), nameof("CurrentRowDataSource"), nameof("CurrentRowStyle")],
	actionsConfig: {
		refresh: { hidden: true },
		insert: { hidden: true },
	},
	columnsConfig: [
		{ field: "Files", visible: false },
	],
	topBarItems: {
		InsertRow: { index: -100, config: {
			commandName: "InsertRow",
			images: { normal: "svg:main@plus" },
			toolTip: Labels.InsertRow,
			isSystem: false, toggleMode: false, showInToolbar: true, pushed: false,
			hidden: false,
		} },
		CopyRows: { index: 0, config: {
			commandName: "CopyRows",
			toolTip: Labels.CopyRows,
			images: { normal: "main@Copy" },
			disabled: true,
		} },
		CutRows: { index: 1, config: {
			commandName: "CutRows",
			toolTip: Labels.CutRows,
			images: { normal: "main@Cut" },
			disabled: true,
		} },
		PasteRows: { index: 2, config: {
			commandName: "PasteRows",
			toolTip: Labels.PasteRows,
			images: { normal: "main@Paste" },
			disabled: true,
		} },
	}
})
export class RMRowMini extends PXView {
	InsertRow: PXActionState;
	CopyRows: PXActionState;
	CutRows: PXActionState;
	PasteRows: PXActionState;
	CopyStyle: PXActionState;
	PasteStyle: PXActionState;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False }) @readOnly
	SortOrder: PXFieldState<PXFieldOptions.Hidden>;

	@readOnly RowCodeRO: PXFieldState;
	@columnConfig({ editorConfig: { immediateApplyValue: true } })
	RowType: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({ type: GridColumnType.Html }) @readOnly Preview: PXFieldState;
	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	InCycle: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	StyleID: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	LinkedRowCode: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	BaseRowCode: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Formula: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Height: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	Indent: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	LineStyle: PXFieldState<PXFieldOptions.Hidden>;

	@columnConfig({ visible: false, allowShowHide: GridColumnShowHideMode.False })
	PrintControl: PXFieldState<PXFieldOptions.Hidden>;

	@computedFrom("RowType.value", "LineStyle.value")
	get hasLineStyle() {
		return this.RowType.value === ARmRowType.Underline && !!this.LineStyle
			&& this.LineStyle.value !== BorderType.None && this.LineStyle.value !== BorderType.NotSet;
	}
}

export enum ARmRowType {
	// same order as in PX.Reports.ARm.ARmRowType
	GL, Caption, Underline, Total, Header, Sort
};

export class RMRow extends PXView {
	@readOnly SortOrder: PXFieldState;
	@readOnly RowCode: PXFieldState;
	RowType: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: {
			viewNameForParameters: "RowsOrdered",
			fieldNameForParameters: "RowCode",
			parameters: RMParameters,
		},
	})
	Formula: PXFieldState<PXFieldOptions.CommitChanges>;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	SuppressEmpty: PXFieldState<PXFieldOptions.CommitChanges>;
	HideZero: PXFieldState<PXFieldOptions.CommitChanges>;
	Height: PXFieldState<PXFieldOptions.CommitChanges>;
	Indent: PXFieldState<PXFieldOptions.CommitChanges>;
	LineStyle: PXFieldState<PXFieldOptions.CommitChanges>;
	LinkedRowCode: PXFieldState<PXFieldOptions.CommitChanges>;
	BaseRowCode: PXFieldState<PXFieldOptions.CommitChanges>;
	ColumnGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintControl: PXFieldState<PXFieldOptions.CommitChanges>;
	PageBreak: PXFieldState<PXFieldOptions.CommitChanges>;
	StyleID: PXFieldState<PXFieldOptions.CommitChanges>;
	DataSourceID: PXFieldState<PXFieldOptions.CommitChanges>;
	RMType: PXFieldState<PXFieldOptions.CommitChanges>; // ???

	DataVisible: PXFieldState;
	DataSourceVisible: PXFieldState;

	@computedFrom("RowType", "RowType.value")
	get isLine() {
		return this.RowType?.value === ARmRowType.Underline;
	}

	@computedFrom("RowType", "RowType.value")
	get isSort() {
		return this.RowType?.value === ARmRowType.Sort;
	}
}

export class RMNewRowSetPanel extends PXView {
	RowSetCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
}
