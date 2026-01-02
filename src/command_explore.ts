import type { State } from "./state.js";

export async function commandExplore(state: State, location: string) {
  if (!location) {
    throw new Error("location cannot be empty");
  }
  console.log(`Exploring ${location}...`);
  const locations = await state.pokeAPI.fetchLocation(location);

  console.log(`Found Pokemon:`);
  for (const pokemon of locations.pokemon_encounters) {
    console.log(`- ${pokemon.pokemon.name}`);
  }
}
