// import process from "process"

import { createInterface } from 'node:readline';
import { commandExit } from './cmd_exit.js';
import { commandHelp } from './cmd_help.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "PokeDex > ",
});

export function startREPL() {
    rl.prompt();
    rl.on("line", (line) => {
        const words = cleanInput(line);
        if (words.length === 0) {
            rl.prompt();
            return;
        } else {
            const availableCommands = getCommands();
            if (words[0] in availableCommands) {
                availableCommands[words[0]].callback(availableCommands);
            } else {
                console.log("Unknown command");
            }
            rl.prompt();
            return;
        }
    })
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(/\s+/).filter((word) => word !== "");
}

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    
    // can add more commands here
  };
}