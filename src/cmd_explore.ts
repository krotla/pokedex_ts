import { State } from "./state.js";

export async function commandExplore(state: State, ...cmdArgs: string[]) {
    
    if (cmdArgs.length === 0) {
        console.log(`"explore" command expects name of Location area as 2nd argument!`);
        return;
    }
    const locationAreaName = cmdArgs[0];
    const locationArea = await state.pokeAPI.fetchLocation(locationAreaName);
    const locationPokemonEncounters = Object.values(locationArea.pokemon_encounters);
    console.log(`Exploring ${locationArea.name}...`);
    console.log("Found Pokemon:");
    for (let encounter of locationPokemonEncounters) {
        console.log(encounter.pokemon.name);        
    }   
}