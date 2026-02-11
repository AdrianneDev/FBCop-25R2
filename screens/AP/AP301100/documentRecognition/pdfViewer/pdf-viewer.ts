import { GlobalWorkerOptions, getDocument } from "pdfjs-dist";
import { PDFPageProxy } from "pdfjs-dist/types/src/display/api";
import { pageClass, canvasClass, svgClass, rectClass } from "../../const";

export class PageInfo {
	readonly pdfPage: PDFPageProxy;
	readonly container: HTMLDivElement;
	readonly canvas: HTMLCanvasElement;
	readonly canvasContext: CanvasRenderingContext2D;
	readonly svg: SVGSVGElement;

	constructor(pdfPage: PDFPageProxy, doc: Document) {
		const pageContainer = doc.createElement("div");
		pageContainer.id = `pdfPage${pdfPage.pageNumber}`;
		pageContainer.className = pageClass;

		const canvas = doc.createElement("canvas");
		canvas.className = canvasClass;
		const canvasContext = canvas.getContext("2d");
		pageContainer.appendChild(canvas);

		const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("preserveAspectRatio", "none");
		svg.classList.add(svgClass);
		pageContainer.appendChild(svg);

		this.pdfPage = pdfPage;
		this.container = pageContainer;
		this.canvas = canvas;
		this.canvasContext = canvasContext;
		this.svg = svg;
	}
}

const maxScaleSteps: number = 100;
const scaleStep: number = 0.1;
const minScale: number = scaleStep;
const maxScale: number = scaleStep * maxScaleSteps;

export class PdfRecognitionViewer {
	pageRendering: boolean = false;
	readonly pageInfo: PageInfo[] = [];
	public currentPageNum: number = 1;
	public pagesCount: number;
	public scale: number = 1.0;
	public initialScale: number;
	public get scalePercent(): string {
		return new Intl.NumberFormat(undefined, { style: "percent" }).format(this.scale);
	}
	readonly pageNumPending: number[] = [];
	readonly pageBoundingClientRectsOnScrolling: DOMRect[] = [];
	private minMarginLeft: number = null;

	constructor(private readonly pdfViewerElement: Element) {
		this.pdfViewerElement.addEventListener("scroll", this.onPageScroll.bind(this));
	}

	createPageControls(page: PDFPageProxy): void {
		const newPageInfo = new PageInfo(page, document);
		this.pdfViewerElement.appendChild(newPageInfo.container);
		this.pageInfo.push(newPageInfo);
	}

	onPageScroll(e: Event) {
		for (let i = 0; i < this.pageInfo.length; i++) {
			this.pageBoundingClientRectsOnScrolling[i] = this.pageInfo[i].container.getBoundingClientRect();
		}

		this.trackCurrentPageNum();
	}

	trackCurrentPageNum(): void {
		let newCurrentPageNum = this.currentPageNum;
		const viewerRect = this.pdfViewerElement.getBoundingClientRect();
		let maxVisiblePageHeight = 0;

		for (let i = 0; i < this.pageBoundingClientRectsOnScrolling.length; i++) {
			const pageRect = this.pageBoundingClientRectsOnScrolling[i];

			if (pageRect.top > viewerRect.bottom || pageRect.bottom < viewerRect.top) {
				continue;
			}

			const pageTop = pageRect.top <= viewerRect.top ? viewerRect.top : pageRect.top;
			const pageBottom = pageRect.bottom >= viewerRect.bottom ? viewerRect.bottom : pageRect.bottom;
			const visibleHeight = pageBottom - pageTop;

			if (visibleHeight > maxVisiblePageHeight) {
				maxVisiblePageHeight = visibleHeight;
				newCurrentPageNum = i + 1;
			}
		}
		this.currentPageNum = newCurrentPageNum;
	}

