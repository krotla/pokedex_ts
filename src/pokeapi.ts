import { Cache, CacheEntry } from "./cache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    async fetchLocations(pageURL: string): Promise<ShallowLocations> {
        const url = pageURL;
        const cashedPage= this.cache.get(pageURL)
        if (cashedPage) {
            console.log("----- Cached data... -----")
            return cashedPage as ShallowLocations;
        } 
        try {        
            console.log("----- Fetching... -----");    
            const pokeAreasJSON = await fetch(url);
            const pokeAreas = await pokeAreasJSON.json();
            this.cache.add(pageURL, pokeAreas);
            return pokeAreas;
        } catch (e) {
            console.log("Problem with fetching data for location areas.")
            throw e;
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        try {
            const url = PokeAPI.baseURL + "/location-area/" + locationName;
            const pokeAreaJSON = await fetch(url);
            const pokeArea = await pokeAreaJSON.json();
            return pokeArea;
        } catch (e) {
            console.log(`Problem with fetching ${locationName} location area data.`)
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
    url: string;
};