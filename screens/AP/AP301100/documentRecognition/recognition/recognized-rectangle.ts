import { rectClass } from "../../const";
import { RecognizedValue } from "./recognized-value";
import { BoundingBox, Point } from "./types";

export class RecognizedRectangle {
	readonly mappedRectClass = "mapped";

	x0?: number;
	x1?: number;
	y0?: number;
	y3?: number;
	left?: number;
	top?: number;
	height?: number;
	width?: number;
	readonly polygon?: SVGPolygonElement;
	constructor(
		unit: string,
		pageWidth: number,
		pageHeight: number,
		coordinates: BoundingBox,
		containerWidth: number,
		containerHeight: number,
		svg: SVGSVGElement
	) {
		const localCoordinates: BoundingBox = JSON.parse(JSON.stringify(coordinates));

		if (unit && unit !== "scale" && pageWidth && pageHeight) {
			localCoordinates.forEach((coord: Point) => {
				coord.x /= pageWidth;
				coord.y /= pageHeight;
			});
		}

		[this.x0, this.y0] = [localCoordinates[0].x, localCoordinates[0].y];
		[this.x1, this.y3] = [localCoordinates[1].x, localCoordinates[3].y];

		this.polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		this.polygon.classList.add(rectClass);

		localCoordinates.forEach((coord: Point) => {
			const point = svg.createSVGPoint();
			point.x = this.convertRelativeToPixel(coord.x, containerWidth);
			point.y = this.convertRelativeToPixel(coord.y, containerHeight);

			this.polygon.points.appendItem(point);
		});

		this.rescale(containerWidth, containerHeight, 0);
		this.markAsNotMapped();
	}

	equals(otherRect: RecognizedRectangle) {
		return this.polygon.getAttribute("points") === otherRect.polygon.getAttribute("points");
	}

	rescale(containerWidth: number, containerHeight: number, scale: number): void {
		this.left = this.convertRelativeToPixel(this.x0, containerWidth);
		this.top = this.convertRelativeToPixel(this.y0, containerHeight);
		this.height = this.convertRelativeToPixel(this.y3 - this.y0, containerHeight);
		this.width = this.convertRelativeToPixel(this.x1 - this.x0, containerWidth);

		if (scale) {
			this.polygon.setAttribute("transform", `scale(${scale}, ${scale})`);
		}
	}
	convertRelativeToPixel(relativeValue: number, valueOf100Percents: number): number {
		return valueOf100Percents * relativeValue;
	}
	subscribeOnMousedown(v: RecognizedValue, callback: (v: RecognizedValue, e: MouseEvent) => void): void {
		this.polygon.addEventListener("mousedown", (event: MouseEvent) => callback(v, event));
	}
	subscribeOnMouseenter(callback: (event: MouseEvent) => void): void {
		this.polygon.addEventListener("mouseenter", callback);
	}
	unsubscribeOnMouseenter(callback: (event: MouseEvent) => void): void {
		this.polygon.removeEventListener("mouseenter", callback);
	}
	subscribeOnMouseleave(callback: (event: MouseEvent) => void): void {
		this.polygon.addEventListener("mouseleave", callback);
	}
	unsubscribeOnMouseleave(callback: (event: MouseEvent) => void): void {
		this.polygon.removeEventListener("mouseleave", callback);
	}
	appendToParent(parent: SVGSVGElement): void {
		parent.appendChild(this.polygon);
	}
	isMapped(): boolean {
		return this.polygon.classList.contains(this.mappedRectClass) ? true : false;
	}
	markAsMapped(): void {
		this.polygon.classList.add(this.mappedRectClass);
	}
	markAsNotMapped(): void {
		this.polygon.classList.remove(this.mappedRectClass);
	}
	addClass(cssClass: string): void {
		this.polygon.classList.add(cssClass);
	}
	removeClass(cssClass: string): void {
		this.polygon.classList.remove(cssClass);
	}
	hasClass(cssClass: string): boolean {
		return this.polygon.classList.contains(cssClass);
	}
}
