import {
	PXFieldOptions,
	PXFieldState,
	PXView} from "client-controls";

export class LLMConnection extends PXView {
	ConnectionID: PXFieldState;
	Name: PXFieldState;
	ProviderID: PXFieldState<PXFieldOptions.CommitChanges>;
	Status: PXFieldState;
	StatusMessage: PXFieldState<PXFieldOptions.Multiline>;
}

export class LLMConnectionParameter extends PXView {
	ParameterID: PXFieldState;
	LLMProviderParameter__Name: PXFieldState;
	Value: PXFieldState;
}

/*
export class LLMConnectionStats extends PXView {
	InputTokensPerMinuteMedian: PXFieldState;
	InputTokensPerMinute95: PXFieldState;
	InputTokensPerMinuteMax: PXFieldState;
	InputTokensPerMonth: PXFieldState;
	OutputTokensPerMinuteMedian: PXFieldState;
	OutputTokensPerMinute95: PXFieldState;
	OutputTokensPerMinuteMax: PXFieldState;
	OutputTokensPerMonth: PXFieldState;
	RequestsPerMinuteMedian: PXFieldState;
	RequestsPerMinuteMax: PXFieldState;
	TotalRequestsPerMonth: PXFieldState;
}
*/