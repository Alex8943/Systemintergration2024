import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';
import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';

const app = express();
const httpServer = createServer(app);

const typeDefs = readFileSync('./schema.graphql', 'utf-8');
const pubsub = new PubSub();


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: () => ({ pubsub }),
});



server.start().then(() => { //Starts the Apollo server and then sets it up with Express middleware.
  server.applyMiddleware({ app });

  const wsServer = new WebSocketServer({ //Creates a WebSocket server for handling subscriptions.
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema, context: () => ({ pubsub }) }, wsServer); // Integrates the WebSocket server with the GraphQL schema and context.

  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
