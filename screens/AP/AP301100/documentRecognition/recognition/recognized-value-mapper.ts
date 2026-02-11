import { NetType, PXFieldState } from "client-controls";
import { RecognizedValue } from "./recognized-value";
import { MappingValidationResult, RecognizedControlMapBase, RecognizedFieldMap, RecognizedGridCellMap, RecognizedGridColumnMap, RecognizedGridMapKey, RecognizedGridMapWithValue, RecognizedMapKeyBase, RecognizedMapWithState } from "./types";
import { RecognizedTable } from "./recognized-table";
import { RecognizedColumn } from "./recognized-column";
import { getKeyFromValues, splitKey } from "./utils";
import { MappingInfo } from "../../recognition-controller";
import { poNumberFieldName, subcontractNumberFieldName } from "../../const";

export class RecognizedValueMapper {
	recognizedValues: RecognizedValue[] = [];
	recognizedTables: RecognizedTable[] = [];
	readonly recognizedWordValuesByPageWord: Map<string, RecognizedValue> = new Map();
	rowsToUpdate: number[] = null;
	columnsToUpdateMap: Map<number, RecognizedGridColumnMap> = null;
	private readonly formMappingByField: Map<string, RecognizedFieldMap> = new Map();
	private gridMappingByFieldRow: Map<string, RecognizedGridCellMap> = new Map();

	allowSelectMoreRows(allow: boolean) {
		this.recognizedTables.forEach((t) => t.allowSelectMoreRows(allow));
	}
	removeEventListeners() {
		this.recognizedTables.forEach((t) => t.removeEventListeners());
	}

	clear() {
		this.recognizedValues = [];
		this.recognizedTables = [];
		this.recognizedWordValuesByPageWord.clear();

		this.clearFormMapping();
		this.clearGridMapping();
	}

	public initRecognizedMappings(fields: string[]): void {
		fields.forEach((field) => {
			const mapping: RecognizedFieldMap = {
				fieldKey: { columnName: field },
				recognizedValues: [],
			};

			this.formMappingByField.set(field, mapping);
		});
	}

	public activateRowsAndColumns(table: RecognizedTable): void {
		this.recognizedTables.forEach((t) => {
			if (t !== table) {
				t.hideColumnsInColumnMode();
			}
		});

		if (this.rowsToUpdate != null) {
			table.activateRows(this.rowsToUpdate);
			this.rowsToUpdate = null;
		}

		if (this.columnsToUpdateMap != null) {
			table.activateColumns(this.columnsToUpdateMap);
			this.columnsToUpdateMap = null;
		}
	}

	initUpdateColumnMapping(mappingdInfo: MappingInfo): RecognizedTable {
		if (mappingdInfo != null) {
			const tables = this.recognizedTables.filter((t) => t.pageIndex === mappingdInfo.pageIndex
				&& t.tableIndex === mappingdInfo.tableIndex);
			this.rowsToUpdate = mappingdInfo.rowIndices;
			this.columnsToUpdateMap = mappingdInfo.columnInfoMap;
			const table = tables[0];
			for (let index = 0; index < table.columns.length; index++) {
				const column = table.columns[index];
				column.gridFieldName = mappingdInfo.columnInfoMap.get(index)?.mappings[0]?.columnName;
			}
			return table;
		}
		else {
			return null;
		}
	}

	_initGridMappingByValue(mappingKey: RecognizedGridMapKey, recognizedValue: RecognizedValue): void {
		const mapping: RecognizedGridCellMap = { ...mappingKey, recognizedValues: [recognizedValue] };
		this.setGridMappingByKey(mappingKey, mapping);
	}

	_setGridMapping(
		key: RecognizedGridMapKey,
		recognizedValue: RecognizedValue,
		appendValue: boolean,
		column: RecognizedColumn
	): RecognizedGridCellMap {
		let mapping = this.getGridMappingByKey(key);
		const pureKey = getKeyFromValues(key.columnName, key.rowIndex);
		const rvArray = recognizedValue == null ? [] : [recognizedValue];

		if (!mapping) {
			mapping = {
				columnName: key.columnName,
				rowIndex: key.rowIndex,
				recognizedValues: rvArray,
			};
		}
		else if (appendValue) {
			if (recognizedValue != null) {
				mapping.recognizedValues.push(recognizedValue);
			}
		}
		else {
			mapping.recognizedValues = rvArray;
		}

		this.setGridMappingByKey(key, mapping);
		if (column != null) {
			column.setGridMapping(pureKey, mapping);
		}
		return mapping;
	}

