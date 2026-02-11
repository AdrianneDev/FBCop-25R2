import { PXView, PXFieldState, gridConfig, GridPreset, headerDescription, ICurrencyInfo, disabled,  PXFieldOptions, linkCommand, columnConfig, GridColumnShowHideMode, GridColumnType, PXActionState, TextAlign } from "client-controls";

// Views


@gridConfig({ preset: GridPreset.Inquiry })
export class OAuthServerKey extends PXView  {
	SigningKey: PXFieldState;
	KeyID: PXFieldState;
	CreationDateUtc: PXFieldState;
	ExpirationDateUtc: PXFieldState;
}

export class OAuthServerKeyView extends PXView  {
	DeactivateImmediatly: PXFieldState<PXFieldOptions.CommitChanges>;
	ExpirationPeriod: PXFieldState;
}
