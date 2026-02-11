import { APInvoice } from "./views";
import { PageInfo, PdfRecognitionViewer } from "./documentRecognition/pdfViewer/pdf-viewer";
import { FullTextTerm, Ocr, RecognizedData, RecognizedDocument, RecognizedField, RecognizedFieldMapInfo, RecognizedGridCellMap,
	RecognizedGridColumnMap, RecognizedGridMapKey, RecognizedGridMapWithValue, RecognizedMapKeyBase, RecognizedMapWithState, RecognizedPage, WordPageInfo } from "./documentRecognition/recognition/types";
import {
	BaseApiClient, GridCell, GridRowStatus, IGridRow, IToolBarMenuButton, IToolBarMenuOptions, NetType, PXFieldState,
	PXScreen, PXView, PXViewCollection, QpFieldCustomElement, QpGridCustomElement, RedirectHelper, ScreenUpdateParams, IScreenService,
	QpGridEventArgs, getColumnDefaultValue,
	SessionURL
} from "client-controls";
import { FeedbackCollector, getFieldNameFromFullName, RecognizedColumn, RecognizedTable, RecognizedValue, RecognizedValueMapper, RecognizedValueScroller } from "./documentRecognition/recognition";
import { HintMode, LinesHintCustomElement } from "./documentRecognition/linesHint/lines-hint";
import { CommandExecutionType, IClientCommandController } from "./documentRecognition/menu/command-controller";
import { columnsExcludedFromColumnMapping, poNumberFieldName, poNumberJsonFieldName, subcontractNumberFieldName, subcontractNumberJsonFieldName, vendorControlFieldName, vendorFieldName } from "./const";

export enum GridModeClass {
	BoxMode = "mode-box",
	PreRowMode = "mode-prerow",
	RowMode = "mode-row",
	ColumnMode = "mode-column",
}

export interface MappingInfo {
	pageIndex: number;
	tableIndex: number;
	rowIndices: number[];
	columnInfoMap: Map<number, RecognizedGridColumnMap>;
}

export class RecognitionController {
	readonly modes: GridModeClass[] = [
		GridModeClass.BoxMode,
		GridModeClass.ColumnMode,
		GridModeClass.PreRowMode,
		GridModeClass.RowMode,
	];
	public isPdfRendered = false;
	public isDataProcessed = false;
	public prevFileId = null;
	public isUploadMode: boolean = true;

	// selected tracking
	public selectedTable?: RecognizedTable;
	public selectedControl?: RecognizedMapWithState;
	public isUserInput: boolean = true;

	// recognition
	public readonly recognizedValueMapper: RecognizedValueMapper;
	public readonly fieldInputMaps: Map<string, HTMLInputElement> = new Map();
	public readonly columnsCommitChanges: Map<string, boolean> = new Map();
	public readonly scroller: RecognizedValueScroller = new RecognizedValueScroller();
	public readonly gridVM: QpGridCustomElement;
	public readonly gridViewFields: string[];
	public readonly pdfViewerContainer: Element;
	public readonly pdfViewerElement: Element;
	public readonly pdfViewer: PdfRecognitionViewer;
	public readonly feedbackCollector: FeedbackCollector;
	public readonly linesHint: LinesHintCustomElement;
	private recognizedPages: RecognizedPage[];
	private recognizedDocument: RecognizedDocument;
	private vendorTermData?: FullTextTerm;

	constructor(
		private readonly screen: PXScreen,
		private readonly masterView: PXView,
		private readonly gridView: PXViewCollection<PXView>,
		private readonly commandController: IClientCommandController,
		private readonly redirectHelper: RedirectHelper,
		webApiClient: BaseApiClient,
	) {
		const transactionsGrid = document.getElementById("gridTransactions");
		this.pdfViewerContainer = document.getElementById("pdfRecognitionViewerContainer");
		this.pdfViewerElement = this.pdfViewerContainer.querySelector("#pdfViewer");
		// TODO: find better way to get grid ViewModel
		this.gridVM = (transactionsGrid as any).au["qp-grid"]?.viewModel as QpGridCustomElement;
		this.gridViewFields = this.gridVM.getQueryParams().columns
			.filter(c => c.field)
			.map((c) => c.field);

		this.pdfViewer = new PdfRecognitionViewer(this.pdfViewerElement);
		this.feedbackCollector = new FeedbackCollector(
			this.masterView.name,
			this.gridView.name,
			this.screen.actions.get("DumpTableFeedback"),
			this.screen.screenID,
			vendorControlFieldName,
			webApiClient
		);
		this.linesHint = (document.querySelector("lines-hint#linesHint") as any).au["lines-hint"].viewModel;
		this.recognizedValueMapper = new RecognizedValueMapper();
	}

	public trackResize(): void {
		window.addEventListener("resize", () => this.resizeAll());
	}

	public bindCommandsHandlers() {
		this.commandController.bindClientCommandHandler(CommandExecutionType.ClientOnlyCommand, "AddNewMapping", () => this.addColumnMappingClick());
		this.commandController.bindClientCommandHandler(CommandExecutionType.ClientOnlyCommand, "UpdateMapping", () => this.updateColumnMappings());
		this.commandController.bindClientCommandHandler(CommandExecutionType.ClientOnlyCommand, "ExitTableMapping", () => this.handleExitTableDefining(false));
		this.commandController.bindClientCommandHandler(CommandExecutionType.PostServerCommand, "DeleteAllTransactions", () => this.clearDetailsMapping());
		this.commandController.bindClientCommandHandler(CommandExecutionType.PostServerCommand, "processRecognition", () => this.setEnabledFileAttach());
		this.commandController.bindClientCommandHandler(CommandExecutionType.LongOperationCommand, "searchVendor", () => this.showFoundVendorTerm());
		this.commandController.bindClientCommandHandler(CommandExecutionType.PostServerCommand, "ElapsedTime", () => this.setEnabledFileAttach());
		this.commandController.bindClientCommandHandler(CommandExecutionType.PostServerCommand, "RefreshStatus", () => this.setEnabledFileAttach());
		this.commandController.bindGridRowDeletedHandler("Transactions", (deleteResult) => this.handleAfterRowDelete(deleteResult.affected, deleteResult.index));
	}

