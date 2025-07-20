// src/lib/pokemonApi.ts

import { client } from './graphql-client'; // The same client from previous examples
import { gql } from 'graphql-request';
import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Pokemon, PokemonAPIResponse, PokemonQueryVariables, PokemonRaw } from '../types';

// Convert PokemonRaw from API to Pokemon data
export const convertPokemonRaw = (pokemonRaw: PokemonRaw): Pokemon => {
  return {
    id: pokemonRaw.id,
    name: pokemonRaw.name,
    is_default: pokemonRaw.is_default,
    sprite: {
      front_shiny: pokemonRaw.pokemonsprites[0]?.sprites.front_shiny || '',
      front_default: pokemonRaw.pokemonsprites[0]?.sprites.front_default || '', // Optional, in case some Pokémon don't have a default sprite
    },
    types: pokemonRaw.pokemontypes.map(type => type.type.name),
  };
};

// The GraphQL query string
const GET_POKEMON_QUERY = gql`
     query GetPokemonList($limit: Int!, $offset: Int!) {
      pokemon(offset: $offset, limit: $limit, order_by: { id: asc }) {
        id
        name
        is_default
        pokemonsprites {
          sprites
        }
        pokemontypes {
          type {
            name
          }
      }
      }
  }
`;

// The typed fetcher function
export const fetchPokemon = async (
  ctx: QueryFunctionContext<[string, PokemonQueryVariables]>
): Promise<Pokemon[]> => {
  const [_key, variables] = ctx.queryKey;
  const data: PokemonAPIResponse = await client.request(
    GET_POKEMON_QUERY,
    variables
  );
  console.log('Fetched data:', data);
  return data.pokemon.map(convertPokemonRaw);
};

