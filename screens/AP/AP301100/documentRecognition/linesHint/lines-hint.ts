import { localizable } from "client-controls";
import { bindable, computedFrom, customElement } from "aurelia-framework";

@localizable("PX.Objects.AP.Messages")
class Messages {
	static LinesHintSingleLine = "line selected";
	static LinesHintMultipleLines = "lines selected";
	static LinesHintButonText = "Next";
	static LinesHintSelectPrefix = "Select";
	static LinesHintSelectSingleLine = "more line";
	static LinesHintSelectMultipleLines = "more lines";
}

export enum HintMode {
	AddRowsMode,
	EditRowsMode,
	HiddenMode
}

@customElement("lines-hint")
export class LinesHintCustomElement {
	Messages = Messages;
	public onSelectAllLinesCallback: () => void;
	public onSelectAllLinesPrevCallback: () => void;
	@bindable()
	public onButtonClickCallback: () => void;
	@bindable()
	public mode: HintMode = HintMode.HiddenMode;
	@bindable()
	public linesTotalToSelect: number = 0;
	@bindable()
	public linesSelected: number = 0;
	@bindable()
	public visible: boolean = false;

	@bindable()
	public linesLeftToSelect: number = null;
	@computedFrom("mode", "linesLeftToSelect", "linesSelected")
	public get canSelectColumns(): boolean {
		return this.mode === HintMode.AddRowsMode && this.linesSelected > 0
		|| this.mode === HintMode.EditRowsMode && this.linesLeftToSelect === 0;
	}
	@computedFrom("mode", "linesLeftToSelect")
	public get canShowLinesLabel(): boolean {
		return this.mode === HintMode.AddRowsMode
		|| this.mode === HintMode.EditRowsMode && this.linesLeftToSelect > 0;
	}

	@computedFrom("mode", "linesLeftToSelect", "linesSelected")
	public get linesCount(): number {
		switch (this.mode) {
			case HintMode.AddRowsMode: return this.linesSelected;
			case HintMode.EditRowsMode: return this.linesLeftToSelect;
			case HintMode.HiddenMode:
			default: return null;
		}
	}

	@computedFrom("mode", "linesCount")
	public get linesLabel(): string {
		switch (this.mode) {
			case HintMode.AddRowsMode: return this.linesCount === 1
				? Messages.LinesHintSingleLine
				: Messages.LinesHintMultipleLines;
			case HintMode.EditRowsMode: return this.linesCount === 1
				? Messages.LinesHintSelectSingleLine
				: Messages.LinesHintSelectMultipleLines;
			case HintMode.HiddenMode:
			default: return null;
		}
	}

	linesLeftToSelectPrev: number = null;

	constructor() {
		// TBA
	}

	switchMode(mode: HintMode, linesCounttoSelect?: number): void {
		this.mode = mode;
		this.visible = mode !== HintMode.HiddenMode;
		this.linesTotalToSelect = linesCounttoSelect;
		if (linesCounttoSelect) {
			this.linesLeftToSelect = linesCounttoSelect;
		}
		this.linesSelected = 0;
		this.linesLeftToSelectPrev = null;
		this.setLinesCount(0);
	}

	linesToSelect() {
		return this.linesTotalToSelect;
	}

	setLinesCount(count: number): void {
		if (this.linesLeftToSelect != null) {
			this.linesLeftToSelect = this.linesLeftToSelect - count + this.linesSelected;
		}
		this.linesSelected = count;

		if (this.mode === HintMode.EditRowsMode) {
			if (this.linesLeftToSelect === 0) {
				this.onSelectAllLinesCallback();
			}
			else {
				if (this.linesLeftToSelectPrev === 0) {
					this.onSelectAllLinesPrevCallback();
				}
			}

			this.linesLeftToSelectPrev = this.linesLeftToSelect;
		}
	}
}
