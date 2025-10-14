export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL: string): Promise<ShallowLocations> {
        try {
            const url = pageURL;
            const pokeAreasJSON = await fetch(url);
            const pokeAreas = await pokeAreasJSON.json();
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