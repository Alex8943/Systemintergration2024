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

//Pub handling subscription
const pubsub = new PubSub();

//Makes the schema UI that i see when i type localhost:4000/graphql
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

//Sets up the Apollo
const server = new ApolloServer({
  schema,
  context: () => ({ pubsub }),
});

//Sets the apollo server up 
server.start().then(() => {
  server.applyMiddleware({ app }); //Intergrate Apollo with express
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  //Intergrates websocket with GraphQL
  useServer({ schema, context: () => (
    { pubsub }
  )}, wsServer);

  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
