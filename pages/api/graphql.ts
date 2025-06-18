import { ApolloServer, gql } from 'apollo-server-micro';
import db from '@/lib/db';
import Product from '@/models/Product';

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float
    imageUrl: String
    rating: Float
  }

  type Query {
    searchProducts(query: String!): [Product!]!
  }
`;

const resolvers = {
  Query: {
    searchProducts: async (_: any, { query }: { query: string }) => {
      await db;
      return Product.find({ name: { $regex: query, $options: 'i' } });
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(req: any, res: any) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