	public refreshUploadedDocument(screenService: IScreenService, _recognizedRecordRefNbr: string) {
		if (screenService.isNewEntry) {
			screenService.update();
		}
	}

	public async handleDocumentSelected(document: APInvoice) {
		const needFileUpload = document.FileID.value == null || document.RecognitionStatus.value === "E";
		const screenService = this.screen.getScreenService();
		if (!needFileUpload && this.prevFileId !== document.FileID.value && screenService.isNewEntry) {
			this.refreshUploadedDocument(screenService, document.RecognizedRecordRefNbr.value);
		}
		const isRecognized = document.RecognitionStatus.value === "R";
		this.enableDragNDropContainer(needFileUpload);
		this.changeTopMenuButonsState(null, false, isRecognized);
		if (document.FileID?.value && document.RecognitionStatus?.value !== "E") {
			if (this.prevFileId !== document.FileID.value) {
				this.prevFileId = document.FileID.value;
				if (this.isPdfRendered) {
					this.recognizedValueMapper.clear();
					this.reset();
				}

				this.linesHint.onButtonClickCallback = () => {
					this.switchToColumnMode(this.selectedTable);
					this.linesHint.switchMode(HintMode.HiddenMode);
				};
				this.linesHint.onSelectAllLinesCallback = () => this.recognizedValueMapper.allowSelectMoreRows(false);
				this.linesHint.onSelectAllLinesPrevCallback = () => this.recognizedValueMapper.allowSelectMoreRows(true);
				this.switchToBoxMode(false, false, false);
				const fileUrl = new SessionURL(`/ui/file/${document.FileID.value}`, window.location).href;
				await this.renderPdf(this.pdfViewer, fileUrl);
			}
			const recognizedData = this.getRecognizedData(document);
			if (recognizedData) {
				this.extractRecognizedData(recognizedData);
				if (recognizedData.pages && recognizedData.pages.length && recognizedData.pages.length > 0) {
					this.recognizedPages = recognizedData.pages;
					this.feedbackCollector.fillPageKeyValuePairByWord(recognizedData.pages);
				}
				this.renderBoundingBoxes(this.pdfViewer);
				const vendorTermIndex = document.VendorTermIndex?.value;
				if (vendorTermIndex != null && document.VendorID.value?.id != null) {
					this.initVendorTermData(vendorTermIndex, this.pdfViewer.pageInfo);
				}
				this.scroller.createCellScrollingIndex(
					this.recognizedPages,
					this.recognizedValueMapper.recognizedValues
				);
			}
			const isEnabledAddMappingcommand = isRecognized && recognizedData != null;
			const isEnabledUpdateMappingCommand = this.recognizedValueMapper.hasCellMappings();
			this.changeTopMenuButonsState(null, isEnabledUpdateMappingCommand, isEnabledAddMappingcommand);
		}
		else {
			this.setEnabledFileAttach();
		}
	}

	showFoundVendorTerm() {
		const vendorFormFieldName = getFieldNameFromFullName(vendorFieldName);
		const vendorcontrol = this.fieldInputMaps.get(vendorFormFieldName);
		if (vendorcontrol) {
			vendorcontrol.parentElement.parentElement.focus.call(vendorcontrol.parentElement.parentElement);
			vendorcontrol.focus.call(vendorcontrol);
		}
	}

	getVendorTerm(vendorTermIndex: number): FullTextTerm {
		if (vendorTermIndex == null) {
			return null;
		}
		const vendorField = this.recognizedDocument.fields[vendorFieldName];
		if (vendorField && vendorField.fullTextTerms && vendorTermIndex < vendorField.fullTextTerms.length) {
			return vendorField.fullTextTerms[vendorTermIndex];
		}
		return null;
	}

	extractRecognizedData(recognizedData: NonNullable<RecognizedData>) {
		if (recognizedData.documents && recognizedData.documents.length && recognizedData.documents.length > 0) {
			this.recognizedDocument = recognizedData.documents[0];
		}
	}

	createRecognizedValues(pageInfo: PageInfo[]): void {
		this.createPrimaryMappedRecognizedValues(pageInfo);
		this.createDetailMappedRecognizedValues(pageInfo);
		this.createNotMappedRecognizedValues(pageInfo);
		this.createTables(pageInfo);
	}

	createPrimaryMappedRecognizedValues(pagesInfo: PageInfo[]) {
		if (!this.recognizedDocument || !this.recognizedDocument.fields) {
			return;
		}

		for (const fieldName in this.recognizedDocument.fields) {
			const field = this.recognizedDocument.fields[fieldName];

			if (field === null || fieldName === vendorFieldName) {
				continue;
			}

			const mapKey: RecognizedMapKeyBase = { columnName: getFieldNameFromFullName(fieldName) };
			this.createFieldRecognizedValue(field, mapKey, pagesInfo);
		}
	}

	createDetailMappedRecognizedValues(pagesInfo: PageInfo[]) {
		if (
			!this.recognizedDocument ||
			!this.recognizedDocument.details ||
			!this.recognizedDocument.details.Transactions ||
			!this.recognizedDocument.details.Transactions.value ||
			!this.recognizedDocument.details.Transactions.value.length
		) {
			return;
		}

		const details = this.recognizedDocument.details.Transactions.value;
		let rowIndex = 0;

		for (const d of details) {
			if (!d.fields) {
				continue;
			}

			let isFieldCreated = false;
			for (const fieldName in d.fields) {
				const field = d.fields[fieldName];
				const mapKey: RecognizedGridMapKey = { columnName: getFieldNameFromFullName(fieldName), rowIndex: rowIndex };
				this.createFieldRecognizedValue(field, mapKey, pagesInfo);
				isFieldCreated = true;
			}

			if (isFieldCreated) {
				rowIndex++;
			}
		}
	}

