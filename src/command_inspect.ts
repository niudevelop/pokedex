import type { State } from "./state.js";

export async function commandInspect(state: State, pokemon: string) {
  if (!pokemon) {
    throw new Error("Pokemon cannot be empty");
  }
  const pokemonInfo = state.pokeAPI.inspectPokemon(pokemon);
  if (pokemonInfo === undefined) {
    console.log("you have not caught that pokemon");
  } else {
    console.log("Name: ", pokemonInfo.name);
    console.log("Height: ", pokemonInfo.height);
    console.log("Weight: ", pokemonInfo.weight);
    console.log("Stats:");
    // console.log(pokemonInfo.stats);
    // return;
    for (const stat of pokemonInfo.stats) {
      console.log(` -${stat.stat.name}:${stat.base_stat}`);
    }
    console.log("Types:");
    for (const type of pokemonInfo.types) {
      console.log(` - ${type.type.name}`);
    }
  }
}
