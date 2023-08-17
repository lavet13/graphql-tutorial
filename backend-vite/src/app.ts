import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';

import { readFileSync } from 'fs';

import resolvers from './graphql/resolvers';

export interface MyContext {
  token?: String;
}

// Construct a schema, using GraphQL schema language
const typeDefs = readFileSync('./src/schema.graphql', { encoding: 'utf-8' });

export const books = [
  {
    id: nanoid(),
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: nanoid(),
    title: 'City of Glass',
    author: 'Paul Auster',
  },
  {
    id: nanoid(),
    title: 'City of Astro',
    author: 'John Maclaren',
  },
  {
    id: nanoid(),
    title: 'City of Gonzalez',
    author: 'Michael Beatch',
  },
  {
    id: nanoid(),
    title: 'City of Australia',
    author: 'Pasha Mackenzi',
  },
];

async function bootstrap() {
  // Required logic for integrating with Express
  const app = express();
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  // Ensure we wait for our server to start
  await server.start();

  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  // if (import.meta.env.PROD) {
  //   // Modified server startup
  //   httpServer.listen(3000);
  // }

  return app;
}

const app = bootstrap();

export const viteNodeApp = app;
