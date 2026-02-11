import {
	GridFilterRow,
	GridRowStatus,
	IGridColumn,
	IGridRow,
	IPXScreen,
	ISelectorControlConfig,
	NetType,
	PXFieldState,
	PXViewCollection,
	ReportParameter,
	ReportResultType,
	FilterCondition,
	FilterOperator,
	ReportFieldInfo,
	isNumeric,
	GridColumnDisplayMode,
	getDefaultControlType,
	getFilterRowDisplayText,
} from "client-controls";
import { FilterData, ReportParameters } from "./report-views";

interface IReportScreen extends IPXScreen {
	Parameters: ReportParameters;
};

export function setParameterDependencies(screen: IReportScreen, p: ReportParameter) {
	if (!p?.viewName || !p.viewName.startsWith("=") || !p.dependencies || p.dependencies.length === 0) {
		return;
	}

	const deps = p.dependencies;
	const f = screen.Parameters[p.name] as PXFieldState<any>;
	const controlType = getDefaultControlType(f);
	if (controlType !== "qp-selector") {
		return;
	}

	const controlConfig: Partial<ISelectorControlConfig> = <Partial<ISelectorControlConfig>> f.controlConfig || {};
	controlConfig.parameters = (screen: IReportScreen) => {
		const params = {};
		for (const dep of deps) {
			const parameterKey = Object.keys(screen.Parameters).find(key => key.toLowerCase() === dep.fieldNameOnReport.toLowerCase());
			if (!parameterKey) {
				continue;
			}
			const value = (<PXFieldState<any, any>> screen.Parameters[parameterKey])?.systemValue;
			if (!value) {
				continue;
			}
			params[dep.fieldNameInSelectorParameters] = value;
		}
		return params;
	};

	f.controlConfig = controlConfig;
}

export function getResultUrl(props: ReportResultParams) {
	let url = `PX.ReportViewer.axd?InstanceID=${props.instanceId}&OpType=${props.opType}`;
	if (typeof props.refresh === "boolean") {
		url += `&Refresh=${props.refresh}`;
	}

	if (props.opType === ReportResultType.Html) {
		if (props.pageIndex) {
			url += `&PageIndex=${props.pageIndex}`;
		}

		if (props.groupId) {
			url += `&Group=${props.groupId}`;
		}

		if (props.search) {
			url += `&Search=${props.search}`;
		}

		if (props.joinPages) {
			url += `&JoinPages=${props.joinPages}`;
		}
	}
	if (!props.basePath) {
		return url;
	}

	return `${props.basePath}${url}`;
}

export interface ReportResultParams {
	instanceId: string;
	opType: ReportResultType;
	refresh?: boolean;
	basePath?: string;
	pageIndex?: number;
	groupId?: string;
	search?: string;
	joinPages?: boolean;
}

export const FilterConditionMapToGrid = {
	[FilterCondition.Equal]: "EQ",
	[FilterCondition.NotEqual]: "NE",
	[FilterCondition.Greater]: "GT",
	[FilterCondition.GreaterOrEqual]: "GE",
	[FilterCondition.Less]: "LT",
	[FilterCondition.LessOrEqual]: "LE",
	[FilterCondition.Like]: "LIKE",
	[FilterCondition.RLike]: "RLIKE",
	[FilterCondition.LLike]: "LLIKE",
	[FilterCondition.NotLike]: "NOTLIKE",
	[FilterCondition.Between]: "BETWEEN",
	[FilterCondition.IsNull]: "ISNULL",
	[FilterCondition.IsNotNull]: "ISNOTNULL",
	[FilterCondition.Today]: "TODAY",
	[FilterCondition.Overdue]: "OVERDUE",
	[FilterCondition.TodayOverdue]: "TODAY_OVERDUE",
	[FilterCondition.Tomorrow]: "TOMMOROW",
	[FilterCondition.ThisWeek]: "THIS_WEEK",
	[FilterCondition.NextWeek]: "NEXT_WEEK",
	[FilterCondition.ThisMonth]: "THIS_MONTH",
	[FilterCondition.NextMonth]: "NEXT_MONTH",
	[FilterCondition.BelongsTo]: "BelongsTo",
	[FilterCondition.IN]: "IN",
};

