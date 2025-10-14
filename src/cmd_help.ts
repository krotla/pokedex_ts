import { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log("\nWelcome to the Pokedex!");
    console.log("Usage:\n");
    for (let cmd in state.commands) {
        const cmdObj = state.commands[cmd];
        console.log(`${cmdObj.name}: ${cmdObj.description}`);
    }
}