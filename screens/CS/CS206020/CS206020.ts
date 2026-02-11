import { ElementEvents } from "aurelia-framework";

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
	QpGridCustomElement,
	readOnly,
	PXFieldOptions,
	QpGridEventArgs,
	GridColumnGeneration,
	ScreenUpdateParams,
	handleEvent,
	CustomEventType,
	PXViewCollection,
	IGridColumn,
	GridColumnType,
	RowCssHandlerArgs,
	columnConfig,
	TextAlign,
	CallbackCompletedHandlerArgs,
	PXActionState,
	IToolBarControlConfig,
	IToolBarMenuOptions,
	ToolbarClientSideActionType,
	IGridRow,
	MenuItemRenderType,
	gridConfig,
	IToolBarItem,
	KeyboardService,
} from "client-controls";

import { RMDataSource, RMStyle } from "../common/arm/arm-reports-views";
import { ArmScreen, BorderType, RMParameters } from "../common/arm/arm-base";

@localizable
export class Labels {
	static InsertHeader = "Insert Header Row";
	static InsertColumn = "Insert Column";
	static DeleteHeader = "Delete Header Row";
	static DeleteColumn = "Delete Column";
	static Copy = "Copy";
	static Paste = "Paste";
	static Reset = "Reset";
	static CopyFormatting = "Copy";
	static PasteFormatting = "Paste";
	static ResetFormatting = "Reset Cell Formatting";
	static CopyCellFormatting = "Copy Formatting (Ctrl+Shift+C)";
	static PasteColumnFormatting = "Paste Column Formatting";
	static PasteCellFormatting = "Paste Cell Formatting (Ctrl+Shift+V)";
	static ShiftLeft = "Shift Left";
	static ShiftRight = "Shift Right";
}

@graphInfo({ graphType: "PX.CS.RMColumnSetMaint", primaryView: "ColumnSetOrdered" })
export class CS206020 extends ArmScreen {
	CopyFormatting: PXActionState;
	PasteFormatting: PXActionState;
	ResetFormatting: PXActionState;
	InsertHeader: PXActionState;
	InsertColumn: PXActionState;
	DeleteColumn: PXActionState;
	DeleteHeader: PXActionState;
	First: PXActionState;
	Next: PXActionState;
	Previous: PXActionState;
	Last: PXActionState;

	ToLeftHeader: PXActionState;
	ToRightHeader: PXActionState;
	ToLeftColumn: PXActionState;
	ToRightColumn: PXActionState;
	ToUpHeader: PXActionState;
	ToDownHeader: PXActionState;
	ToBufferHeader: PXActionState;
	ToStyleHeader: PXActionState;
	ToBufferColumn: PXActionState;
	ToStyleColumn: PXActionState;
	MoveColumn: PXActionState;
	MoveHeader: PXActionState;

	ColumnSetOrdered = createSingle(RMColumnSet);

	@viewInfo({syncAlways: true})
	Parameter = createSingle(ParamFilter);

	AllColumns = createCollection(RMColumn);
	NewColumnSetPanel = createSingle(RMNewColumnSetPanel);


	// NewRowSetPanel = createSingle(RMNewRowSetPanel);

