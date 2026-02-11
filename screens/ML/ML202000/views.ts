import {
	controlConfig,
	PXFieldOptions,
	PXFieldState,
	PXView} from "client-controls";

export class LLMPrompt extends PXView {
	PromptID: PXFieldState;
	IsActive: PXFieldState;
	Name: PXFieldState;
	ConnectionID: PXFieldState<PXFieldOptions.CommitChanges>;
	ScreenID: PXFieldState<PXFieldOptions.CommitChanges>;
	ActionName: PXFieldState;
	PromptInstruction: PXFieldState<PXFieldOptions.Multiline | PXFieldOptions.NoLabel>;
	OutputExamples: PXFieldState<PXFieldOptions.Multiline | PXFieldOptions.NoLabel>;
}

export class LLMPromptTesting extends PXView {
	@controlConfig({ displayMode: "text" }) ExampleID: PXFieldState<PXFieldOptions.CommitChanges>;
	LLMPrompt: PXFieldState<PXFieldOptions.Multiline | PXFieldOptions.NoLabel | PXFieldOptions.Readonly>;
	LLMResponseRaw: PXFieldState<PXFieldOptions.Multiline | PXFieldOptions.NoLabel | PXFieldOptions.Readonly>;
	LLMResponse: PXFieldState<PXFieldOptions.Multiline | PXFieldOptions.NoLabel | PXFieldOptions.Readonly>;
	InputTokens: PXFieldState<PXFieldOptions.Readonly>;
	OutputTokens: PXFieldState<PXFieldOptions.Readonly>;
}