	public getCellInfo(recognizedValues: RecognizedValue[]) {
		const cellInfo = {
			pageIndex: null,
			tableIndex: null,
			rowIndex: null,
			columnIndexArray: [],
		};

		for (const rv of recognizedValues) {
			if (
				rv.cellInfo == null ||
				rv.cellInfo.pageIndex == null ||
				rv.cellInfo.tableIndex == null ||
				rv.cellInfo.rowIndex == null ||
				rv.cellInfo.columnIndex == null
			) {
				return null;
			}

			if (cellInfo.pageIndex == null) {
				cellInfo.pageIndex = rv.cellInfo.pageIndex;
			}
			else if (cellInfo.pageIndex !== rv.cellInfo.pageIndex) {
				return null;
			}

			if (cellInfo.tableIndex == null) {
				cellInfo.tableIndex = rv.cellInfo.tableIndex;
			}
			else if (cellInfo.tableIndex !== rv.cellInfo.pageIndex) {
				return null;
			}

			if (cellInfo.rowIndex == null) {
				cellInfo.rowIndex = rv.cellInfo.rowIndex;
			}
			else if (cellInfo.rowIndex !== rv.cellInfo.rowIndex) {
				return null;
			}

			cellInfo.columnIndexArray.push(rv.cellInfo.columnIndex);
		}

		return cellInfo;
	}

	trackRecognizedValue(recognizedValue: RecognizedValue) {
		if (recognizedValue.fieldInfo?.mappingKey != null) {
			if (this.isGridMap(recognizedValue.fieldInfo.mappingKey)) {
				this._initGridMappingByValue(recognizedValue.fieldInfo.mappingKey, recognizedValue);
			}
			else if (recognizedValue.fieldInfo.mappingKey.columnName != null) {
				this.initFormMappingByValue(recognizedValue);
			}
		}

		this.recognizedValues.push(recognizedValue);

		if (
			recognizedValue.wordInfo &&
			recognizedValue.wordInfo.word &&
			recognizedValue.wordInfo.pageIndex != null &&
			recognizedValue.wordInfo.wordIndex != null
		) {
			const pageWord = getKeyFromValues(recognizedValue.wordInfo.pageIndex, recognizedValue.wordInfo.wordIndex);
			this.recognizedWordValuesByPageWord[pageWord] = recognizedValue;
		}
	}

	mapRecognizedValueToControl(
		keyValue: RecognizedMapWithState,
		recognizedValue: RecognizedValue,
		appendValue: boolean
	): MappingValidationResult {
		const value = recognizedValue.value != null
			? recognizedValue.value
			: recognizedValue.text;
		if (value == null) {
			return null;
		}
		const mappedValues = this.getMappedValues(keyValue);
		if (mappedValues != null) {
			const alreadyMapped = mappedValues.some((rv: RecognizedValue) => rv === recognizedValue);
			if (alreadyMapped) {
				return null;
			}
		}
		const newControlValue = this.getValueToMap(keyValue.fieldState, value, appendValue);
		return this.validValueAndParams(keyValue.fieldState, newControlValue, appendValue);
	}

	public getMappedValues(keyMap: RecognizedMapWithState):RecognizedValue[] {
		return this.isGridMap(keyMap)
			? this.getGridMappingValuesByCell(keyMap)
			: this.getFormMappingValuesByControl(keyMap);
	}

	getValueToMap(
		fieldState: PXFieldState,
		newValue: string | number | Date,
		appendValue: boolean
	): string | number | Date {
		const isStringNewValue = this.isStringValue(newValue);
		if (this.isDateControl(fieldState) && isStringNewValue) {
			try {
				const dateValue = new Date(newValue);
				if (
					fieldState.minValue &&
					fieldState.maxValue &&
					(dateValue < new Date(fieldState.minValue) || dateValue > new Date(fieldState.maxValue))
				) {
					return null;
				}
				return dateValue;
			}
			catch (e) {
				return null;
			}
		}

		if (this.isNumControl(fieldState) && isStringNewValue) {
			const newNumValue = parseFloat(newValue.replace(/[^0-9.-]/g, ""));
			return isNaN(newNumValue)
				? null
				: newNumValue;
		}

		if (!appendValue || !isStringNewValue) {
			return newValue;
		}

		const controlValue = fieldState.value;
		const appendedValue = controlValue ? `${controlValue} ${newValue}` : newValue;
		return appendedValue;
	}

	public clearColumnCellsMapping() {
		// TBA
	}

	public enrichValue(recognizedValue: RecognizedValue) {
		return this.recognizedValues.some(function (value) {
			if (recognizedValue.equals(value)) {
				if (value.cellInfo.rowIndex == null && recognizedValue.cellInfo.rowIndex != null) {
					value.cellInfo.rowIndex = recognizedValue.cellInfo.rowIndex;
				}

				return true;
			}

			return false;
		});
	}