	createTables(pagesInfo: PageInfo[]) {
		if (!this.recognizedPages) {
			return;
		}

		for (let pageIndex = 0; pageIndex < this.recognizedPages.length; pageIndex++) {
			const page = this.recognizedPages[pageIndex];
			const container = pagesInfo[pageIndex].container;
			const svg = pagesInfo[pageIndex].svg;

			if (page.tables === null || !page.tables.length) {
				continue;
			}

			for (let i = 0; i < page.tables.length; i++) {
				const table = page.tables[i];
				const recognizedTable = new RecognizedTable(pagesInfo[pageIndex], page, pageIndex, i, table);

				recognizedTable.appendToParent(container, svg);
				this.recognizedValueMapper.recognizedTables.push(recognizedTable);
				this.trackRecognizedTable(recognizedTable);
			}
		}
	}

	public createFieldRecognizedValue(
		field: RecognizedField,
		mapKey: RecognizedMapKeyBase,
		pagesInfo: PageInfo[],
		searchTerm: FullTextTerm = null
	) {
		const fieldInfo: RecognizedFieldMapInfo = {
			recognizedField: field,
			mappingKey: mapKey,
			searchTerm: searchTerm,
		};
		const recognizedValue = new RecognizedValue(fieldInfo, this.recognizedPages, pagesInfo, null);

		this.addRecognizedValue(recognizedValue);
	}

	public addRecognizedValue(recognizedValue: RecognizedValue) {
		if (this.recognizedValueMapper.enrichValue(recognizedValue)
			&& recognizedValue.rectangles.length > 0
			&& recognizedValue.fieldInfo?.mappingKey?.columnName !== vendorControlFieldName) {
			return;
		}

		recognizedValue.appendToPages();
		this.recognizedValueMapper.trackRecognizedValue(recognizedValue);
		recognizedValue.subscribeOnMousedown((v, event) => this.mapRecognizedValue(v, event));
	}

	public mapTableCellToGridCell(
		keyValue: RecognizedGridMapWithValue,
		value: string | number | Date,
		recognizedValue: RecognizedValue,
		appendValue: boolean,
		column: RecognizedColumn
	) {
		const row = this.gridVM.rows[keyValue.rowIndex];
		const gridColumn = this.gridVM.getColumn(keyValue.columnName);
		let newValue = value;
		if (appendValue && gridColumn.dataType === NetType.String) {
			newValue = `${keyValue.fieldState.value} ${newValue}`;
		}
		gridColumn.commitChanges = false;
		keyValue.fieldState.commitChanges = false;
		this.gridVM.updateCellValue(row, gridColumn, value, false);
		const prevRecognizedValues: RecognizedValue[] = this.recognizedValueMapper.getGridMappingByKey(keyValue)?.recognizedValues;
		const mapping = this.recognizedValueMapper.correctGridMapping(keyValue, recognizedValue, appendValue, true, column);
		this.collectGridFeedback(keyValue, mapping.recognizedValues, prevRecognizedValues);
	}

	mapRecognizedValue(recognizedValue: RecognizedValue, event: MouseEvent) {
		event.preventDefault();

		const appendValue = event.ctrlKey || event.metaKey;
		const mapKey: RecognizedMapKeyBase = this.selectedControl;
		const controlVM: PXFieldState = this.recognizedValueMapper.isGridMap(mapKey)
			? this.getGridCellViewModel(mapKey.columnName, mapKey.rowIndex)
			: this.masterView.getField(mapKey.columnName);

		const keyValue = { ...mapKey, fieldState: controlVM };
		const validationResult = this.recognizedValueMapper.mapRecognizedValueToControl(keyValue, recognizedValue, appendValue);

		if (validationResult?.isValid) {
			if (this.recognizedValueMapper.isGridMap(keyValue)) {
				this.mapRecognizedValueToCell(keyValue, recognizedValue, validationResult.newValue, appendValue);
			}
			else {
				this.mapRecognizedValueToForm(keyValue, recognizedValue, validationResult.newValue, appendValue);
			}
		}
	}

	public mapRecognizedValueToForm(
		keyValue: RecognizedMapWithState,
		recognizedValue: RecognizedValue,
		value: string | number | Date,
		appendValue: boolean
	): void {
		this.isUserInput = false;
		try {
			keyValue.fieldState.updateValue(value);
			this.recognizedValueMapper.correctFormMapping(keyValue, recognizedValue, appendValue);
		}
		catch (e) {
			// TODO: Rollback
		}
		finally {
			this.isUserInput = true;
		}
	}

	public mapRecognizedValueToCell(
		keyValue: RecognizedGridMapWithValue,
		recognizedValue: RecognizedValue,
		value: string | number | Date,
		appendValue: boolean
	): void {
		if (this.isAnyMode(GridModeClass.PreRowMode)) {
			this.switchToBoxMode(false, false, false);
		}

		this.isUserInput = false;
		try {
			this.gridVM.exitEditMode();
			try {
				const column = this.gridVM.getActiveColumn();
				const row = this.gridVM.getActiveRow();
				this.gridVM.updateCellValue(row, column, value, true);
				this.gridVM.updateRow(row, true);
				this.recognizedValueMapper.correctGridMapping(keyValue, recognizedValue, appendValue, true, null);
			}
			catch (e) {
				// TODO: Rollback
			}
		}
		finally {
			this.isUserInput = true;
		}
	}

	clearDetailsMapping() {
		this.clearControlSelection(this.selectedControl);//
		this.recognizedValueMapper.clearGridMapping();
		this.changeTopMenuButonsState(false, false, false, false, false);
	}

	resizeAll(): void {
		this.pdfViewer.resize();
		this.resizeMappings();
	}

	resizeMappings(): void {
		const newSvgScale = this.pdfViewer.scale / this.pdfViewer.initialScale;
		this.recognizedValueMapper.recognizedValues.forEach((rv) => rv.rescale(newSvgScale));
		this.recognizedValueMapper.recognizedTables.forEach((rt) => {
			const fixedWidth = this.pdfViewer.pageInfo[rt.pageIndex].canvas.width;
			const fixedHeight = this.pdfViewer.pageInfo[rt.pageIndex].canvas.height;
			rt.rescale(fixedWidth, fixedHeight, newSvgScale);
		});
	}

	onZoomOut() {
		this.pdfViewer.onZoomOut();
		this.resizeMappings();
	}

	onZoomIn() {
		this.pdfViewer.onZoomIn();
		this.resizeMappings();
	}

	setEnabledFileAttach() {
		//TBA
	}

