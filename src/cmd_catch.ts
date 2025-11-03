const maxBaseExp = 800;

import { State } from "./state.js";

export async function commandCatch(state: State, ...cmdArgs: string[]) {
    
    if (cmdArgs.length === 0) {
        console.log(`"catch" command expects name of Pokemon as 2nd argument!`);
        return;
    }
    const pokemonName = cmdArgs[0];
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
    const catchPoints = Math.floor(Math.random() * maxBaseExp);
    if (catchPoints > pokemon.base_experience) {
        console.log(`${pokemonName} was caught!`);
        console.log(`You may now inspect it with the inspect command.`);
        state.pokedex[pokemonName] = pokemon; 
    } else {
        console.log(`${pokemonName} escaped!`);
    }
    
}