	formattingToolbarConfig : IToolBarControlConfig =  {
		id: "formattingToolbarId",
		items: {
			CopyFormatting: {
				// type: "menu-options",
				index: 0,
				config: {
					commandName: "CopyFormatting",
					toolTip: Labels.CopyCellFormatting,
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
				type: "menu-options",
				config: {
					commandName: "PasteFormatting",
					toolTip: Labels.PasteCellFormatting,
					images: { normal: "main@Paste" },
					text: Labels.Paste,
					disabled: true,
					options: {
						PasteCellFormatting: {
							text: Labels.PasteCellFormatting,
							commandName: "PasteFormatting",
							shortcutChar: "V",
							shortcutCtrl: true,
							shortcutShift: true,
							disabled: true,
						},
						PasteColumnFormatting: {
							text: Labels.PasteColumnFormatting,
							commandName: "PasteColumnFormatting",
							disabled: true,
						}
					}
				}
			},
			ResetFormatting: {
				index: 2,
				config: {
					commandName: "ResetFormatting",
					toolTip: Labels.ResetFormatting,
					images: { normal: "main@RecordDel" },
					text: Labels.Reset,
					disabled: false,
					renderAs: MenuItemRenderType.IconAndText,
				}
			},
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

	@viewInfo({ containerName: "Headers" })
	HeadersWithRowSet = createCollection(RMColumnHeader);

	@gridConfig({
		preset: GridPreset.Details,
		syncPosition: false, // we do it via activeCellChanged
		pageSize: 0,
		pagerMode: GridPagerMode.NextPrevFirstLast,
	})
	AllHeaderStyles = createCollection(RMStyle);

	@gridConfig({
		preset: GridPreset.Details,
		syncPosition: false, // we do it via activeCellChanged
		pageSize: 0,
		pagerMode: GridPagerMode.NextPrevFirstLast,
	})
	AllColumnStyles = createCollection(RMStyle);

	@viewInfo({syncAlways: true})
	CurrentHeader = createSingle(RMColumnHeader);

	@viewInfo({syncAlways: true})
	CurrentColumn = createSingle(RMColumn);

	@viewInfo({syncAlways: true})
	CurrentHeaderStyle = createSingle(RMStyle);

	@viewInfo({syncAlways: true})
	CurrentColumnStyle = createSingle(RMStyle);

	@viewInfo({syncAlways: true}) // this is somehow not enough, platform still sends "retrieveMode: 1" for CurrentRowDataSource
	CurrentDataSource = createSingle(RMDataSource);

	headersGrid: QpGridCustomElement;
	columnsGrid: QpGridCustomElement;
	splitterElement: HTMLElement;
	// @bindable tabBar!: QpTabbarCustomElement;
	private _domEvents: ElementEvents;
	private _headerStyles: Record<string, RMStyle>;
	private _columnStyles: Record<string, RMStyle>;
	private readonly _colorNums = 5; // eslint-disable-line @typescript-eslint/no-magic-numbers
	private readonly _columnCodePrefix = "  ";
	private readonly _columnCodeAValue = `${this._columnCodePrefix}A`;

	private _lastManualTabId: string | null = null;
	private _lastActiveRowId: string | null = null;
	private _lastActiveColumnId: string | null = null;
	private _lastActiveCellIndex: number | null = null;

	async attached() {
		await super.attached();
		this.attachToolbarHandling();

		const dc = this.screenService.getDataComponent("ScreenToolbar");
		if (dc?.appendComponentData) {
			dc.appendComponentData(this.topBarConfig);
		}

		if (!this.ColumnSetOrdered.ColumnSetCode?.value?.id) {
			await this.screenService.update(new ServerCommand("insert"), new ScreenUpdateParams({ blockPage: false }));
		}
	}

	@handleEvent(CustomEventType.CallbackCompleted)
	async onActionCompleted(args: CallbackCompletedHandlerArgs<any>) {
		const pasteFormattingMenu = this.formattingToolbarConfig.items.PasteFormatting.config as IToolBarMenuOptions;
		pasteFormattingMenu.disabled = !(this.PasteFormatting?.enabled ?? false);
		pasteFormattingMenu.options.PasteCellFormatting.disabled = !(this.PasteFormatting?.enabled ?? false);
		pasteFormattingMenu.options.PasteColumnFormatting.disabled = !(this.PasteFormatting?.enabled ?? false);
		this.formattingToolbarConfig.changed = true;

		const deleteBtnConfig = this.headersGrid?.config.topBarItems?.Delete.config as IToolBarMenuOptions;
		if (deleteBtnConfig) {
			deleteBtnConfig.options.DeleteHeader.disabled = !(this.DeleteHeader?.enabled ?? false);
			this.headersGrid?.setTopBarButtonsState();
		}
	}

	@handleEvent(CustomEventType.GetRowCss, { view: "HeadersWithRowSet" })
	getReturnedRowCss(args: RowCssHandlerArgs<PXViewCollection<RMColumnHeader>>) {
		const row = args?.selector?.row as RMColumnHeader;
		this.updateStylesheet(row);
		const rowSetCss = row.SectionType?.value === "Row Set" ? "arm-row-set-row" : "";
		return `arm-header-${args?.selector?.row.HeaderNbr.value}- arm-row-highlighting-${args?.selector?.row.HeaderNbr.value}- ${rowSetCss}`;
	}

	updateStylesheet(row: RMColumnHeader) {
		const cssClass = `arm-header-${row.HeaderNbr.value}-`;
		const styles = document.styleSheets;
		const stylesheet = Array.from(styles).find((s) => s.ownerNode?.textContent?.includes(cssClass));
		const newContent = `.${cssClass} { ${this.prepareStlysheet(row) }`;
		this.replaceCssStyle(stylesheet, newContent);
	}

	protected prepareStlysheet(row: RMColumnHeader) {
		const columns = Object.keys(row).filter((key) =>
			this.headersGrid?.getColumn(key)?.generated && !key.endsWith("StyleID"));

		let cssRow = "";
		for (const column of columns) {
			const styleId = row[`${column}_StyleID`]?.value;
			const cellValue = row[`${column}`]?.value;
			const cssItemClass = `arm-header-item-${styleId}-`;
			const itemStyle = row.isRealHeader ? this._headerStyles[styleId] : this._columnStyles[styleId];
			if (!itemStyle) continue;

			cssRow += `
				.${cssItemClass}, .${cssItemClass} * {
					${this.getFontCssStyle(itemStyle)}
					${this.getTextAlignCssStyle(itemStyle)}
				}
			`;
			if (!!itemStyle.BackColorRGBA?.value) {
				if (!cellValue) {
					const lineCssStyle = this.getBorderCssStyle(BorderType.Solid, itemStyle.BackColorRGBA.value, row.Height?.value, false);
					cssRow += `.${cssItemClass}:after  { ${lineCssStyle} }`;
				}
				else {
					cssRow += `
						td:has(.${cssItemClass}) {
							--qp-highlight-color: ${itemStyle.BackColorRGBA.value};
							background-color: ${itemStyle.BackColorRGBA.value} !important;
						}
					`;
				}
			}
		}
		return cssRow;
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
			case "ShiftLeft": promise = this.shiftLeft(); break;
			case "ShiftRight": promise = this.shiftRight(); break;
			case "InsertHeader": promise = this.insertHeader(); break;
			case "InsertColumn": promise = this.insertColumn(); break;
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

	protected async shiftLeft() {
		try {
			const res = await this.screenService.update(new ServerCommand("ShiftLeft"), new ScreenUpdateParams({ blockPage: false }));
			if (res.succeeded) {
				const index = this.headersGrid?.getPrevCellIndex();
				if (index !== undefined) {
					this.headersGrid?.setActiveCellIndex(index);
				}
			}
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected async shiftRight() {
		try {
			const res = await this.screenService.update(new ServerCommand("ShiftRight"), new ScreenUpdateParams({ blockPage: false }));
			if (res.succeeded) {
				const index = this.headersGrid?.getNextCellIndex();
				if (index !== undefined) {
					this.headersGrid?.setActiveCellIndex(index);
				}
			}
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected async insertHeader() {
		try {
			const res = await this.screenService.update(new ServerCommand("InsertHeader"), new ScreenUpdateParams({ blockPage: false }));
			if (res.succeeded) {
				this.headersGrid?.setActiveRowIndex(this.headersGrid?.endRowIndex - 2);
			}
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected async insertColumn() {
		try {
			const oldColumnCodes = new Set(this.AllColumns.records.map(x => x.ColumnCode.value as string));
			const res = await this.screenService.update(new ServerCommand("InsertColumn"), new ScreenUpdateParams({ blockPage: false }));
			if (res.succeeded) {
				const newColumnCodes = this.AllColumns.records.map(x => x.ColumnCode.value as string);
				newColumnCodes.forEach(code => {
					if (!oldColumnCodes.has(code)) {
						const newCellIndex = this.headersGrid?.getColumnCellIndex(`${this._columnCodePrefix}${code}`);
						this.headersGrid?.setActiveCellIndex(newCellIndex - 1, true); // TODO: it shouldn't be -1, but there seems to be a bug in setActiveCellIndex
					}
				});
			}
			return res.succeeded;
		}
		catch (error) {
			return false;
		}
	}

	protected headerStylesDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as RMStyle);

		this._headerStyles = items.reduce((acc, item) => {
			acc[item.StyleID?.value] = item;
			return acc;
		}, {} as Record<string, RMStyle>);
	}

	protected columnStylesDataReadyHandler(grid: QpGridCustomElement, args: QpGridEventArgs) {
		if (!grid.view) return;

		const items = [...Array(grid.rows.length).keys()].filter(i => grid.rows[i]).map(i => grid.view.getRowModel(i) as RMStyle);

		this._columnStyles = items.reduce((acc, item) => {
			acc[item.StyleID?.value] = item;
			return acc;
		}, {} as Record<string, RMStyle>);
	}

	protected tabSelected(newTabId: string) {
		this._lastManualTabId = newTabId;
	}

	protected headersGetCellText(args: QpGridEventArgs) {
		const isHeader = args.activeRow?.cells.SectionType.value === "Header";
		if (args.activeColumn?.field === "SectionType") {
			return isHeader ? "svg:main@header" : "svg:main@rowSet";
		}
		return isHeader ? this.getHeaderPreview(args) : this.getColumnPreview(args);
	}

	protected getHeaderPreview(args: QpGridEventArgs) {
		const cellText = args.activeCell?.cellText ?? "";
		const styleId = args.activeRow.cells[`${args.activeColumn.field}_StyleID`]?.value;
		return !styleId ? cellText : `<span class="arm-header-item-${styleId}-">${cellText}</span>`;
	}

	protected getColumnPreview(args: QpGridEventArgs) {
		const column = args.activeColumn?.field;
		if (!column) return "";
		const preview = args.activeRow?.cells[column]?.value;
		if (!preview || !preview.startsWith("[")) return preview;
		const parsedPreview = JSON.parse(preview);
		if (!parsedPreview) return preview;

		const chunks = parsedPreview.map((chunk) => {
			const paramName = Object.keys(chunk)[0];
			const paramValue = Object.values(chunk)[0];
			return `
				<div class="arm-datasource-param">
					${paramName ? `<div class="arm-datasource-param--name">${paramName}: </div>` : ""}
					<div>${paramValue}</div>
				</div>`;
		});
		const cellText =  chunks.join("");

		const styleId = args.activeRow.cells[`${args.activeColumn.field}_StyleID`]?.value;
		return !styleId ? cellText : `<div class="arm-row-set-row--item arm-header-item-${styleId}-">${cellText}</div>`;
	}

	protected headersAddAttributesOnFilterColumns(column: IGridColumn) {
		const width = this.columnsGrid?.rows.find(x => x.cells.ColumnCode.value === column.field?.trim())?.cells.Width.value ?? 0;
		if (!!width) {
			column.width = width;
			column.type = GridColumnType.Html;
			column.allowResize = false;
		}
		return true;
	}

	protected headersResizeColumn(column: IGridColumn) {
		const columnGridRow = this.columnsGrid?.rows.find(x => x.cells.ColumnCode.value === column.field?.trim());
		const columnGridColumn = this.columnsGrid?.getColumn("Width");
		if (!columnGridRow || !columnGridColumn) return;

		this.columnsGrid?.updateCellValue(columnGridRow, columnGridColumn, column.width, true);
		return;
	}

	protected headersRowDragOver(row: IGridRow, afterLast: boolean ) {
		return !afterLast;
	}

	protected async headersActiveRowChanged(args: QpGridEventArgs) {
		// if (!!this._lastActiveRowId) return; // already initialized
		// this._lastActiveRowId = "1";
		// this.Parameter.setValue("ColumnCode", this._columnCodeAValue);
		// this.Parameter.setValue("HeaderNbr",  "1");
	}

	protected async headersActiveCellChanged(args: QpGridEventArgs) {
		if (args.activeColumn?.field === "SectionType") {
			const cellIndex = args.grid.getNextCellIndex();
			args.grid.setActiveCellIndex(this._lastActiveCellIndex ?? cellIndex ?? 2);
			return;
		}
		const activeRow = args.activeRow?.cells.HeaderNbr.value;
		const activeColumn = args.activeColumn?.field ?? this._columnCodeAValue;
		if (!activeRow) return;
		if (activeRow === this._lastActiveRowId && activeColumn === this._lastActiveColumnId) return;
		this._lastActiveRowId = activeRow;
		this._lastActiveColumnId = activeColumn;
		this._lastActiveCellIndex = args.grid.getColumnVisibleIndex(args.activeColumn?.field);
		if (this._lastActiveCellIndex < 0) {
			this._lastActiveCellIndex = undefined;
		}

		await this.screenService.executeCommand(new ServerCommand("CurrentHeaderChanged", [activeRow, activeColumn, args.grid.rows.indexOf(args.grid.getActiveRow()) + 1]),
			new ScreenUpdateParams({ blockPage: false, views: [nameof("CurrentHeader"), nameof("CurrentDataSource"), nameof("CurrentHeaderStyle"),
				nameof("CurrentColumnStyle"), nameof("CurrentColumn")
			]})
		);
	}
}

export class RMColumnSet extends PXView {
	ColumnSetCode: PXFieldState;
	Description: PXFieldState;
	Type: PXFieldState;
}

export class ParamFilter extends PXView {
	NewColumnSetCode: PXFieldState;
	Description: PXFieldState;
	HeaderCell: PXFieldState<PXFieldOptions.Hidden>;
	HeaderRow: PXFieldState<PXFieldOptions.Hidden>;
	HeaderNbr: PXFieldState<PXFieldOptions.Hidden>;
	ColumnCell: PXFieldState<PXFieldOptions.Hidden>; // duplicates HeaderCell, legacy
}

@gridConfig({
	preset: GridPreset.Details,
	allowInsert: false,
	allowUpdate: false,
	adjustPageSize: false,
	syncPosition: false, // we do it via activeCellChanged
	initNewRow: false,
	allowDragRows: true,
	allowSort: false,
	allowRowSelect: false,
	allowFilter: false,
	allowDragHeaders: false,
	pasteCommand: "PasteHeader",
	generateColumns: GridColumnGeneration.AppendDynamic,
	generateColumnsAfterSelect: true,
	actionsConfig: {
		refresh: { hidden: true },
		insert: { hidden: true },
		adjust: { hidden: true },
		delete: { hidden: true },
	},
	columnsConfig: [
		{ field: "Files", visible: false },
	],
	// autoRepaint: [nameof("CurrentHeader"), nameof("CurrentDataSource"), nameof("CurrentHeaderStyle"), nameof("CurrentColumnStyle")],
	fastFilterByAllFields: false,
	autoSaveLayout: false,
	topBarItems: {
		// Need to redefine these actions here since we need them in a menu AND we don't need the menu in Classic UI
		// Also, the new actions are marked as invisible so that they don't appear in the Classic UI
		Insert: {
			index: 1,
			type: "menu-options" as ToolbarClientSideActionType,
			config: {
				images: { normal: "main@AddNew" },
				disabled: false,
				options: {
					InsertHeader: {
						text: Labels.InsertHeader,
						commandName: "InsertHeader",
					},
					InsertColumn: {
						text: Labels.InsertColumn,
						commandName: "InsertColumn",
					}
				}
			}
		},
		Delete: {
			index: 1,
			type: "menu-options" as ToolbarClientSideActionType,
			config: {
				images: { normal: "main@RecordDel" },
				disabled: false,
				options: {
					DeleteHeader: {
						text: Labels.DeleteHeader,
						commandName: "DeleteHeader",
						disabled: false,
					},
					DeleteColumn: {
						text: Labels.DeleteColumn,
						commandName: "DeleteColumn",
						disabled: false,
					}
				}
			}
		},
		ShiftLeft:
		{
			index: 2,
			config: {
				commandName: "ShiftLeft",
				toolTip: Labels.ShiftLeft,
				images: { normal: "main@ArrowLeft" },
			}
		},
		ShiftRight:
		{
			index: 3,
			config: {
				commandName: "ShiftRight",
				toolTip: Labels.ShiftRight,
				images: { normal: "main@ArrowRight" },
			}
		},
	}
})
export class RMColumnHeader extends PXView {
	@columnConfig({ type: GridColumnType.Icon, textAlign: TextAlign.Center, width: 35, caption: "" })
	@columnConfig({ visible: false }) SectionType: PXFieldState;
	@columnConfig({ visible: false }) HeaderNbr: PXFieldState<PXFieldOptions.Hidden>;

	@readOnly ColumnCode: PXFieldState;
	@columnConfig({ visible: false }) Formula: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ visible: false }) StartColumn: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ visible: false }) EndColumn: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ visible: false }) Height: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ visible: false }) GroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ visible: false }) IsRowSet: PXFieldState;
	@columnConfig({ visible: false }) StyleID: PXFieldState<PXFieldOptions.Hidden>;

	get isRealHeader() {
		return !this.IsRowSet?.value && !!this.ColumnCode?.value;
	}
}


