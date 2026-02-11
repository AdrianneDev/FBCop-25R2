import {
	createSingle,
	graphInfo,
	PXActionState,
	PXScreen,
	localizable
} from "client-controls";

import {
	LLMPrompt,
	LLMPromptTesting
} from "./views";

@localizable
export class Labels {
	static InsertInputDataField = "Insert Input Data Field";
	static InsertOutputDataField = "Insert Output Data Field";
}


@graphInfo({
	graphType: "PX.AIStudio.Graph.LLMPromptEntry",
	primaryView: "Document"
})
export class ML202000 extends PXScreen {
	TestPrompt: PXActionState;
	GenerateOutputExample: PXActionState;

	Document = createSingle(LLMPrompt);
	Testing = createSingle(LLMPromptTesting);
	Labels = Labels;

	private updateInstructionsToolbar: HTMLElement | null = null;

	async attached() {
		await super.attached();
		this.updateInstructionsToolbar = document.querySelector("#edInstructionsBOutputExamples .qp-rte-toolbar");
	}
}
