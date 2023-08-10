import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { nanoid } from 'nanoid';

const typeDefs = `#graphql
  type Query {
    books: [Book]
    authors: [Author]
    getBookById(id: ID!): Book
  }

  type Mutation {
    addBook(title: String, author: String): Book
    updateBook(id: ID!, title: String, author: String): Book
  }

  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]
  }
`;

const books = [
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
];

const resolvers = {
  Query: {
    books: () => books,
    getBookById: (_, { id: bookId }) => {
      return books.find(book => book.id === bookId);
    },
  },
  Mutation: {
    addBook: (_, args) => {
      const newBook = { id: nanoid(), ...args };
      books.push(newBook);
      return newBook;
    },
    updateBook: (_, args) => {
      books.splice(args.id, 1, { ...args });
      return args;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
