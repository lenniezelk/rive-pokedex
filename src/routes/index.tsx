// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'
import { dehydrate, useQuery, HydrationBoundary, QueryFunctionContext } from '@tanstack/react-query'
import { fetchPokemon } from '../lib/pokemonApi'
import { Pokemon, PokemonQueryVariables } from '../types'
import { queryClient } from '../lib/query-client'
import { useState } from 'react'

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 30;

export const Route = createFileRoute('/')({
  component: () => {
    const { dehydratedState } = Route.useLoaderData()
    return (
      <HydrationBoundary state={dehydratedState}>
        <Home />
      </HydrationBoundary>
    )
  },
  loader: async () => {
    const variables: PokemonQueryVariables = { limit: INITIAL_LIMIT, offset: INITIAL_OFFSET };

    // 2. Prefetch the data on the server
    await queryClient.prefetchQuery({
      queryKey: ['pokemon', variables], // Must match the key in useQuery!
      queryFn: fetchPokemon,
    });

    // 3. Dehydrate the cache and return it
    return {
      dehydratedState: dehydrate(queryClient),
    };
  },
})

function Home() {
  const variables: PokemonQueryVariables = { limit: INITIAL_LIMIT, offset: INITIAL_OFFSET  };
  const [showDefaultOnly, setSetshowDefaultOnly] = useState(true);
  let pokemons: Pokemon[] = [];

  // This `useQuery` call is now "hydration-aware"
  // On initial load, it gets data from the server's dehydrated cache.
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['pokemon', variables],
    queryFn: fetchPokemon,
    // staleTime can be set to avoid an immediate refetch on the client
    staleTime: 60 * 60 * 60 * 60 * 24, // 1 day
  });

  // `isLoading` will be FALSE on the initial, server-rendered load!
  if (isLoading) {
    return <p>Loading on client navigation... ⏳</p>;
  }

  if (isError) {
    return <p>Error: {error.message} ❌</p>;
  }

  if (showDefaultOnly) {
    // Filter the data to show only default Pokémon
    pokemons = data?.filter(pokemon => pokemon.is_default) || [];
  } else {
    // Show all Pokémon
    pokemons = data || [];
  }

  return (
    <div>{JSON.stringify(pokemons)}</div>
  )
}