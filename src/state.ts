import { createInterface, type Interface } from "readline";
import { commandExit } from './cmd_exit.js';
import { commandHelp } from './cmd_help.js';
import { commandMap, commandMapb } from "./cmd_map.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
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
        pokeAPI: new PokeAPI(),
        nextLocationsURL: null,
        prevLocationsURL: null,
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
    map: {
      name: "map",
      description: "List next 20 location areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "List previous 20 location areas",
      callback: commandMapb,
    },
    // can add more commands here
  };
}

