import { autoinject } from "aurelia-framework";
import {
	PXScreen,
	graphInfo,
	PXFieldState,
	createCollection,
	PXView,
	PXFieldOptions,
	columnConfig,
	gridConfig,
	GridPreset,
	GridFilterBarVisibility
} from "client-controls";

@graphInfo({ graphType: "PX.Objects.PR.PROvertimeRuleMaint", primaryView: "OvertimeRules" })
@autoinject
export class PR104000 extends PXScreen {
	OvertimeRules = createCollection(OvertimeRules);
}

@gridConfig({
	preset: GridPreset.Primary,
	showFilterBar: GridFilterBarVisibility.False
})
export class OvertimeRules extends PXView {
	IsActive: PXFieldState;
	OvertimeRuleID: PXFieldState<PXFieldOptions.CommitChanges>;
	Description: PXFieldState<PXFieldOptions.CommitChanges>;
	DisbursingTypeCD: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeMultiplier: PXFieldState;
	RuleType: PXFieldState<PXFieldOptions.CommitChanges>;
	OvertimeThreshold: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 110 })
	WeekDay: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 105})
	NumberOfConsecutiveDays: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ hideViewLink: true })
	State: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 150 })
	UnionID: PXFieldState<PXFieldOptions.CommitChanges>;
	@columnConfig({ width: 150 })
	ProjectID: PXFieldState<PXFieldOptions.CommitChanges>;
}
