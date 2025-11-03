import { State } from "./state.js";

export async function commandInspect(state: State, ...cmdArgs: string[]) {
    
    if (cmdArgs.length === 0) {
        console.log(`"inspect" command expects name of Pokemon as 2nd argument!`);
        return;
    }
    const pokemonName = cmdArgs[0];
    if (!state.pokedex[pokemonName]) {
        console.log("you have not caught that pokemon");
        return;
    }
    const pokemon = state.pokedex[pokemonName];
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    pokemon.stats.forEach((statObject) => {
        console.log(`  -${statObject.stat.name}: ${statObject.base_stat}`)
    });
    console.log(`Types:`);
    pokemon.types.forEach((typeObject) => {
        console.log(`  - ${typeObject.type.name}`)
    });

}