export class RMColumn extends PXView {
	@readOnly ColumnCode: PXFieldState;
	ColumnType: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;

	@columnConfig({
		editorType: "qp-formula-editor",
		editorConfig: {
			parameters: RMParameters,
		},
	})
	Formula: PXFieldState<PXFieldOptions.CommitChanges>;
	CellEvalOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	CellFormatOrder: PXFieldState<PXFieldOptions.CommitChanges>;
	Rounding: PXFieldState<PXFieldOptions.CommitChanges>;
	Format: PXFieldState<PXFieldOptions.CommitChanges>;
	Width: PXFieldState<PXFieldOptions.CommitChanges>;
	AutoHeight: PXFieldState;
	ExtraSpace: PXFieldState;
	SuppressEmpty: PXFieldState<PXFieldOptions.CommitChanges>;
	HideZero: PXFieldState<PXFieldOptions.CommitChanges>;
	SuppressLine: PXFieldState<PXFieldOptions.CommitChanges>;
	GroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	UnitGroupID: PXFieldState<PXFieldOptions.CommitChanges>;
	PrintControl: PXFieldState<PXFieldOptions.CommitChanges>;
	VisibleFormula: PXFieldState<PXFieldOptions.CommitChanges>;
	PageBreak: PXFieldState;
}

export class RMNewColumnSetPanel extends PXView {
	ColumnSetCode: PXFieldState<PXFieldOptions.CommitChanges>;
	Type: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
}

export const nameof = (name: Extract<keyof CS206020, string>): string => name;
