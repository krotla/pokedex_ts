import { State } from "./state.js";
import { PokeAPI } from "./pokeapi.js";

export async function commandMap(state: State) {
    const url = state.nextLocationsURL ? state.nextLocationsURL : 
        "https://pokeapi.co/api/v2/location-area/";
    const locationAreasPack = await state.pokeAPI.fetchLocations(url);
    const locationAreas = Object.values(locationAreasPack.results);
    for (let area of locationAreas) {
        console.log(area.name);        
    }   
    state.nextLocationsURL = locationAreasPack.next;
    state.prevLocationsURL = locationAreasPack.previous;
}

export async function commandMapb(state: State) {
    if (state.prevLocationsURL) {
        const url = state.prevLocationsURL
        const locationAreasPack = await state.pokeAPI.fetchLocations(url);
        const locationAreas = Object.values(locationAreasPack.results);
        for (let area of locationAreas) {
            console.log(area.name);        
        }   
        state.nextLocationsURL = locationAreasPack.next;
        state.prevLocationsURL = locationAreasPack.previous;
    } else {
        console.log("you're on the first page");
        return;
    } 
}