	public changeTopMenuButonsState(
		exitTableEnabled?: boolean,
		updateMappingEnabled?: boolean,
		addNewMappingEnabled?: boolean,
		linkLineEnabled?: boolean,
		deleteActionsEnabled?: boolean
	): void {
		if (exitTableEnabled != null) {
			this.gridVM.config.actionsConfig.ExitTableMapping.hidden = !exitTableEnabled;
			this.gridVM.config.actionsConfig.ExitTableMapping.disabled = !exitTableEnabled;
		}
		if (linkLineEnabled != null) {
			this.screen.actions.get("LinkLine").enabled = deleteActionsEnabled;
		}
		if (deleteActionsEnabled != null) {
			this.screen.actions.get("DeleteAllTransactions").enabled = deleteActionsEnabled;
		}
		if ((this.gridVM.config.topBarItems.MappingOptions.config as IToolBarMenuOptions)?.options) {
			const options: { [key: string]: IToolBarMenuButton } = (
				this.gridVM.config.topBarItems.MappingOptions.config as IToolBarMenuOptions
			).options;
			if (updateMappingEnabled != null && options.UpdateMapping) {
				options.UpdateMapping.disabled = !updateMappingEnabled;
			}
			if (addNewMappingEnabled != null && options.AddNewMapping) {
				options.AddNewMapping.disabled = !addNewMappingEnabled;
			}
		}
		this.gridVM.setTopBarButtonsState();
	}

	public addColumnMappingClick(): void {
		if (this.isAnyMode(GridModeClass.BoxMode)) {
			this.setFormEnabled(false);
			this.setGridEnabled(false);
			this.switchToPreRowMode();
		}
		else if (this.isAnyMode(GridModeClass.ColumnMode)) {
			this.switchToPreRowMode();
		}
	}

	getRecognizedData(document: APInvoice): RecognizedData {
		if (document.RecognizedDataJson.value) {
			const recognizedDataEncodedJson = document.RecognizedDataJson.value.replace(/\+/g, "%20");
			const recognizedDataJson = decodeURIComponent(recognizedDataEncodedJson);
			if (!recognizedDataJson) {
				return null;
			}
			const recognizedData: RecognizedData = JSON.parse(recognizedDataJson);
			return recognizedData;
		}
		return null;
	}

	renderBoundingBoxes(viewer: PdfRecognitionViewer): void {
		if (this.isDataProcessed) {
			return;
		}
		this.processRecognizedData(viewer.pageInfo);
		this.isDataProcessed = true;
	}

	public initVendorTermData(vendorTermIndex: number, pagesInfo: PageInfo[]) {
		this.vendorTermData = this.getVendorTerm(vendorTermIndex);
		const mapKey: RecognizedMapKeyBase = { columnName: getFieldNameFromFullName(vendorFieldName) };
		this.createFieldRecognizedValue(this.recognizedDocument.fields[vendorFieldName], mapKey, pagesInfo, this.vendorTermData);
	}

	processRecognizedData(pageInfo: PageInfo[]) {
		this.createRecognizedValues(pageInfo);
	}

	async renderPdf(viewer: PdfRecognitionViewer, fileUrl: string): Promise<void> {
		if (!fileUrl) {
			return;
		}
		const minMarginLeft = Math.min(...this.recognizedValueMapper.recognizedTables.map(rt => rt.getCheckboxMinX()));
		await viewer.renderPdf(fileUrl, minMarginLeft);
		this.resizeMappings();
		this.isPdfRendered = true;
	}

	reset(): void {
		this.handleExitTableDefining(true);
		if (this.recognizedValueMapper) {
			this.recognizedValueMapper.removeEventListeners();
		}

		this.isPdfRendered = false;
		this.isDataProcessed = false;
	}

	enableDragNDropContainer(enable: boolean): void {
		this.isUploadMode = enable;
		this.setFormEnabled(!enable);
		this.setGridEnabled(!enable);
	}

	public isAnyMode(...modes: GridModeClass[]): boolean {
		return modes.some((mode) => this.pdfViewerElement.classList.contains(mode));
	}

	public switchToMode(mode: GridModeClass): void {
		const modesToRemove = this.modes.filter((m) => m !== mode);
		modesToRemove.forEach((m) => this.pdfViewerElement.classList.remove(m));
		this.pdfViewerElement.classList.add(mode);
	}

	public setFormEnabled(isEnabled: boolean): void {
		for (const control of this.fieldInputMaps.values()) {
			control.disabled = !isEnabled;
		}
	}

	public setGridEnabled(isEnabled: boolean): void {

		if (this.gridVM.rows) {
			this.gridVM.rows.forEach((gridRow, index) => {
				for (const fieldName in gridRow.cells) {
					if (index === 0) {
						const column = this.gridVM.getColumn(fieldName);
						column.hideViewLink = true;
					}
					const cell = gridRow.cells[fieldName];
					cell.readOnly = !isEnabled;
				}
			});
		}
		this.gridVM.config.allowInsert = isEnabled;
		this.setGridActionsEnabled(isEnabled);
	}

	public switchToBoxMode(skipGridEnable: boolean, reset: boolean, enableGridAfterAddColumn: boolean): void {
		const toggleControlsVisibility = this.isAnyMode(GridModeClass.RowMode, GridModeClass.ColumnMode);

		this.switchToMode(GridModeClass.BoxMode);

		if ((!reset && toggleControlsVisibility) || enableGridAfterAddColumn) {
			this.setFormEnabled(true);

			if (!skipGridEnable) {
				this.setGridEnabled(true);
			}
		}

		this.linesHint.switchMode(HintMode.HiddenMode);
		const hasMappings = this.recognizedValueMapper?.hasCellMappings();
		this.changeTopMenuButonsState(false, hasMappings, !!this.recognizedDocument, true, true);
		this.recognizedValueMapper.cleanTables();
	}

	public switchToPreRowMode(): void {
		this.switchToMode(GridModeClass.PreRowMode);
		this.setFormEnabled(false);
		this.setGridEnabled(true);
		this.changeTopMenuButonsState(false, false, false, false, false);
		this.linesHint.switchMode(HintMode.HiddenMode);
		this.recognizedValueMapper.cleanTables();
	}