	async renderPdf(fileUrl: string, minMarginLeft: number): Promise<void> {
		if (!fileUrl) {
			return;
		}

		await import("pdfjs-dist/build/pdf.worker.min.mjs");
		GlobalWorkerOptions.workerSrc = "node_modules/pdfjs-dist/build/pdf.worker.min.mjs";

		const pdfTask = getDocument(fileUrl);
		this.pageInfo.forEach((pi) => {
			const element = pi.svg;
			const rectangles = element.getElementsByClassName(rectClass);
			for (const rectangle of Array.from(rectangles)) {
				element.removeChild(rectangle);
			}
			this.pdfViewerElement.removeChild(pi.container);
		});
		this.pageInfo.splice(0);
		const pdfDoc = await pdfTask.promise;
		this.pagesCount = pdfDoc.numPages;
		for (let i = 1; i <= pdfDoc.numPages; i++) {
			const iCaptured = i;

			const page = await pdfDoc.getPage(i);
			if (i === 1) {
				this.minMarginLeft = minMarginLeft;
				this.scale = this.initialScale = this.computeScale(page);
			}

			this.createPageControls(page);
			this.renderPage(iCaptured);
		}
	}

	resize(): void {
		const firstPage = this.pageInfo[0];
		if (!firstPage) {
			return;
		}

		this.scale = this.computeScale(firstPage.pdfPage);
		this.rescalePages();
	}

	renderPage(num: number): void {
		this.pageRendering = true;

		const pageInfo = this.pageInfo[num - 1];
		const page = pageInfo.pdfPage;
		const viewport = page.getViewport({ scale: this.scale });
		const fixedHeight = Math.trunc(viewport.height);
		const fixedWidth = Math.trunc(viewport.width);

		pageInfo.canvas.height = fixedHeight;
		pageInfo.canvas.width = fixedWidth;

		pageInfo.svg.setAttribute("height", fixedHeight.toString());
		pageInfo.svg.setAttribute("width", fixedWidth.toString());

		this._setPageMarginLeft(pageInfo.container, this.minMarginLeft);

		const renderContext = {
			canvasContext: pageInfo.canvasContext,
			viewport: viewport,
		};
		const renderTask = page.render(renderContext);

		renderTask.promise.then(() => {
			this.pageRendering = false;

			if (this.pageNumPending.length > 0) {
				const pageNumToRender = this.pageNumPending.shift();
				this.renderPage(pageNumToRender);
			}
		});
	}

	_setPageMarginLeft(pageContainer: HTMLDivElement, minMarginLeft: number) {
		if (minMarginLeft < 0) {
			pageContainer.style.marginLeft = `${-1 * minMarginLeft}px`;
		}
		else {
			pageContainer.style.marginLeft = "";
		}
	}

	queueRenderPage(num: number) {
		if (this.pageRendering) {
			this.pageNumPending.push(num);
		}
		else {
			this.renderPage(num);
		}
	}

	onZoomOut() {
		if (this.scale <= minScale) {
			return;
		}

		this.scale -= scaleStep;
		this.rescalePages();
	}

	onZoomIn() {
		if (this.scale >= maxScale) {
			return;
		}

		this.scale += scaleStep;
		this.rescalePages();
	}

	rescalePages() {
		for (let i = 1; i <= this.pageInfo.length; i++) {
			this.queueRenderPage(i);
		}
	}

	onPrevPage() {
		if (this.currentPageNum > 1) {
			this.scrollToPage(--this.currentPageNum);
		}
	}

	onNextPage() {
		if (this.currentPageNum < this.pageInfo.length) {
			this.scrollToPage(++this.currentPageNum);
		}
	}

	scrollToPage(pageNum: number) {
		const pageInfo = this.pageInfo[pageNum - 1];
		if (pageInfo) {
			pageInfo.container.scrollIntoView({ behavior: "smooth" });
		}
	}

	private computeScale(page: PDFPageProxy): number {
		const view = page.view;
		const width = view[2] - view[0];
		const height = view[3] - view[1];

		const scrollbarWidth = 20; // Use constant as there is no scrollbar at this point
		const containerWidth = this.pdfViewerElement.clientWidth - scrollbarWidth;

		const scrollbarHeight = 20; // Use constant as there is no scrollbar at this point
		const containerHeight = this.pdfViewerElement.clientHeight - scrollbarHeight;

		const widthScale = containerWidth / width;
		const heightScale = containerHeight / height;

		return Math.max(widthScale, heightScale);
	}
}