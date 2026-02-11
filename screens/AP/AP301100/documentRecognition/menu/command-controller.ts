import {
	CALLBACK_COMPLETED_EVENT, CallbackCompletedEvent, ExecuteCommandEvent, IScreenApiResult, LongRunChangedEvent, ProcessStatus,
	ScreenService, ServerCommand, LongRunState } from "client-controls";
import { Subscription } from "aurelia-event-aggregator";

export enum CommandExecutionType {
	ClientOnlyCommand,
	PreServerCommand,
	PostServerCommand,
	LongOperationCommand
}

interface ICommandHandlerDescription {
	type: CommandExecutionType;
	handler(): void;
}

interface IDeletedGridRowHandlerDescription {
	viewName: string;
	handler(deleteResults: {
		affected: boolean;
		index: number;
		id: string;
	}): void;
}

export interface IClientCommandController {
	readonly subscriptions: Subscription[];
	bindClientCommandHandler(cmdType: CommandExecutionType, command: string, action: () => void): void;
	bindGridRowDeletedHandler(viewName: string, handler: (deleteResults: {
		affected: boolean;
		index: number;
		id: string;
	}) => void): void;
	unBindClientCommand(command: string): void;
}

export class ClientCommandController implements IClientCommandController {
	public readonly subscriptions: Subscription[] = [];
	private readonly commandBindings: Map<string, ICommandHandlerDescription> = new Map();
	private currentLongRunCommand: string = null;
	private readonly gridRowHandlerBindings: IDeletedGridRowHandlerDescription[] = [];

	constructor(private readonly screenService: ScreenService ) {
		const preCmdSubscr = this.screenService.Model.screenEventManager.subscribe(ExecuteCommandEvent, (cmdEv: ExecuteCommandEvent) => this.clientCommandsHandler(cmdEv));
		const postCmdSubscr = this.screenService.Model.eventAggregator.subscribe(CALLBACK_COMPLETED_EVENT, (cbEv: CallbackCompletedEvent) => this.postCommandsHandler(cbEv));
		const screenUpdatedSubscr = this.screenService.Model.eventAggregator.subscribe("screen-updated", (res: IScreenApiResult) => this.screenUpdatedHandler(res));
		const longOpStartSubscr = this.screenService.Model.eventAggregator.subscribe(LongRunState.Started, (e: LongRunChangedEvent) => this.startWaitLongRunCommand(e));
		const longOpAbortSubscr = this.screenService.Model.eventAggregator.subscribe(LongRunState.Aborted, (e: LongRunChangedEvent) => this.releaseLongRunCommand(e));
		const longOpClearSubscr = this.screenService.Model.eventAggregator.subscribe(LongRunState.Cleared, (e: LongRunChangedEvent) => this.releaseLongRunCommand(e));
		const longOpHandleSubscr = this.screenService.Model.eventAggregator.subscribe(LongRunState.Succeeded, (e: LongRunChangedEvent) => this.handleLongRunCommand(e));
		const longOpHandle2Subscr = this.screenService.Model.eventAggregator.subscribe(LongRunState.SucceededWithWarning, (e: LongRunChangedEvent) => this.handleLongRunCommand(e));
		this.subscriptions.push(preCmdSubscr, postCmdSubscr, screenUpdatedSubscr, longOpStartSubscr, longOpAbortSubscr, longOpClearSubscr, longOpHandleSubscr, longOpHandle2Subscr);
	}

	public bindClientCommandHandler(cmdType: CommandExecutionType, command: string, action: () => void): void {
		this.commandBindings.set(command, { type: cmdType, handler: action });
	}

	public bindGridRowDeletedHandler(viewName: string, handler: (deleteResults: {
		affected: boolean;
		index: number;
		id: string;
	}) => void): void {
		this.gridRowHandlerBindings.push({ viewName, handler });
	}

	public unBindClientCommand(command: string): void {
		this.commandBindings.delete(command);
	}

	private startWaitLongRunCommand(event: LongRunChangedEvent): void {
		if (this.commandBindings.has(event.detail.command) && this.currentLongRunCommand == null) {
			this.currentLongRunCommand = event.detail.command;
		}
	}

	private handleLongRunCommand(event: LongRunChangedEvent): void {
		if (this.currentLongRunCommand != null && this.commandBindings.has(this.currentLongRunCommand)) {
			this.commandHandler(this.currentLongRunCommand, CommandExecutionType.LongOperationCommand);
			this.releaseLongRunCommand(event);
		}
	}

	private releaseLongRunCommand(event: LongRunChangedEvent): void {
		this.currentLongRunCommand = null;
	}

	private clientCommandsHandler(e: ExecuteCommandEvent): void {
		const commandsToHandle = new ServerCommand();
		for (const serverCommand of e.Command) {
			if (serverCommand != null && this.commandBindings.has(serverCommand.name)) {
				const handlerDesc = this.commandBindings.get(serverCommand.name);
				if (handlerDesc.type === CommandExecutionType.PreServerCommand ||
					handlerDesc.type === CommandExecutionType.ClientOnlyCommand
				) {
					handlerDesc.handler();
					if (handlerDesc.type === CommandExecutionType.ClientOnlyCommand) {
						continue;
					}
				}
			}
			commandsToHandle.push(serverCommand);
		}
		if (!commandsToHandle.length) {
			e.stop();
		}
		else {
			e.Command = commandsToHandle;
		}
	}

	private postCommandsHandler(e: CallbackCompletedEvent): void {
		if (!e.command) {
			return;
		}

		for (const serverCommand of e.command) {
			this.commandHandler(serverCommand.name, CommandExecutionType.PostServerCommand);
		}
	}

	private commandHandler(cmdName: string, cmdType: CommandExecutionType): void {
		if (cmdName != null && this.commandBindings.has(cmdName)) {
			const handlerDesc = this.commandBindings.get(cmdName);
			if (handlerDesc.type === cmdType) {
				handlerDesc.handler();
			}
		}
	}

	private screenUpdatedHandler(data: IScreenApiResult) {
		this.handleDeletedRows(data);
	}

	private handleDeletedRows(data: IScreenApiResult) {
		for (const rowDeleteBinding of this.gridRowHandlerBindings) {
			if (data?.controlsData != null && data?.controlsData[rowDeleteBinding.viewName]?.commitResult?.deleted?.length) {
				for (const deletedRowData of data.controlsData[rowDeleteBinding.viewName].commitResult.deleted as {
					affected: boolean;
					index: number;
					id: string;
				}[]) {
					rowDeleteBinding.handler(deletedRowData);
				}
			}
		}
	}
}
