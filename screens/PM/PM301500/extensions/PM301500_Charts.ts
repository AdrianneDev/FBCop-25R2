import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState } from "client-controls";
import { PM301500 } from "../PM301500";

@localizable
class ChartGraphs {
	static Budget = "Budgeted Cost";
	static Actual = "Actual Cost";
}

export interface PM301500_Charts extends PM301500 { }
export class PM301500_Charts {
	BudgetVsActualChart = createCollection(ChartPoint);

	charts: any = {
		BudgetVsActual: this.createChartTemplate("BudgetVsActual", "line", null)
	};

	@handleEvent(CustomEventType.RowSelected, { view: "BudgetVsActualChart" })
	onBudgetVsActualSelected(args: RowSelectedHandlerArgs<PXViewCollection<ChartPoint>>) {
		this.buildChart(this.charts.BudgetVsActual, args);
	}

	buildChart(chart: any, args: RowSelectedHandlerArgs<PXViewCollection<ChartPoint>>): void {
		chart.data = {
			graphs: [],
			points: []
		};

		const curves = {};
		args.viewModel.records.forEach(record => {
			const graphKey = record.GraphKey.value;
			let curve = curves[graphKey];

			if (curve == null) {
				const curveName = ChartGraphs[record.GraphKey.value];

				curve = {
					id: graphKey,
					name: curveName,
					points: []
				};

				curves[graphKey] = curve;
			}

			curve.points.push({
				name: record.PointName.value,
				value: record.PointValue.value
			});
		});

		const curveArray = [];
		for (const curveKey in curves) {
			curveArray.push(curves[curveKey]);
		}

		if (curveArray.length === 0) {
			return;
		}

		const graphs = [];
		curveArray.forEach(curve => graphs.push({ title: curve.name }));

		const mainCurve = curveArray[0];
		const points = [];
		for (let i = 0; i < mainCurve.points.length; i++) {
			const point = {
				category: mainCurve.points[i].name,
				values: [],
				labels: []
			};

			for (let j = 0; j < curveArray.length; j++) {
				if (i === j || i < curveArray[j].points.length) {
					point.values.push(curveArray[j].points[i].value);
					point.labels.push(curveArray[j].points[i].value.toLocaleString());
				}
			}

			points.push(point);
		}

		chart.data = {
			graphs: graphs,
			points: points
		};
	}

	createChartTemplate(id: string, type: string, caption: string): any {
		const result = {
			type: type,
			config: {
				id: id,
				legendPosition: 4,
				caption: caption,
				colSpan: 12,
				rowSpan: 8,
				col: 0,
				row: 0,
				updatable: false,
			},
			data: {}
		};

		return result;
	}
}

@gridConfig({ preset: GridPreset.Empty })
export class ChartPoint extends PXView  {
	GraphKey: PXFieldState;
	PointName: PXFieldState;
	PointValue: PXFieldState;
}