	public cleanTables(): void {
		this.recognizedTables.forEach((table) => table.reset());
		this.gridMappingByFieldRow.forEach((mapping) => this.markCellAsNotMapped(mapping.recognizedValues));
	}

	public hasCellMappings(): boolean {
		for (const element of this.gridMappingByFieldRow.values()) {
			if (element.recognizedValues.some(rv => rv.cellInfo.tableIndex != null && rv.cellInfo.rowIndex != null && rv.cellInfo.columnIndex != null)) {
				return true;
			}
		}
		return false;
	}

	public getGridMappingByKey(key: RecognizedGridMapKey): RecognizedGridCellMap {
		const gridKey = getKeyFromValues(key.columnName, key.rowIndex);
		const value = this.gridMappingByFieldRow.has(gridKey)
			? this.gridMappingByFieldRow.get(gridKey)
			: { ...key, recognizedValues: [] };
		return value;
	}

	public clearGridErrorsMapping(checkError: (RecognizedGridCellMap: RecognizedGridCellMap) => boolean) {
		const adjustedGridMappingbyFieldRow = new Map<string, RecognizedGridCellMap>();

		for (const fieldRow of this.gridMappingByFieldRow.keys()) {
			const mapping = this.gridMappingByFieldRow.get(fieldRow);

			if (checkError(mapping)) {
				if (mapping.recognizedValues) {
					mapping.recognizedValues.forEach(function (rv: RecognizedValue) {
						rv.markAsNotMapped();
					});
				}

				continue;
			}

			adjustedGridMappingbyFieldRow.set(fieldRow, mapping);
		}

		this.gridMappingByFieldRow = adjustedGridMappingbyFieldRow;
	}

	public correctFormMapping(
		keyValue: RecognizedMapWithState,
		recognizedValue: RecognizedValue,
		appendValue: boolean
	): RecognizedControlMapBase {
		const prevMappings = this.getFormMappingValuesByControl(keyValue);
		const mapping = this.setFormMapping(keyValue, recognizedValue, appendValue);
		this.correctMapping(prevMappings, mapping, appendValue, true);
		return mapping;
	}

	public correctGridMapping(
		keyValue: RecognizedGridMapWithValue,
		recognizedValue: RecognizedValue,
		appendValue: boolean,
		markValueAsMapped: boolean,
		column: RecognizedColumn
	): RecognizedControlMapBase {
		const prevMappings = this.getGridMappingValuesByCell(keyValue);
		const mapping = this._setGridMapping(keyValue, recognizedValue, appendValue, column);
		this.correctMapping(prevMappings, mapping, appendValue, markValueAsMapped);
		return mapping;
	}

	public getFormMappingValuesByControl(keyValue: RecognizedMapWithState): RecognizedValue[] {
		const mapping = this.formMappingByField.get(keyValue.columnName);
		return mapping?.recognizedValues;
	}

	public getGridMappingValuesByCell(keyValue: RecognizedGridMapWithValue): RecognizedValue[] {
		return keyValue.columnName === poNumberFieldName || keyValue.columnName === subcontractNumberFieldName
			? this.getRecognizedWordValuesByCell(keyValue.fieldState.value)
			: this.getGridMappingByKey(keyValue).recognizedValues;
	}

	public markCellAsNotMapped(recognizedValues: RecognizedValue[]): void {
		recognizedValues?.forEach((rv: RecognizedValue) => rv.markAsNotMapped());
	}

	public adjustGridMappingsBeforeRowDelete(rowIndex: number): void {
		const adjustedGridMappingbyFieldRow = new Map<string, RecognizedGridCellMap>();

		for (const fieldRowKey of this.gridMappingByFieldRow.keys()) {
			const mapping = this.gridMappingByFieldRow.get(fieldRowKey);
			const fieldRowInfo = this.getFieldRowInfoFromKey(fieldRowKey);

			if (fieldRowInfo.rowIndex !== rowIndex) {
				const indexDelta = +(fieldRowInfo.rowIndex > rowIndex);
				const newIndex = fieldRowInfo.rowIndex - indexDelta;
				const newKey = getKeyFromValues(fieldRowInfo.columnName, newIndex);
				const newMapping: RecognizedGridCellMap = { ...mapping, rowIndex: newIndex };
				adjustedGridMappingbyFieldRow.set(newKey, newMapping);
			}
			else {
				mapping.recognizedValues.forEach((rv) => rv.markAsNotMapped());
			}
		}

		this.gridMappingByFieldRow = adjustedGridMappingbyFieldRow;
	}

