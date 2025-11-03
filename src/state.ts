import { createInterface, type Interface } from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandExit } from './cmd_exit.js';
import { commandHelp } from './cmd_help.js';
import { commandMap, commandMapb } from "./cmd_map.js";
import { commandExplore } from "./cmd_explore.js";
import { commandCatch } from "./cmd_catch.js";
import { commandInspect } from "./cmd_inspect.js";
import { commandPokedex } from "./cmd_pokedex.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "PokeDex > ",
    });
    const cmds = getCommands();
    const pokedex: Record<string, Pokemon> = {};

    return {
        readline: rl,
        commands: cmds,
        pokeAPI: new PokeAPI(30000),
        nextLocationsURL: null,
        prevLocationsURL: null,
        pokedex: pokedex,
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
    explore: {
      name: "explore <location area name>",
      description: "Find pokemons in given location area",
      callback: commandExplore,
    },
    catch: {
      name: "catch <Pokemon name>",
      description: "Try to catch a given pokemon",
      callback: commandCatch,
    },
    inspect: {
      name: "inspect <Pokemon name>",
      description: "Get info about caught pokemon",
      callback: commandInspect,
    },
    pokedex: {
      name: "pokedex",
      description: "Show Pokemons inside your pokedex",
      callback: commandPokedex,
    },
    // can add more commands here
  };
}

