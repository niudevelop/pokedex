import { createInterface } from "readline";
import { getCommands } from "./commands.js";
import type { State } from "./state.js";
export function cleanInput(input: string): string[] {
  return input
    .trim()
    .split(" ")
    .filter((s) => s.length > 0);
}

export async function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", async (line) => {
    if (line.length === 0) {
      state.rl.prompt();
      return;
    }
    const commandInputs = cleanInput(line);
    const availabeleCommands = state.commands;
    const command = availabeleCommands[commandInputs[0]];
    if (command) {
      try {
        await command.callback(state);
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Unknown command");
    }
    state.rl.prompt();
  });
}