	public clearGridMapping(): void {
		for (const fieldRow of this.gridMappingByFieldRow.keys()) {
			const mapping = this.gridMappingByFieldRow.get(fieldRow);
			mapping.recognizedValues = [];
		}
	}

	public isGridMap(keyMap: RecognizedMapKeyBase): keyMap is RecognizedGridCellMap {
		return (keyMap as RecognizedGridMapWithValue)?.rowIndex != null;
	}

	private clearFormMapping(): void {
		for (const value of this.formMappingByField.values()) {
			value.recognizedValues = [];
		}
	}

	private setFormMapping(keyMap: RecognizedMapKeyBase, recognizedValue: RecognizedValue, appendValue: boolean): RecognizedControlMapBase {
		let mapping: RecognizedFieldMap = this.formMappingByField.get(keyMap.columnName);
		const rvArray = recognizedValue == null ? [] : [recognizedValue];

		if (!mapping) {
			mapping = {
				fieldKey: keyMap,
				recognizedValues: rvArray,
			};
		}
		else if (appendValue) {
			mapping.recognizedValues.push(recognizedValue);
		}
		else {
			mapping.recognizedValues = rvArray;
		}

		this.formMappingByField.set(keyMap.columnName, mapping);

		return mapping;
	}

	private initFormMappingByValue(recognizedValue: RecognizedValue): void {
		this.setFormMapping(recognizedValue.fieldInfo.mappingKey, recognizedValue, false);
	}

	private correctMapping(
		prevRecognizedValues: RecognizedValue[],
		mapping: RecognizedControlMapBase,
		appendValue: boolean,
		markValueAsMapped: boolean
	): void {
		if (prevRecognizedValues) {
			if (!appendValue) {
				prevRecognizedValues.forEach((rv) => rv.markAsNotMapped());
			}
			else {
				prevRecognizedValues.forEach((rv) => rv.markAsMapped());
			}
		}

		mapping.recognizedValues.forEach(rv => {
			if (markValueAsMapped) {
				rv.markAsMapped();
			}
		});
	}

	private getFieldRowInfoFromKey(fieldRowKey: string): RecognizedGridMapKey {
		const info = splitKey(fieldRowKey);

		return {
			columnName: info[0],
			rowIndex: parseInt(info[1]),
		};
	}

	private getRecognizedWordValuesByCell(wordMapJson: string): RecognizedValue[] {
		const poNumberJson = wordMapJson ? decodeURIComponent(wordMapJson.replace(/\+/g, "%20")) : null;
		if (!poNumberJson) {
			return [];
		}
		const pageWordInfo = JSON.parse(poNumberJson);
		if (!pageWordInfo || pageWordInfo.Page == null || pageWordInfo.Word == null) {
			return [];
		}
		const pageWord = getKeyFromValues(pageWordInfo.Page, pageWordInfo.Word);
		return [this.recognizedWordValuesByPageWord[pageWord]];
	}

	private setGridMappingByKey(key: RecognizedGridMapKey, mapping: RecognizedGridCellMap): void {
		const gridKey = getKeyFromValues(key.columnName, key.rowIndex);
		this.gridMappingByFieldRow.set(gridKey, mapping);
	}

	private isDateControl(fieldState: PXFieldState): boolean {
		return fieldState.type === NetType.DateTime;
	}

	private isNumControl(fieldState: PXFieldState): boolean {
		return fieldState.type === NetType.Byte
		|| fieldState.type === NetType.Decimal
		|| fieldState.type === NetType.Double
		|| fieldState.type === NetType.Int16
		|| fieldState.type === NetType.Int32
		|| fieldState.type === NetType.Int64
		|| fieldState.type === NetType.SByte
		|| fieldState.type === NetType.Single
		|| fieldState.type === NetType.UInt16
		|| fieldState.type === NetType.UInt32
		|| fieldState.type === NetType.UInt64;
	}

	private isStringValue(value: string | number | Date): value is string {
		const isStringValue = value && value.constructor.name === "String";
		return isStringValue;
	}

	private validValueAndParams(
		fieldState: PXFieldState,
		value: string | number | Date,
		appendValue: boolean
	): MappingValidationResult {
		if (!value || fieldState.readOnly || fieldState.error) {
			return {
				isValid: false,
				append: false,
				newValue: value,
			};
		}

		const append = appendValue && !this.isDateControl(fieldState) && this.isStringValue(value);
		return {
			isValid: true,
			append: append,
			newValue: value,
		};
	}
}
