import type { State } from "./state.js";

export async function commandCatch(state: State, pokemon: string) {
  if (!pokemon) {
    throw new Error("Pokemon cannot be empty");
  }
  console.log(`Throwing a Pokeball at ${pokemon}...`);
  const pokemonInfo = await state.pokeAPI.fetchPokemon(pokemon);
  const result = state.pokeAPI.catchPokemon(pokemon, pokemonInfo);
  console.log(result);
}
