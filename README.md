# [Work In Progress] Rive Pokedex

A pokedex built using Rive and Tanstack Start using TypeScript and React.

## Tech Stack

- **Frontend**: React + TypeScript
- **Router**: TanStack Router with file-based routing
- **State Management**: TanStack Query (React Query) for server state
- **GraphQL Client**: graphql-request
- **Data Source**: [PokéAPI](https://pokeapi.co/) - The RESTful Pokémon API
- **Animation**: Rive
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Features

- Server-side rendering with hydration
- GraphQL API integration
- Type-safe data fetching
- Optimistic loading states
- Pokemon data with sprites

## How to run:

```bash
pnpm install
pnpm dev
# Visit browser on http://localhost:3000
```

## Project Structure

```
src/
├── routes/          # File-based routing
├── lib/            # Utilities and API clients
├── types.ts        # TypeScript type definitions
└── ...
```