export const FilterConditionMapFromGrid: {[key: string]: FilterCondition} = {};
for (const f in FilterConditionMapToGrid) {
	FilterConditionMapFromGrid[FilterConditionMapToGrid[f]] = Number(f);
}

export function mapConditionsRows(rows: IGridRow[]): GridFilterRow[] {
	return rows.filter((fr) => fr.cells.DataField.value).map((r) => {
		const row = r.cells;
		const fr = {
			field: row.DataField.value,
			condition: row.Condition.value != null ? FilterConditionMapToGrid[Number(row.Condition.value)] : undefined,
			value: getValue(row.Value.value),
			value2: getValue(row.Value2.value),
			orOperator: row.Operator.value > 0,
			openBrackets: row.OpenBraces.value,
			closeBrackets: row.CloseBraces.value,
		};

		const text = row.Value.options && row.Value.options.length && row.Value.cellText ?
			row.Value.cellText :
			getFilterRowDisplayText(fr, {
				field: fr.field,
				caption: row.DataField.displayName,
				dataType: row.Value.type || NetType.String,
			});

		return {
			...fr,
			text,
		};
	});
}

export function syncFilterToGrid(filterRows: GridFilterRow[], currentRows: IGridRow[]) {
	const rows = filterRows.map((fr, index) => {
		let row: IGridRow = currentRows[index];
		if (!row) {
			row = {
				index,
				status: GridRowStatus.Inserted,
				cells: {}
			};
			row.cells.LineNbr = new PXFieldState(undefined, "LineNbr");
			row.cells.LineNbr.value = index;
		}
		else {
			row.status = GridRowStatus.Modified;
		}
		return mapFilterRowToGridRow(fr, row);
	});
	if (rows.length < currentRows.length) {
		for (let index = rows.length; index < currentRows.length; index++) {
			rows.push({
				index,
				status: GridRowStatus.Deleted,
				cells: currentRows[index].cells
			});
		}
	}

	return rows;
}

function mapFilterRowToGridRow(fr: GridFilterRow, row: IGridRow): IGridRow {
	const createFieldState = (
		fieldName: keyof FilterData, filterFieldName: keyof GridFilterRow, setValue = true, defaultValue?: any
	) => {
		row.cells[fieldName] = new PXFieldState(undefined, fieldName);
		if (setValue) {
			row.cells[fieldName].value =
				typeof fr[filterFieldName] === "undefined" &&
					typeof defaultValue !== "undefined" ? defaultValue : fr[filterFieldName];
		}
		row.cells[fieldName].changed = true;
	};
	createFieldState("DataField", "field");
	createFieldState("Condition", "condition", false);
	row.cells.Condition.value = fr.condition != null ? FilterConditionMapFromGrid[fr.condition] : undefined;
	createFieldState("Value", "value", true, null);
	row.cells.Value.text = fr.text;
	createFieldState("Value2", "value2", true, null);
	createFieldState("OpenBraces", "openBrackets", true, 0);
	createFieldState("CloseBraces", "closeBrackets", true, 0);
	createFieldState("Operator", "orOperator", false);
	row.cells.Operator.value = fr.orOperator ? FilterOperator.Or : FilterOperator.And;

	row.status = row.status || GridRowStatus.Modified;

	return row;
}


export function mapConditionsColumns(fields: ReportFieldInfo[]): IGridColumn[] {
	return fields?.map((f): IGridColumn => ({
		field: f.name,
		caption: f.caption || f.name,
		visible: true,
		allowFilter: true,
		dataType: f.type,
		viewName: f.viewName,
		allowNull: !!f.nullable,
		decimals: isNumeric(f.type) ? (f.precision < 0 ? 0 : f.precision) : undefined,
		dateMask: f.type === NetType.DateTime ? "04/08/03" : undefined,
		format: f.type === NetType.DateTime ? "d" : undefined,
		displayMode: GridColumnDisplayMode.Value,
		state: f.state,
		valueItems: f.values ?
			{ items: f.values.map(v => ({ value: v.item1, text: v.item2 })) } :
			undefined
	})
	) || [];
}

function getValue(val: any) {
	return typeof(val) === "object" ? val?.id : val;
}
