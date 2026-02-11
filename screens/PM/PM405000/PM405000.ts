import {
	createCollection,
	createSingle,
	PXScreen,
	graphInfo,
	PXActionState,
	handleEvent,
	RowSelectedHandlerArgs,
	PXViewCollection,
	CustomEventType
} from "client-controls";

import {
	DateSensitiveDataRevision,
	DateSensitiveDataRevisionLine,
	Project,
	BudgetTotals
} from "./views";

@graphInfo({graphType: "PX.Objects.PM.ProjectDateSensitiveCostsInquiry", primaryView: "Revision" })
export class PM405000 extends PXScreen {
	ZoomToYear: PXActionState;
	ZoomToQuarter: PXActionState;
	ZoomToMonth: PXActionState;

	Revision = createSingle(DateSensitiveDataRevision);
	Items = createCollection(DateSensitiveDataRevisionLine);
	Project = createSingle(Project);
	BudgetTotals = createSingle(BudgetTotals);

	chart: any = {
		type: "line",
		config: {
			legendPosition: 4,
			id: "chart",
			colSpan: 12,
			rowSpan: 8,
			col: 0,
			row: 0,
			updatable: false,
		},
		data: {}
	};

	@handleEvent(CustomEventType.RowSelected, { view: "Items" })
	onChartDataSelected(args: RowSelectedHandlerArgs<PXViewCollection<DateSensitiveDataRevisionLine>>) {
		const MaxCurvesCount = 10;

		this.chart.data = {
			graphs: [],
			points: []
		};

		const curves = {};
		args.viewModel.records.forEach(record => {
			let curve = curves[record.CurveID.value];
			if (curve == null) {
				const taskName = record.ProjectTaskID.value != null ? record.ProjectTaskID.value.text : "";
				const groupName = record.AccountGroupID.value != null ? record.AccountGroupID.value.text : "";
				const inventoryName = record.InventoryID.value != null ? record.InventoryID.value.text : "";
				const costCodeName = record.CostCodeID.value != null ? record.CostCodeID.value.text : "";

				let curveName = `${taskName} ${groupName} ${inventoryName} ${costCodeName}`.trim();
				if (curveName === "") {
					curveName = "All";
				}

				curve = {
					id: record.CurveID.value,
					name: curveName,
					points: []
				};

				curves[record.CurveID.value] = curve;
			}

			curve.points.push({
				date: record.Date.value,
				value: record.CuryActualAmount.value
			});
		});

		let curveArray = [];
		for (const curveKey in curves) {
			curveArray.push(curves[curveKey]);
		}

		if (curveArray.length === 0) {
			return;
		}

		if (curveArray.length > MaxCurvesCount) {
			const resultCurve = {id: "All", name: "All", points: curveArray[0].points};
			for (let i = 0; i < resultCurve.points.length; i++) {
				for (let j = 1; j < curveArray.length; j++) {
					if (i < curveArray[j].points.length) {
						resultCurve.points[i].value += curveArray[j].points[i].value;
					}
				}
			}

			curveArray = [resultCurve];
		}

		const graphs = [];
		curveArray.forEach(curve => graphs.push({ title: curve.name }));

		const mainCurve = curveArray[0];
		const points = [];
		for (let i = 0; i < mainCurve.points.length; i++) {
			const point = {
				category: mainCurve.points[i].date.toDateString(),
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

		this.chart.data = {
			graphs: graphs,
			points: points
		};
	}
}
