import { Cache, CacheEntry } from "./cache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    async fetchLocations(url: string): Promise<ShallowLocations> {
        return await this.getFetchedOrCached<ShallowLocations>(url);
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = PokeAPI.baseURL + "/location-area/" + locationName;
        return await this.getFetchedOrCached<Location>(url);
    }

    // async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    //     const url = PokeAPI.baseURL + "/pokemon/" + pokemonName;
    //     return await this.getFetchedOrCached<Pokemon>(url);
    // }

    async getFetchedOrCached<T>(url: string) {
        const cashedPage = this.cache.get(url)
        if (cashedPage) {
            console.log("----- Cached data... -----")
            return cashedPage as T;
        } 
        try {        
            console.log("----- Fetching... -----");    
            const pokeJSON = await fetch(url);
            const pokeEntity = await pokeJSON.json();
            this.cache.add(url, pokeEntity);
            return pokeEntity;
        } catch (e) {
            console.log(`Problem with fetching data from \n${url}`)
            throw e;
        }
    }
  }

export type ShallowLocations = {
    count: number;
    next: string;
    previous: any;
    results: Location[];
};

export type Location = {
    name: string;
    pokemon_encounters: {
        pokemon: Pokemon;
    }[];
};

export type Pokemon = {
    name: string;
    // base_experience: number;
};