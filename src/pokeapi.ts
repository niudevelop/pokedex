import { Cache } from "./pokecache.js";
export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #pokeCache: Cache = new Cache(100000);
  #pokedexCache: Cache = new Cache(100000);
  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    try {
      let locations: ShallowLocations = this.#pokeCache.get(url)?.val;
      if (!locations) {
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`${resp.status} ${resp.statusText}`);
        }
        locations = await resp.json();
        this.#pokeCache.add(url, locations);
      }
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    try {
      let location: Location = this.#pokeCache.get(url)?.val;
      if (!location) {
        const resp = await fetch(url);

        if (!resp.ok) {
          throw new Error(`${resp.status} ${resp.statusText}`);
        }

        location = await resp.json();
        this.#pokeCache.add(url, location);
      }

      return location;
    } catch (e) {
      throw new Error(`Error fetching location '${locationName}': ${(e as Error).message}`);
    }
  }
  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    try {
      let pokemon: Pokemon = this.#pokeCache.get(url)?.val;
      if (!pokemon) {
        const resp = await fetch(url);

        if (!resp.ok) {
          throw new Error(`${resp.status} ${resp.statusText}`);
        }

        pokemon = await resp.json();
        this.#pokeCache.add(url, pokemon);
      }

      return pokemon;
    } catch (e) {
      throw new Error(`Error fetching pokemon '${pokemonName}': ${(e as Error).message}`);
    }
  }
  catchPokemon(pokemon: string, pokemonInfo: Pokemon): string {
    const chance = 1 / (pokemonInfo.base_experience / 50);
    if (Math.random() < chance) {
      this.#pokedexCache.add(pokemon, pokemon);
      return `${pokemon} was caught!`;
    }
    return `${pokemon} escaped!`;
  }
  inspectPokemon(pokemon: string): Pokemon | undefined {
    if (this.#pokedexCache.get(pokemon)) {
      const url = `${PokeAPI.baseURL}/pokemon/${pokemon}`;
      return this.#pokeCache.get(url)?.val;
    }
    return undefined;
  }
  openPokedex(): string[] {
    return this.#pokedexCache.getAll();
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};
export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};
export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
