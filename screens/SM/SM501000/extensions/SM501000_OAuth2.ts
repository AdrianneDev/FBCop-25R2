import { PXFieldState } from "client-controls";
import { OAuthAuthorizationProcessingModel } from "src/screens/SM/SM501000/SM501000";

export interface AuthorizationUiProcessingExtension extends OAuthAuthorizationProcessingModel { }

export class AuthorizationUiProcessingExtension {
	EntityType: PXFieldState;
	RequestedFor: PXFieldState;
	Description: PXFieldState;
}