	public switchToRowMode(): void {
		this.switchToMode(GridModeClass.RowMode);
		this.setFormEnabled(false);
		this.setGridEnabled(false);
		this.changeTopMenuButonsState(true, false, false, false, false);
		const selectLinesCount = this.gridVM.rows.length - (this.gridVM.rows.indexOf(this.gridVM.getActiveRow()) ?? 0);
		this.linesHint.switchMode(this.gridVM.isNewRowActive ? HintMode.AddRowsMode : HintMode.EditRowsMode, selectLinesCount);
		this.recognizedValueMapper.recognizedTables.forEach((table) => {
			if (table !== this.selectedTable) {
				table.hideRowsInRowMode();
				table.hideColumnsInColumnMode();
			}
		});
	}

	public switchToColumnMode(table: RecognizedTable): void {
		this.gridVM.exitEditMode();
		this.setGridEnabled(false);
		this.changeTopMenuButonsState(true, false, false, false, false);
		this.switchToMode(GridModeClass.ColumnMode);
		this.isUserInput = false;
		if (this.columnsCommitChanges.size === 0) {
			this.gridViewFields.forEach(fieldName => {
				const gridColumn = this.gridVM.getColumn(fieldName);
				this.columnsCommitChanges.set(fieldName, gridColumn.commitChanges);
				this.gridVM.rows.forEach((row, rowIndex) => {
					const rowModel = this.gridView.getRowModel(rowIndex);
					if (rowModel) {
						rowModel.getField(fieldName).commitChanges = false;
					}
					row.cells[fieldName].commitChanges = false;
				});
			});
		}
		table.showSelectedColumnCells();
	}

	updateColumnMappings(): void {
		this.gridVM.setActiveRowIndex(0);
		const mappingInfo = this.getMappingInfoFromCells();
		const selectedTable = this.recognizedValueMapper.initUpdateColumnMapping(mappingInfo);
		this.setFormEnabled(false);
		this.setGridEnabled(false);
		this.selectedTable = selectedTable;
		this.recognizedValueMapper.activateRowsAndColumns(selectedTable);
		this.switchToColumnMode(selectedTable);
	}

	public trackformControls(): void {
		const documentFormElement = document.getElementById("formDocument");
		const formInputControls = documentFormElement.querySelectorAll<HTMLInputElement>(".recognize-value-bound input");
		formInputControls.forEach((input) => {
			const keyValue = this.getFieldFromControl(input);
			this.trackFormControl(input, keyValue);
			this.fieldInputMaps.set(keyValue.columnName, input);
		});
	}

	public trackGridControls(): void {
		this.gridVM.onActiveCellChanged = ({ args }) => this.handleCellChange(args);

		const baseprocessor = this.gridVM.processCellClick.bind(this.gridVM);
		this.gridVM.processCellClick = (e: MouseEvent, cellIndex: number, row: IGridRow): void => {
			const col = this.gridVM.getActiveColumn();
			const cellChangedArgs = new QpGridEventArgs(this.gridVM, col, row, row.cells[col.field]);
			baseprocessor(e, cellIndex, row);
			if (this.selectedControl == null || !this.recognizedValueMapper.isGridMap(this.selectedControl)) {
				this.handleAfterCellChange(cellChangedArgs);
			}
		};
	}

	public handleCellChange(cellChangedArgs: QpGridEventArgs): void {
		const isColumnMode = this.isAnyMode(GridModeClass.ColumnMode);
		const activeCellKey = this.getActiveCellMap(cellChangedArgs);
		const columnChanged = this.selectedControl?.columnName !== activeCellKey.columnName;
		const rowChanged = this.recognizedValueMapper.isGridMap(this.selectedControl) && this.selectedControl?.rowIndex !== activeCellKey.rowIndex;
		if (this.selectedControl == null || columnChanged || !isColumnMode && rowChanged || this.gridVM.isNewRowActive) {
			this.handleAfterCellChange(cellChangedArgs);
		}
	}

	handleExitTableDefining(reset: boolean): void {
		let skipGridEnable = false;

		if (this.isAnyMode(GridModeClass.ColumnMode)) {
			this.gridViewFields.forEach(fieldName => {
				const commitchangesSetting = this.columnsCommitChanges.get(fieldName);
				const gridColumn = this.gridVM.getColumn(fieldName);
				gridColumn.commitChanges = commitchangesSetting;
				this.gridVM.rows.forEach((row, rowIndex) => {
					const rowModel = this.gridView.getRowModel(rowIndex);
					rowModel.getField(fieldName).commitChanges = commitchangesSetting;
					row.cells[fieldName].commitChanges = commitchangesSetting;
				});
			});
			if (!reset) {
				skipGridEnable = true;
				this.gridVM.config.batchUpdate = true;
				const visibleColumns = this.gridViewFields.map(fieldName => this.gridVM.getColumn(fieldName)).filter(column => column.visible);
				this.gridVM.rows.forEach((row) => {
					if (row.changed) {
						for (const column of visibleColumns) {
							this.gridVM.getCell(column, row).changed = true;
						}
						this.gridVM.updateRow(row);
					}
				});
				this.gridVM.config.batchUpdate = false;
			}
			this.columnsCommitChanges.clear();
			const screenService = this.screen.getScreenService();
			screenService.cancelViewFieldChanges("Transactions");
			screenService.update(undefined, new ScreenUpdateParams({ views: ["Transactions"] }));
		}
		const enableGridAfterAddColumn = !skipGridEnable;
		this.isUserInput = true;
		if (this.selectedControl != null
			&& this.recognizedValueMapper.isGridMap(this.selectedControl)
			&& this.gridVM.rows[this.selectedControl.rowIndex]?.status === GridRowStatus.New) {
			this.switchToPreRowMode();
		}
		else {
			this.switchToBoxMode(false, reset, enableGridAfterAddColumn);
		}
	}

	public trackRecognizedTable(recognizedTable: RecognizedTable) {
		recognizedTable.selectedRowsChangedCallback = (table: RecognizedTable) => this.handleTableSelectedRowsChanged(table);
		recognizedTable.columnSelectedCallback = (column: RecognizedColumn, event: MouseEvent) => this.handleColumnSelected(recognizedTable, column, event);
		recognizedTable.columnUnselectedCallback = (column: RecognizedColumn) => this.handleColumnUnselected(column);
		recognizedTable.maxRowsToSelect = () => this.linesHint.linesToSelect();
	}

