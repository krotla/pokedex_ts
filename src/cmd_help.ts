import { CLICommand } from "./repl.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    for (let cmd in commands) {
        const cmdObj = commands[cmd];
        console.log(`${cmdObj.name}: ${cmdObj.description}`);
    }
}