// src/graphql-client.js
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://graphql.pokeapi.co/v1beta2'; // 👈 Your API endpoint

export const client = new GraphQLClient(endpoint);