	public handleAfterCellChange(cellChangedArgs: QpGridEventArgs) {
		this.recognizedValueMapper.clearGridErrorsMapping(m => this.gridMappingHasError(m));

		const activeCellKey = this.getActiveCellMap(cellChangedArgs);
		const colValue = this.getColValue(cellChangedArgs.activeColumn.field);
		const activeCell = cellChangedArgs.activeRow.cells[colValue];
		const activeCellKeyValue = { ...activeCellKey, fieldState: activeCell };

		if (this.isAnyMode(GridModeClass.ColumnMode)) {
			const skipColumn =
				activeCellKeyValue &&
				activeCellKeyValue.columnName &&
				columnsExcludedFromColumnMapping.indexOf(activeCellKeyValue.columnName) !== -1;
			if (skipColumn) {
				return;
			}
		}

		// after
		if (!this.isUserInput) {
			return;
		}

		if (this.isAnyMode(GridModeClass.BoxMode) && this.gridVM.isNewRowActive) {
			this.switchToPreRowMode();
		}
		else if (this.isAnyMode(GridModeClass.PreRowMode) && !this.gridVM.isNewRowActive) {
			this.switchToBoxMode(false, false, false);
		}

		this.clearControlSelection(this.selectedControl);
		this.selectedControl = activeCellKeyValue;

		if (activeCellKeyValue) {
			const recognizedValues = this.recognizedValueMapper.getGridMappingValuesByCell(activeCellKeyValue);
			this.navigateToMappedRect(recognizedValues);
		}
		this.changeTopMenuButonsState();
		this.setGridActionsStateInColumnMode();
	}

	handleTableSelectedRowsChanged(table: RecognizedTable): void {
		const isTableSelected = table.selectedRows > 0;

		if (isTableSelected) {
			if (!this.isAnyMode(GridModeClass.RowMode)) {
				this.selectedTable = table;
				this.switchToRowMode();
			}
		}
		this.linesHint.setLinesCount(table.selectedRows);
	}

	public handleFormControlFocus(keyValue: RecognizedMapWithState): void {
		this.clearControlSelection(this.selectedControl);
		if (keyValue) {
			this.selectedControl = keyValue;
			const recognizedValues = this.recognizedValueMapper.getFormMappingValuesByControl(keyValue);
			this.navigateToMappedRect(recognizedValues);
		}
	}

	public handleFormControlValueChanged(keyValue: RecognizedMapWithState): void {
		if (!this.isUserInput) {
			return;
		}
		const recognizedValues = this.recognizedValueMapper.getFormMappingValuesByControl(keyValue);
		if (!recognizedValues) {
			return;
		}
		const mapping = this.recognizedValueMapper.correctFormMapping(keyValue, null, false);
		if (mapping.recognizedValues != null) {
			const isUserInputPrev = this.isUserInput;
			try {
				this.isUserInput = false;
				this.feedbackCollector.collectFormFeedback(keyValue.columnName, mapping.recognizedValues);
			}
			finally {
				this.isUserInput = isUserInputPrev;
			}
		}
	}

	public handleFormControlBlur(keyValue: RecognizedMapWithState): void {
		this.selectedControl = null;
		const recognizedValues = this.recognizedValueMapper.getFormMappingValuesByControl(keyValue);
		recognizedValues?.forEach((rv) => rv.markAsNotMapped());
	}

	public handleAfterRowDelete(isSuccess: boolean, rowIndex: number): void {
		if (isSuccess && this.recognizedValueMapper.isGridMap(this.selectedControl) && this.selectedControl.rowIndex === rowIndex) {
			this.clearControlSelection(this.selectedControl);
			this.recognizedValueMapper.adjustGridMappingsBeforeRowDelete(rowIndex);
			this.feedbackCollector.dumpGridFeedback();
		}
	}

	setGridActionsStateInColumnMode() {
		if (!this.isAnyMode(GridModeClass.ColumnMode)) {
			return;
		}

		this.setGridActionsEnabled(false);
		this.changeTopMenuButonsState(true, false, false);
	}

	handleColumnSelected(table: RecognizedTable, column: RecognizedColumn, event: MouseEvent) {
		const activeCellName = this.gridVM.getActiveColumn().field;
		const appendColumn = event.ctrlKey || event.metaKey;
		if (!appendColumn) {
			table.columns
				.filter((c) => c.gridFieldName === activeCellName)
				.forEach((c) => c.onUndoMousedown(false));
		}
		const selectedCellInfos = table.getSelectedCellInfos(column);
		const gridRowIndicesToUpdate: number[] = [];
		const oldValues: RecognizedValue[] = [];
		const selectedRowIndex = this.recognizedValueMapper.isGridMap(this.selectedControl)
			? this.selectedControl.rowIndex
			: this.gridVM.rows.indexOf(this.gridVM.getActiveRow());
		if (selectedRowIndex == null) {
			throw new Error("Cell is not selected");
		}
		for (let i = 0; i < selectedCellInfos.length; i++) {
			const mappingKey: RecognizedGridMapKey = {
				rowIndex: selectedRowIndex + i,
				columnName: activeCellName,
			};

			oldValues.push(...this.recognizedValueMapper.getGridMappingByKey(mappingKey)?.recognizedValues ?? []);

			const recognizedValues = this.recognizedValueMapper.recognizedValues.filter(rv =>
				rv.cellInfo.pageIndex === table.pageIndex &&
				rv.cellInfo.tableIndex === table.tableIndex &&
				rv.cellInfo.cellIndex === selectedCellInfos[i].index);

			this.gridVM.exitEditMode();
			gridRowIndicesToUpdate.push(mappingKey.rowIndex);

			if (this.gridVM.rows.length <= mappingKey.rowIndex) {
				this.gridVM.addNewRow(false);
			}
			const row = this.gridVM.rows[mappingKey.rowIndex];
			const cell = row.cells[mappingKey.columnName];
			const keyValue = { ...mappingKey, fieldState: cell };
			cell.readOnly = false;

			for (let i = 0; i < recognizedValues.length; i++) {
				const rvToMap = recognizedValues[i];
				const appendValue = i > 0 || appendColumn;
				const validationResult = this.recognizedValueMapper.mapRecognizedValueToControl(keyValue, rvToMap, appendValue);
				if (validationResult?.isValid) {
					this.mapTableCellToGridCell(keyValue, validationResult.newValue, rvToMap, appendValue, column);
				}
			}
		}

		if (oldValues.length && oldValues[0].cellInfo.columnIndex != null) {
			oldValues.forEach(rv => rv.markAsNotMapped());
			table.columns[oldValues[0].cellInfo.columnIndex].onUndoMousedown(true);
		}

		gridRowIndicesToUpdate.forEach((i) => {
			const row = this.gridVM.rows[i];
			if (row) {
				const status = row.status;
				if (status === GridRowStatus.NotSet) {
					row.status = GridRowStatus.Modified;
				}
			}
		});
		this.setGridActionsStateInColumnMode();
		this.gridVM.exitEditMode();

		return true;
	}

