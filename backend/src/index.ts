import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { nanoid } from 'nanoid';
import { db } from './app/models/index.js';

const typeDefs = `#graphql
  type Query {
    books: [Book]
    authors: [Author]
    getBookById(id: ID!): Book
  }

  type Mutation {
    addBook(title: String, author: String): Book
    updateBook(id: ID!, title: String, author: String): Book
    deleteBook(id: ID!): Book
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

try {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (err) {
  console.error('Unable to connect to the database:', err);
}

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
      books.splice(
        books.findIndex(book => book.id === args.id),
        1,
        { ...args }
      );
      return args;
    },
    deleteBook: (_, args) => {
      return books
        .splice(
          books.findIndex(book => book.id === args.id),
          1
        )
        .at(0);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀  Server ready at: ${url}`);
