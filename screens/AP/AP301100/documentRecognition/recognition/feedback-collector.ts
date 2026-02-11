import { BaseApiClient, PXActionState } from "client-controls";
import { RecognizedValue } from "./recognized-value";
import { getKeyFromValues } from "./utils";
import { BoundingBoxMap, RecognizedPage } from "./types";

interface PageWord {
	page: number;
	word: number;
	keyValuePair?: number;
}

enum FeedBackType {
	Field = "FieldBound",
	Grid = "TableRelated"
}

export class FeedbackCollector {
	private pageKeyValuePairByWord: Map<string, number> = new Map();
	private recognizedPages?: RecognizedPage[];

	constructor(
		private readonly formViewName: string,
		private readonly gridViewName: string,
		private readonly dumpTableFeedbackAction: PXActionState,
		private readonly screenId: string,
		private readonly vendorFieldName: string,
		private readonly apiClient: BaseApiClient,
	) {}

	public fillPageKeyValuePairByWord(recognizedPages: RecognizedPage[]): void {
		this.recognizedPages = JSON.parse(JSON.stringify(recognizedPages));
		this.pageKeyValuePairByWord.clear();

		recognizedPages.forEach((page: RecognizedPage, pageIndex: number) => {
			if (page.words != null) {
				page.words.forEach((word, wordIndex: number) => {
					if (word != null && word.boundingBox != null) {
						const key = getKeyFromValues(pageIndex, word.text);
						this.pageKeyValuePairByWord.set(key, wordIndex);
					}
				});
			}
		});
	}

	public async collectFormFeedback(fieldName: string, recognizedValues: RecognizedValue[]): Promise<void> {
		let boundingBoxes = [];

		recognizedValues.forEach((rv: RecognizedValue) => {
			rv.boundingBoxes.forEach((bb: BoundingBoxMap) => {
				const page = this.recognizedPages[bb.page];

				if (bb.table != null && bb.cell != null) {
					const table = page.tables[bb.table];
					const cell = table.cells[bb.cell];

					if (cell.ocr) {
						boundingBoxes = boundingBoxes.concat(cell.ocr.boundingBoxes);
					}
				}
				else if (bb.keyValuePair != null) {
					boundingBoxes.push(bb);
				}
				else if (bb.page != null && bb.word != null) {
					const newBox: PageWord = {
						page: bb.page,
						word: bb.word,
					};
					const key = getKeyFromValues(bb.page, bb.word);
					const keyValuePair = this.pageKeyValuePairByWord.get(key);

					if (keyValuePair != null) {
						newBox.word = null;
						newBox.keyValuePair = keyValuePair;
					}

					boundingBoxes.push(newBox);
				}
			});
		});

		const feedback = {};
		const feedbackFieldName = `${this.formViewName}.${fieldName}`;
		if (feedbackFieldName === this.vendorFieldName) {
			const fullTextTerm = this.getFullTextSearchFieldTerm(boundingBoxes);
			feedback[feedbackFieldName] = fullTextTerm;
		}
		else {
			const ocr = this.getFieldBoundOcr(boundingBoxes);
			feedback[feedbackFieldName] = ocr;
		}

		const feedbackString = JSON.stringify(feedback);
		await this.executeCollectFeedback(FeedBackType.Field, feedbackString);
	}

	public async collectGridFeedback(
		detailColumn: string,
		detailRow: number,
		pageIndex: number,
		tableIndex: number,
		columnIndexArray: number[],
		rowIndex: number
	) {
		const feedbackColumnName = `${this.gridViewName}.${detailColumn}`;
		const cellBound = {
			detailColumn: feedbackColumnName,
			detailRow: detailRow,
			page: pageIndex,
			table: tableIndex,
			columns: columnIndexArray,
			row: rowIndex,
		};

		const feedbackString = JSON.stringify(cellBound);
		await this.executeCollectFeedback(FeedBackType.Grid, feedbackString);
	}

	public dumpGridFeedback(): void {
		this.dumpTableFeedbackAction.press();
	}

	private getFieldBoundOcr(boundingBoxes: BoundingBoxMap[]) {
		return {
			ocr: {
				boundingBoxes: boundingBoxes,
			},
		};
	}

	private getFullTextSearchFieldTerm(boundingBoxes) {
		if (boundingBoxes.length > 0) {
			return {
				fullTextTerms: [
					{
						boundingBoxes: boundingBoxes,
					},
				],
			};
		}

		return {
			fullTextTerms: [],
		};
	}

	private async executeCollectFeedback(type: FeedBackType, feedbackData: string) {
		const feedbackEncoded = encodeURIComponent(feedbackData);
		const requestData = {
			data: [
				{
					viewName: "BoundFeedback",
					fieldName: type,
					rowId: "",
					value: feedbackEncoded,
				},
			],
		};
		await this.apiClient.fetch(`ui/screen/${this.screenId}`, JSON.stringify(requestData));
	}
}
