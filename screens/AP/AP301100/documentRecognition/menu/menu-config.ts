import { IToolBarMenuButton } from "client-controls";
import { exitTableModeButtonClass } from "../../const";

export type ToolBarProperties = Pick<IToolBarMenuButton, "cssClass" | "text" | "hidden" | "disabled">;
export interface OptionsDescriptor { name: string; children: string[] }
export type CommandTree = (OptionsDescriptor | string)[];

export function isOptionsDescriptor(item: OptionsDescriptor | string): item is OptionsDescriptor {
	return (item as OptionsDescriptor).children !== undefined;
}

export const commandSettings: Map<string, ToolBarProperties> = new Map();
commandSettings.set("UpdateMapping", { text: "Update Column Mapping" });
commandSettings.set("AddNewMapping", { text: "Add Columns" });
commandSettings.set("ExitTableMapping", { text: "EXIT TABLE MAPPING", cssClass: exitTableModeButtonClass, hidden: true });
commandSettings.set("MappingOptions", { text: "MAPPING OPTIONS" });

export const initialMenuTree: CommandTree = [
	{ name: "MappingOptions", children: ["UpdateMapping", "AddNewMapping"] },
	"ExitTableMapping",
];