	handleColumnUnselected(column: RecognizedColumn) {
		const mappingByFieldRow = column.getMappingByFieldRow();

		this.gridVM.exitEditMode();
		for (const key of mappingByFieldRow.keys()) {
			const item = mappingByFieldRow.get(key);
			const column = this.gridVM.getColumn(item.columnName);
			const cell = this.getGridCellViewModel(item.columnName, item.rowIndex);
			if (cell.readOnly) {
				cell.readOnly = false;
			}
			this.gridVM.setCellValue(cell, column, getColumnDefaultValue(column));
			cell.changed = true;
			item.recognizedValues.forEach((rv) => rv.markAsNotMapped());
			item.recognizedValues = [];
			this.setGridActionsStateInColumnMode();
		}
	}

	collectGridFeedback(
		key: RecognizedGridMapKey,
		recognizedValues: RecognizedValue[],
		prevRecognizedValues: RecognizedValue[]
	): Promise<void> {
		let pageIndex: number = null;
		let tableIndex: number = null;
		let rowIndex: number = null;
		let columnIndexArray: number[] = [];

		if (recognizedValues.length === 0) {
			if (prevRecognizedValues == null || prevRecognizedValues.length === 0) {
				return;
			}

			const prevValue = prevRecognizedValues[0];
			if (
				prevValue == null ||
				prevValue.cellInfo == null ||
				prevValue.cellInfo.pageIndex == null ||
				prevValue.cellInfo.tableIndex == null ||
				prevValue.cellInfo.rowIndex == null ||
				prevValue.cellInfo.columnIndex == null
			) {
				return;
			}

			pageIndex = prevValue.cellInfo.pageIndex;
			tableIndex = prevValue.cellInfo.tableIndex;
			rowIndex = prevValue.cellInfo.rowIndex;
			columnIndexArray.push(-1);
		}
		else {
			const cellInfo = this.recognizedValueMapper.getCellInfo(recognizedValues);
			if (cellInfo == null) {
				return;
			}

			pageIndex = cellInfo.pageIndex;
			tableIndex = cellInfo.tableIndex;
			rowIndex = cellInfo.rowIndex;
			columnIndexArray = cellInfo.columnIndexArray;
		}

		const isUserInputPrev = this.isUserInput;

		try {
			this.isUserInput = false;
			this.feedbackCollector.collectGridFeedback(
				key.columnName,
				key.rowIndex,
				pageIndex,
				tableIndex,
				columnIndexArray,
				rowIndex
			);
		}
		finally {
			this.isUserInput = isUserInputPrev;
		}
	}

	gridMappingHasError(mapping: RecognizedGridCellMap): boolean {
		if (!mapping || !mapping.columnName) {
			return false;
		}

		const gridCell = this.getGridCellViewModel(mapping.columnName, mapping.rowIndex);
		if (gridCell == null) {
			return false;
		}
		return gridCell.error != null;
	}

	private navigateToMappedRect(recognizedValues: RecognizedValue[]): void {
		if (recognizedValues?.length) {
			recognizedValues.forEach((rv: RecognizedValue) => rv.markAsMapped());
			const firstRv = recognizedValues[0];
			this.scroller.scrollToRecognizedValue(this.pdfViewerElement, firstRv);
		}
	}

	private setGridActionsEnabled(isEnabled: boolean): void {
		for (const key in this.gridVM.config.actionsConfig) {
			if (this.gridVM.config.actionsConfig.hasOwnProperty(key)) {
				const menuAction = this.gridVM.config.actionsConfig[key];
				menuAction.disabled = !isEnabled;
			}
		}
	}

	private createNotMappedRecognizedValues(pagesInfo: PageInfo[]): void {
		if (!this.recognizedPages) {
			return;
		}

		for (let pageIndex = 0; pageIndex < this.recognizedPages.length; pageIndex++) {
			const page = this.recognizedPages[pageIndex];

			if (page.tables && page.tables.length) {
				this.createCellNotMappedRecognizedValues(pagesInfo, page, pageIndex);
			}

			if (page.words && page.words.length) {
				this.createWordNotMappedRecognizedValues(pagesInfo, page, pageIndex);
			}
		}
	}

	private createWordNotMappedRecognizedValues(pagesInfo: PageInfo[], page: RecognizedPage, pageIndex: number) {
		for (let wordIndex = 0; wordIndex < page.words.length; wordIndex++) {
			const word = page.words[wordIndex];
			const wordInfo: WordPageInfo = {
				word: word,
				wordIndex: wordIndex,
				pageIndex: pageIndex,
			};
			const recognizedValue = new RecognizedValue(null, this.recognizedPages, pagesInfo, wordInfo);

			this.addRecognizedValue(recognizedValue);
		}
	}

