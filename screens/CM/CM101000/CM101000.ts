import { createSingle, PXScreen, graphInfo, PXView, PXFieldState, controlConfig } from "client-controls";

@graphInfo({ graphType: "PX.Objects.CM.CMSetupMaint", primaryView: "cmsetup" })
export class CM101000 extends PXScreen {

	cmsetup = createSingle(CMSetup);

}

export class CMSetup extends PXView {
	@controlConfig({ allowEdit: true })
	BatchNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	TranslNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	ExtRefNbrNumberingID: PXFieldState;

	@controlConfig({ allowEdit: true })
	GainLossSubMask: PXFieldState;

	AutoPostOption: PXFieldState;
	RateVarianceWarn: PXFieldState;
	RateVariance: PXFieldState;

	@controlConfig({ allowEdit: true })
	TranslDefId: PXFieldState;

	@controlConfig({ allowEdit: true })
	GLRateTypeDflt: PXFieldState;

	@controlConfig({ allowEdit: true })
	GLRateTypeReval: PXFieldState;

	@controlConfig({ allowEdit: true })
	CARateTypeDflt: PXFieldState;

	@controlConfig({ allowEdit: true })
	ARRateTypeDflt: PXFieldState;

	@controlConfig({ allowEdit: true })
	ARRateTypeReval: PXFieldState;

	@controlConfig({ allowEdit: true })
	APRateTypeDflt: PXFieldState;

	@controlConfig({ allowEdit: true })
	APRateTypeReval: PXFieldState;

	@controlConfig({ allowEdit: true })
	PMRateTypeDflt: PXFieldState;

	@controlConfig({ allowEdit: true })
	SOFreightRateTypeDflt: PXFieldState;

	RevalueARPrepaymentsOption: PXFieldState;
	RevalueAPPrepaymentsOption: PXFieldState;
}
