import {
	IToolBarItem, IToolBarMenuButton,
	NewMenuButton, NewMenuMenuOptions
} from "client-controls";
import {
	OptionsDescriptor,
	ToolBarProperties,
	commandSettings,
	initialMenuTree,
	isOptionsDescriptor,
} from "./menu-config";

interface ToolbarConfig {
	[key: string]: IToolBarMenuButton;
}

function makeToolbarButtonConfig(
	commandName: string,
	properties: ToolBarProperties,
	isOptions: boolean = false
): IToolBarMenuButton {
	const item: IToolBarMenuButton = {
		...(isOptions ? NewMenuMenuOptions(commandName) : NewMenuButton(commandName)),
		commandName: isOptions ? undefined : commandName,
		...properties,
	};
	return item;
}

function makeToolbarItem(
	commandName: OptionsDescriptor | string,
	commandSetings: Map<string, ToolBarProperties>
): IToolBarItem {
	let action: IToolBarMenuButton;
	if (isOptionsDescriptor(commandName)) {
		action = makeToolbarButtonConfig(commandName.name, commandSetings.get(commandName.name), true);
		(action as any).options = commandName.children.reduce((obj:ToolbarConfig, val) => {
			obj[val] = makeToolbarButtonConfig(val, commandSetings.get(val));
			return obj;
		}, {});
	}
	else {
		action = makeToolbarButtonConfig(commandName, commandSetings.get(commandName));
	}
	return {
		type: isOptionsDescriptor(commandName) ? "menu-options" : "menu-button",
		config: action,
	};
}

export function initActionsConfig(): {
	[k: string]: IToolBarMenuButton & {
		index?: number;
	};
} {
	const config: ToolbarConfig = {};
	for (const commandName of initialMenuTree) {
		if (!isOptionsDescriptor(commandName)) {
			config[commandName] = makeToolbarButtonConfig(commandName, commandSettings.get(commandName));
		}
		else {
			for (const childCommandName of commandName.children) {
				config[childCommandName] = makeToolbarButtonConfig(childCommandName, commandSettings.get(childCommandName));
				config[childCommandName].hidden = true;
			}
		}
	}
	return config;
}

export function initTopBarItems(): {
	[k: string]: IToolBarItem;
} {
	const result = {};
	for (const commandName of initialMenuTree) {
		const key = isOptionsDescriptor(commandName) ? commandName.name : commandName;
		result[key] = makeToolbarItem(commandName, commandSettings);
		if (isOptionsDescriptor(commandName)) {
			for (const childCommandName of commandName.children) {
				result[childCommandName] = makeToolbarItem(childCommandName, commandSettings);
			}
		}
	}
	return result;
}
