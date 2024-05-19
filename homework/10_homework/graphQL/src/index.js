import { ApolloServer } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { readFileSync } from 'fs';
import { resolvers } from './resolvers.js';
import { createServer } from 'http';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import express from 'express';

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

const app = express();
const httpServer = createServer(app);

server.start().then(() => {
  server.applyMiddleware({ app });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  useServer({ schema, context: () => ({ pubsub }) }, wsServer);

  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
