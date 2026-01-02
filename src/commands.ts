import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMapForward } from "./command_map.js";
import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the names of next 20 location areas",
      callback: commandMapForward,
    },
    mapb: {
      name: "mapb",
      description: "Displays the names of previous 20 location areas",
      callback: commandMapForward,
    },
  };
}
