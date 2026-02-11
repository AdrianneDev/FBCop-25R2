import { PXFieldState } from "client-controls";
import { RecognizedValue } from "./recognized-value";

export interface Point {
	x: number;
	y: number;
}
export const boxNumOfPoints = 4;
export type BoundingBox = [Point, Point, Point, Point];
export interface BoundingBoxMap {
	boundingBox?: BoundingBox;
	cell?: number;
	keyValuePair?: any;
	page: number;
	table?: number;
	word: number;
}

export interface MappingValidationResult {
	isValid: boolean;
	append: boolean;
	newValue: string | number | Date;
}

export interface WordBoundingBoxMap {
	page?: number;
	word?: string;
	text: string;
	boundingBox: BoundingBox;
	keyValuePair?: any;
}
export interface FullTextTerm {
	boundingBoxes: BoundingBoxMap[];
	text: string;
	type: string;
}
export interface Ocr {
	text: string;
	boundingBoxes: BoundingBoxMap[];
}
export interface RecognizedField {
	entity: any;
	fullTextTerms: FullTextTerm[];
	ocr: Ocr;
	value: string;
}
export interface RecognizedDetail<TDetail> {
	boundingBoxes: BoundingBoxMap[];
	fields: {
		[k in keyof TDetail]: RecognizedField;
	};
}
export interface RecognizedDocument<TMaster = any, TDetail = any> {
	fields: {
		[k in keyof TMaster]: RecognizedField;
	};
	details: {
		Transactions: {
			ocr: Ocr;
			value: RecognizedDetail<TDetail>[];
		};
	};
}

export interface RecognizedCellMap {
	rowIndex: number;
	columnIndex: number;
	ocr: Ocr;
	boundingBox: BoundingBox;
}

export interface RecognizedCellMapIndex {
	cell: RecognizedCellMap;
	index: number;
}

export interface RecognizedTableMap {
	rowNumber: number;
	columnNumber: number;
	cells: RecognizedCellMap[];
	boundingBox: BoundingBox;
}

export interface RecognizedPage {
	unit: string;
	width: number;
	height: number;
	boundingBox: BoundingBox;
	words: WordBoundingBoxMap[];
	keyValuePairs: { value: RecognizedCellMap }[];
	tables: RecognizedTableMap[];
}

export interface RecognizedData<TMaster = any, TDetail = any> {
	documents: RecognizedDocument<TMaster, TDetail>[];
	pages: RecognizedPage[];
}

export interface RecognizedFieldMapInfo {
	recognizedField?: RecognizedField;
	mappingKey: RecognizedMapKeyBase;
	searchTerm?: FullTextTerm;
}

export interface WordPageIndexInfo {
	wordIndex: NonNullable<number>;
	pageIndex: NonNullable<number>;
}

export type WordPageInfo = WordPageIndexInfo & {
	word: NonNullable<WordBoundingBoxMap>;
};

// recognition types
export interface RecognizedGridRowIndex {
	readonly rowIndex: NonNullable<number>;
}

export interface RecognizedGridMapKey extends RecognizedMapKeyBase, RecognizedGridRowIndex {}

export interface RecognizedMapWithState extends RecognizedMapKeyBase {
	readonly fieldState: PXFieldState;
}

export interface RecognizedGridMapWithValue extends RecognizedMapWithState, RecognizedGridRowIndex {}

export interface RecognizedMapKeyBase {
	readonly columnName: NonNullable<string>;
}

export interface RecognizedControlMapBase {
	recognizedValues: RecognizedValue[];
}
export interface RecognizedGridCellMap extends RecognizedGridMapKey, RecognizedControlMapBase {}
export interface RecognizedFieldMap extends RecognizedControlMapBase {
	fieldKey: RecognizedMapKeyBase;
}

export interface RecognizedGridColumnMap {
	mappings: RecognizedGridCellMap[];
}

export interface RecognizedCellInfo {
	rectangleIndex: number;
	pageIndex: number;
	tableIndex: number;
	cellIndex: number;
	rowIndex: number;
	columnIndex: number;
	columnNumber: number;
	isSet: boolean;
}
