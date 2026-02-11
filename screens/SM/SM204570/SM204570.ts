import { createCollection, createSingle, PXScreen, graphInfo, viewInfo, handleEvent, PXPageLoadBehavior, QpFieldCustomElement, CustomEventType, RowSelectedHandlerArgs, PXViewCollection, QpCodeEditorCustomElement } from "client-controls";
import { computedFrom } from "aurelia-framework";
import { observable } from "aurelia-binding";
import { RowSrcBrowserFilter, RowFindResults, Functions } from "./views";

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

@graphInfo({graphType: "PX.SM.SourceBrowser", primaryView: "Filter", pageLoadBehavior: PXPageLoadBehavior.PopulateSavedValues, hideScreenToolbar: true})
export class SM204570 extends PXScreen {

	Filter = createSingle(RowSrcBrowserFilter);
	@viewInfo({
		containerName: "Find in Files",
	})
	ViewFindResults = createCollection(RowFindResults);
	Functions = createCollection(Functions);

	CodeEditor: QpCodeEditorCustomElement;
	SourceFile: QpCodeEditorCustomElement;

	currentRowId?: string;

	@computedFrom("Filter.ActiveTabIndex.value")
	get activeTabID() {
		switch (this.Filter?.ActiveTabIndex?.value ?? 0) {
			case 0: {
				return "tabScreenAspx";
			}
			case 1: {
				return "tabScreenHtml";
			}
			case 2: {
				return "tabScreenTypeScript";
			}
			case 3: {
				return "tabBusLogic";
			}
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			case 4: {
				return "tabDataAccess";
			}
			// eslint-disable-next-line @typescript-eslint/no-magic-numbers
			case 5: {
				return "tabFindInFiles";
			}
			default: {
				return "tabScreenAspx";
			}
		}
	}

	@handleEvent(CustomEventType.RowSelected,
		{ view: 'Functions' })
	onFunctionsRowChange(
		args: RowSelectedHandlerArgs<PXViewCollection<Functions>>) {
		if (!args?.viewModel?.activeRow?.Name?.value) return;

		const html = this.Filter.ReadonlyEventSource.value;
		if (!html) return;

		const findStr = `${args?.viewModel?.activeRow?.RawName?.value}`;
		const editorPosition = html.indexOf(findStr);
		const { before, after } = splitAfterCurrentLine(html, editorPosition);

		this.CodeEditor.currentCursorPosition = before.length - 1;
		this.CodeEditor.scrollCursorIntoView();
	}

	@handleEvent(CustomEventType.RowSelected,
		{ view: 'ViewFindResults' })
	async onRowFindResultsRowChange(
		args: RowSelectedHandlerArgs<PXViewCollection<RowFindResults>>) {
		if (!args?.viewModel?.activeRow?.Line?.value) return;

		if (this.currentRowId === undefined) {
			this.currentRowId = args?.viewModel?.activeRow?.id;
		}
		else if (this.currentRowId !== args?.viewModel?.activeRow?.id) {
			this.currentRowId = args?.viewModel?.activeRow?.id;
			await this.screenService.update();
		};

		const html = this.Filter.SourceFile.value;
		if (!html) return;

		const lineNbr = args?.viewModel?.activeRow?.Line?.value;
		const lines = html.split("\n");
		let editorPosition = 0;
		for (let i = 0; i < lineNbr - 1; i++) {
			editorPosition += lines[i].length + 1;
		}

		this.SourceFile.currentCursorPosition = editorPosition;
		this.SourceFile.scrollCursorIntoView();
	}
}
