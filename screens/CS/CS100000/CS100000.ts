import { createSingle, customDataHandler, PXScreen, graphInfo, PXFieldState, viewInfo, PXPageLoadBehavior } from "client-controls";
import { FeaturesSet } from "./views";
import { FieldGenerationMode } from "client-controls";

@graphInfo({graphType: "PX.Objects.CS.FeaturesMaint", primaryView: "Features", pageLoadBehavior: PXPageLoadBehavior.GoFirstRecord})
export class CS100000 extends PXScreen {
	featuresControls: FeatureControl[];

	@viewInfo({ containerName: "General Settings", fieldGenerationMode: FieldGenerationMode.Static })
	Features = createSingle(FeaturesSet);

	@customDataHandler()
	CS100000Handler(result: { FeatureControls?: FeatureControl[] }) {
		for (const k of Object.keys(this.Features)) {
			if (this.Features[k] instanceof PXFieldState) {
				this.Features[k].commitChanges = true;
			}
		}

		if (result?.FeatureControls?.length === 0) {
			return;
		}

		if (!this.featuresControls) this.featuresControls = [];
		for (const fc of result.FeatureControls) {
			const currentFc = this.featuresControls?.find( (f) => f.featureName === fc.featureName);
			if (!currentFc) this.featuresControls.push(fc);
			else currentFc.enabled = fc.enabled;
		}
	}
}

export class FeatureControl {
	featureName: string;
	enabled?: boolean;
	level: number;
}
