// src/types.ts or at the top of your component file

// Type for the query variables
export interface PokemonQueryVariables {
  limit: number;
  offset: number;
}

// Types for the expected data shape
interface PokemonSpriteRaw {
  sprites: {
    front_shiny?: string;
    front_default?: string; // Optional, in case some Pokémon don't have a default sprite
  };
}

interface PokemonSprite {
  front_shiny?: string;
  front_default?: string; // Optional, in case some Pokémon don't have a default sprite
}

type PokemonTypeOptions = 
  'normal' | 'fire' | 'water' | 'grass' | 'electric' | 'ice' | 'fighting'
  | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost'
  | 'dragon' | 'dark' | 'steel' | 'fairy';

interface PokemonType {
  type: {
    name: PokemonTypeOptions;
  }
}

export interface Pokemon {
  id: number;
  name: string;
  is_default: boolean;
  sprite: PokemonSprite;
  types: PokemonTypeOptions[];
}

export interface PokemonRaw {
  id: number;
  name: string;
  is_default: boolean;
  pokemonsprites: PokemonSpriteRaw[];
  pokemontypes: PokemonType[];
}

// The root type returned by the query
export interface PokemonAPIResponse {
  pokemon: PokemonRaw[];
}