import { PageInfo } from "../pdfViewer/pdf-viewer";
import { RecognizedRectangle } from "./recognized-rectangle";
import { RecognizedPage, RecognizedCellMap } from "./types";

export abstract class RecognizedRectangleLine {
	protected isSelected: boolean = false;
	protected readonly rectangles: RecognizedRectangle[] = [];
	protected abstract get cssClass(): string;
	constructor(
		pageInfo: PageInfo,
		page: RecognizedPage,
		protected cells: RecognizedCellMap[],
		public readonly index: number
	) {
		this.cells.forEach((c) => {
			const rect = new RecognizedRectangle(
				page.unit,
				page.width,
				page.height,
				c.boundingBox,
				pageInfo.canvas.width,
				pageInfo.canvas.height,
				pageInfo.svg
			);

			rect.polygon.classList.add(this.cssClass);
			this.rectangles.push(rect);
		});
	}

	markAsMapped = () => this.rectangles.forEach((rect) => rect.markAsMapped());
	markAsNotMapped = () => this.rectangles.forEach((rect) => rect.markAsNotMapped());

	appendToParent(parent: SVGSVGElement): void {
		this.rectangles.forEach(function (rect) {
			rect.appendToParent(parent);
		});
	}
	rescale(containerWidth: number, containerHeight: number, scale: number): void {
		this.rectangles.forEach(function (rect) {
			rect.rescale(containerWidth, containerHeight, scale);
		});
	}
	reset(): void {
		this.markAsNotMapped();
	}
	addClass(cssClass: string): void {
		this.rectangles.forEach(function (rect) {
			rect.addClass(cssClass);
		});
	}
	removeClass(cssClass: string): void {
		this.rectangles.forEach(function (rect) {
			rect.removeClass(cssClass);
		});
	}
	hasClass(cssClass: string): boolean {
		for (const rectangle of this.rectangles) {
			if (rectangle.hasClass(cssClass)) {
				return true;
			}
		}

		return false;
	}
	isMapped(): boolean {
		for (const rectangle of this.rectangles) {
			if (rectangle.isMapped()) {
				return true;
			}
		}

		return false;
	}
	subscribeOnMousedown(callback: (value: RecognizedRectangleLine, event: MouseEvent) => void): void {
		this.rectangles.forEach((rect) => {
			rect.subscribeOnMousedown(null, (r, event) => {
				callback(this, event);
			});
		});
	}
	subscribeOnMouseenter(callback) {
		this.rectangles.forEach(function (rect) {
			rect.subscribeOnMouseenter(callback);
		});
	}
	unsubscribeOnMouseenter(callback) {
		this.rectangles.forEach(function (rect) {
			rect.unsubscribeOnMouseenter(callback);
		});
	}
	subscribeOnMouseleave(callback) {
		this.rectangles.forEach(function (rect) {
			rect.subscribeOnMouseleave(callback);
		});
	}
	unsubscribeOnMouseleave(callback) {
		this.rectangles.forEach(function (rect) {
			rect.unsubscribeOnMouseleave(callback);
		});
	}
	getSelected() {
		return this.isSelected;
	}

	protected setSelected(value: boolean) {
		this.isSelected = value;

		if (value) {
			this.markAsMapped();
		}
		else {
			this.markAsNotMapped();
		}
	}
}
