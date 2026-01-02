import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  console.log("Your Pokedex:");
  const pokedex = state.pokeAPI.openPokedex();
  if (pokedex.length === 0) {
    return;
  } else {
    for (const pokemon of pokedex) {
      console.log(` - ${pokemon}`);
    }
  }
}
