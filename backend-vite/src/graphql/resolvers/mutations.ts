import { books } from '../../app';
import { Book, MutationResolvers } from '../types';
import { nanoid } from 'nanoid';

const mutations: MutationResolvers = {
  addBook: (_, { author, title }) => {
    const newBook: Book = { id: nanoid(), author, title };

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

  deleteBook: (_, { id: bookIdToDelete }) => {
    const deletedBook = books
      .splice(
        books.findIndex(book => book.id === bookIdToDelete),
        1
      )
      .at(0);

    return deletedBook ? deletedBook : null;
  },
};

export default mutations;
