import { createSingle, PXScreen, graphInfo, handleEvent, RowSelectedHandlerArgs, PXViewCollection, CustomEventType, createCollection, localizable, PXActionState, RowCssHandlerArgs, gridConfig, GridPreset, PXView, PXFieldState } from "client-controls";
import { PM301500 } from "../PM301500";

class Colors {
	public static readonly Info = "Info";
	public static readonly Green = "Green";
}

export interface PM301500_Scorecards extends PM301500 { }
export class PM301500_Scorecards {
	Scorecards = createCollection(ScorecardState);

	scorecards: any = {
		ProjectCompleted: this.createScorecardTemplate(Colors.Info),
		GrossProfitAtCompletion: this.createScorecardTemplate(Colors.Green),
		GrossProfitToDate: this.createScorecardTemplate(Colors.Green),
		MarginToDate: this.createScorecardTemplate(Colors.Info),
		ProjectedMargin: this.createScorecardTemplate(Colors.Green),
		BudgetedRevenue: this.createScorecardTemplate(Colors.Green),
		ActualRevenueToDate: this.createScorecardTemplate(Colors.Info),
		ContractBilled: this.createScorecardTemplate(Colors.Info),
		OverbillingUnderbilling: this.createScorecardTemplate(Colors.Green),
		RevenueBudgetBacklog: this.createScorecardTemplate(Colors.Info),
		ExpectedRevenue: this.createScorecardTemplate(Colors.Info),
		BudgetedCost: this.createScorecardTemplate(Colors.Green),
		ActualCostsToDate: this.createScorecardTemplate(Colors.Info),
		AnticipatedCost: this.createScorecardTemplate(Colors.Green),
		OpenCommitments: this.createScorecardTemplate(Colors.Info),
		CostBudgetBacklog: this.createScorecardTemplate(Colors.Green),
		Performance: this.createScorecardTemplate(Colors.Green),
		RemainingBudget: this.createScorecardTemplate(Colors.Green),
		OutstandingAPBills: this.createScorecardTemplate(Colors.Green, true),
		PotentialChangeOrders: this.createScorecardTemplate(Colors.Green, true),
		OpenProjectIssues: this.createScorecardTemplate(Colors.Green, true),
		OpenRFIs: this.createScorecardTemplate(Colors.Green, true),
	};

	@handleEvent(CustomEventType.RowSelected, { view: "Scorecards" })
	onScorecardSelected(args: RowSelectedHandlerArgs<PXViewCollection<ScorecardState>>) {
		args.viewModel.records.forEach(record => {
			const scorecard = this.scorecards[record.Key.value];

			if (scorecard) {
				scorecard.config.id = record.Key.value;
				scorecard.config.caption = record.Name.value;
				scorecard.data.level = record.Level.value;
				scorecard.data.value = record.Value.value;
				scorecard.data.action = `Open${record.Key.value}`;
				scorecard.data.accessDenied = record.Disabled.value;
			}
		});
	}

	createScorecardTemplate(headerColor: string, isCompact: boolean = false): any {
		const result = {
			config: {
				colSpan: 2,
				rowSpan: 2,
				col: 0,
				row: 0,
				compactMode: isCompact,
				colors: {
					normal: headerColor,
					warning: "Yellow",
					error: "Red"
				},
				updatable: false,
			},
			data: {}
		};

		return result;
	}
}

@gridConfig({ preset: GridPreset.Empty })
export class ScorecardState extends PXView  {
	Key: PXFieldState;
	Name: PXFieldState;
	Level: PXFieldState;
	Value: PXFieldState;
	Disabled: PXFieldState;
}
