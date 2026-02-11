import { PXScreen } from "client-controls";
import { RMStyle } from "./arm-reports-views";

export enum BorderType {
	// same order as in PX.Reports.Drawing.BorderType
	NotSet = 0, None = 1, Dotted = 2, Dashed = 3, Solid = 4, Double = 5,
	Groove = 6, Ridge = 7, Inset = 8, Outset = 9
}

export enum TextAlignType {
	NotSet = 0, Left = 1, Center = 2, Right = 3
}

export class ArmScreen extends PXScreen {
	protected replaceCssStyle(stylesheet: CSSStyleSheet | undefined, newContent: string) {
		if (stylesheet?.ownerNode) {
			if (stylesheet.ownerNode.textContent !== newContent) {
				stylesheet.ownerNode.textContent = newContent;
			}
		}
		else if (!!newContent) {
			const styleElement = document.createElement("style");
			styleElement.textContent = newContent;
			document.head.appendChild(styleElement);
		}
	}

	protected getBorderCssStyle(lineStyle: BorderType, color: string, height: number | undefined = undefined, withWidth = true) {
		if (lineStyle === BorderType.NotSet || lineStyle === BorderType.None) return "";
		let lineCssStyle = "";

		lineCssStyle = `
			content: "";
			display: block;
			${withWidth ? "width: calc(100% - 8px)" : ""};
		`;
		switch (lineStyle) {
			case BorderType.Solid:
				lineCssStyle += "border-bottom-style: solid;";
				break;
			case BorderType.Dotted:
				lineCssStyle += "border-bottom-style: dotted;";
				break;
			case BorderType.Dashed:
				lineCssStyle += "border-bottom-style: dashed;";
				break;
			case BorderType.Double:
				lineCssStyle += "border-bottom-style: double;";
				break;
			case BorderType.Groove:
				lineCssStyle += "border-bottom-style: groove;";
				break;
			case BorderType.Ridge:
				lineCssStyle += "border-bottom-style: ridge;";
				break;
			case BorderType.Inset:
				lineCssStyle += "border-bottom-style: inset;";
				break;
			case BorderType.Outset:
				lineCssStyle += "border-bottom-style: outset;";
				break;
			default:
				lineCssStyle += "border-bottom-style: solid;";
				break;
		}
		if (!height) {
			lineCssStyle += `border-bottom-width: ${lineStyle === BorderType.Double ? 2 : 1}px;`;
		} else {
			lineCssStyle += `border-bottom-width: ${height}px;`;
		}
		if (color) {
			lineCssStyle += `border-bottom-color: ${color};`;
		}
		return lineCssStyle;
	}

	protected getBackgroundCssStyle(color: string | undefined) {
		return color
			? `
				background-color: ${color} !important;
				--qp-highlight-color: ${color};
				--qp-grid-selected-bg-color: ${color};
			`
			: "";
	}

	protected getFontCssStyle(style: RMStyle) {
		if (!style) return "";

		let rowCssStyle = "";
		if (style.FontName.value) {
			rowCssStyle += `font-family: ${style.FontName.value};`;
		}
		if (style.Bold.value) {
			rowCssStyle += "font-weight: bold;";
		}
		if (style.Italic.value) {
			rowCssStyle += "font-style: italic;";
		}
		if (style.Strikeout.value) {
			rowCssStyle += "text-decoration: line-through;";
		}
		if (style.Underline.value) {
			rowCssStyle += "text-decoration: underline;";
		}
		if (style.FontSize.value) {
			rowCssStyle += `font-size: ${style.FontSize.value}px;`;
		}
		if (style.ColorRGBA.value) {
			rowCssStyle += `color: ${style.ColorRGBA.value};`;
		}
		rowCssStyle += `
			text-overflow: ellipsis;
        	overflow: hidden;
			width: 100%;
		`;
		return rowCssStyle;
	}

	protected getTextAlignCssStyle(style: RMStyle) {
		if (!style) return "";

		let cssStyle = "";
		switch (style.TextAlign.value) {
			case TextAlignType.Center:
				cssStyle += "text-align: center; .arm-datasource-param { justify-content: center; }";
				break;
			case TextAlignType.Right:
				cssStyle += "text-align: right; .arm-datasource-param { justify-content: flex-end; }";
				break;
			case TextAlignType.Left:
			default:
				cssStyle += "text-align: left; .arm-datasource-param { justify-content: flex-start; }";
				cssStyle += "text-align: left;";
				break;
		}
		return cssStyle;
	}
}

export const RMParameters = [
	"@AccountCode",
	"@AccountDescr",
	"@BaseRowCode",
	"@BookCode",
	"@BranchName",
	"@ColumnCode",
	"@ColumnIndex",
	"@ColumnSetCode",
	"@ColumnText",
	"@EndAccount",
	"@EndAccountGroup",
	"@EndBranch",
	"@EndPeriod",
	"@EndProject",
	"@EndProjectTask",
	"@EndSub",
	"@Organization",
	"@OrganizationName",
	"@StartAccount",
	"@StartAccountGroup",
	"@StartBranch",
	"@StartPeriod",
	"@StartProject",
	"@StartProjectTask",
	"@StartSub",
	"@RowCode",
	"@RowIndex",
	"@RowSetCode",
	"@RowText",
	"@UnitCode",
	"@UnitSetCode",
	"@UnitText",
	"@Today",
	"@WeekStart",
	"@WeekEnd",
	"@MonthStart",
	"@MonthEnd",
	"@QuarterStart",
	"@QuarterEnd",
	"@PeriodStart",
	"@PeriodEnd",
	"@YearStart",
	"@YearEnd"
];