	private createCellNotMappedRecognizedValues(pagesInfo: PageInfo[], page: RecognizedPage, pageIndex: number) {
		for (let tableIndex = 0; tableIndex < page.tables.length; tableIndex++) {
			const table = page.tables[tableIndex];
			if (!table.cells || !table.cells.length) {
				continue;
			}

			for (let cellIndex = 0; cellIndex < table.cells.length; cellIndex++) {
				const cell = table.cells[cellIndex];
				if (!cell || !cell.ocr) {
					continue;
				}

				const ocrCopy: Ocr = JSON.parse(JSON.stringify(cell.ocr));
				const field: RecognizedField = {
					ocr: ocrCopy,
					value: ocrCopy.text,
					entity: undefined,
					fullTextTerms: [],
				};
				field.ocr.boundingBoxes = [
					{
						page: pageIndex,
						word: null,
						keyValuePair: null,
						table: tableIndex,
						cell: cellIndex,
						boundingBox: null,
					},
				];
				this.createFieldRecognizedValue(field, null, pagesInfo);
			}
		}
	}

	private trackFormControl(input: HTMLInputElement, fieldKey: RecognizedMapWithState): void {
		input.addEventListener("focus", () => this.handleFormControlFocus(fieldKey));
		input.addEventListener("blur", () => this.handleFormControlBlur(fieldKey));
		input.addEventListener("change", () => this.handleFormControlValueChanged(fieldKey));
	}

	// TODO: find better way
	private getFieldFromControl(control: Element): RecognizedMapWithState {
		const field = (control.closest("qp-field") as any).au["qp-field"]?.viewModel as QpFieldCustomElement;
		return { columnName: field.controlState?.name, fieldState: field.controlState };
	}

	private clearControlSelection(mapKeyValue: RecognizedMapWithState): void {
		if (mapKeyValue == null) {
			return;
		}
		const mappings = this.recognizedValueMapper.getMappedValues(mapKeyValue);
		if (mappings != null) {
			for (const mapping of mappings) {
				mapping.markAsNotMapped();
			}
		}
	}

	private getActiveCellMap(eventArgs: QpGridEventArgs): RecognizedGridMapKey {
		const rowIndex = this.gridVM.rows.indexOf(eventArgs.activeRow);
		return eventArgs.activeColumn.field && rowIndex >= 0 ? { columnName: eventArgs.activeColumn.field, rowIndex: rowIndex } : null;
	}

	private getGridCellViewModel(columnName: string, rowIndex: number): GridCell {
		const gridCol = this.gridVM.getColumn(columnName);
		if (!gridCol) {
			return null;
		}
		const gridRow = this.gridVM.rows[rowIndex];
		return this.gridVM.getCell(gridCol, gridRow);
	}

	private getMappingInfoFromCells(): MappingInfo {
		let anyMappedCell: boolean = false;
		let mappedPage: number = null;
		let mappedTable: number = null;
		const mappedRows: number[] = [];
		const mappedColumnsInfoMap: Map<number, RecognizedGridColumnMap> = new Map();

		for (let r = 0; r < this.gridVM.rows.length; r++) {
			const gridRow = this.gridVM.rows[r];
			if (!gridRow.cells) {
				continue;
			}

			let mappedRow: number = null;

			for (const key in gridRow.cells) {
				if (Object.prototype.hasOwnProperty.call(gridRow.cells, key)) {
					const col = this.gridVM.getColumn(key);
					const gridCell = this.gridVM.getCell(col, gridRow);

					if (!gridCell || gridCell.stateType == null) {
						continue;
					}

					const mapping = this.recognizedValueMapper.getGridMappingByKey({ columnName: key, rowIndex: r });

					if (!mapping?.recognizedValues?.length) {
						continue;
					}

					for (const rv of mapping.recognizedValues) {
						rv.fillCellInfo();

						if (rv.cellInfo.pageIndex === null || rv.cellInfo.tableIndex === null || rv.cellInfo.rowIndex === null) {
							return null;
						}

						if (mappedPage === null) {
							mappedPage = rv.cellInfo.pageIndex;
						}
						else if (mappedPage !== rv.cellInfo.pageIndex) {
							return null;
						}

						if (mappedTable === null) {
							mappedTable = rv.cellInfo.tableIndex;
						}
						else if (mappedTable !== rv.cellInfo.tableIndex) {
							return null;
						}

						if (mappedRow === null) {
							mappedRow = rv.cellInfo.rowIndex;
						}
						else if (mappedRow !== rv.cellInfo.rowIndex) {
							return null;
						}

						anyMappedCell = true;
					}
				}
			}

			if (mappedRow !== null) {
				mappedRows.push(mappedRow);
			}
		}

		if (!anyMappedCell) {
			return null;
		}

		for (const fieldName of this.gridViewFields) {
			const column = this.gridVM.getColumn(fieldName);
			if (!column.visible) {
				continue;
			}

			let mappedColumn: number = null;

			for (let r = 0; r < this.gridVM.rows.length; r++) {
				const gridRow = this.gridVM.rows[r];
				if (!gridRow.cells) {
					continue;
				}

				const gridCell = gridRow.cells[fieldName];
				if (!gridCell || gridCell.readOnly) {
					continue;
				}

				const mapping = this.recognizedValueMapper.getGridMappingByKey({ columnName: column.field, rowIndex: r });

				if (!mapping || !mapping.recognizedValues) {
					continue;
				}

				for (const rv of mapping.recognizedValues) {
					if (rv.cellInfo.columnIndex == null) {
						return null;
					}

					if (mappedColumn == null) {
						mappedColumn = rv.cellInfo.columnIndex;
					}
					else if (mappedColumn !== rv.cellInfo.columnIndex) {
						return null;
					}
				}

				if (mappedColumn != null) {
					let columnMappingInfo = mappedColumnsInfoMap.get(mappedColumn);
					if (!columnMappingInfo) {
						columnMappingInfo = {
							mappings: [],
						};
						mappedColumnsInfoMap.set(mappedColumn, columnMappingInfo);
					}
					columnMappingInfo.mappings.push(mapping);
				}
			}
		}

		return {
			pageIndex: mappedPage,
			tableIndex: mappedTable,
			rowIndices: mappedRows,
			columnInfoMap: mappedColumnsInfoMap,
		};
	}

	private getColValue(field: string): string {
		if (field === subcontractNumberFieldName) {
			return subcontractNumberJsonFieldName;
		}

		return field === poNumberFieldName
			? poNumberJsonFieldName
			: field;
	}
}
