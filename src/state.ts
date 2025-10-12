import { createInterface, type Interface } from "readline";
import { commandExit } from './cmd_exit.js';
import { commandHelp } from './cmd_help.js';

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "PokeDex > ",
    });
    const cmds = getCommands();

    return {
        readline: rl,
        commands: cmds,
    }; 
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

