import { QueryResolvers } from '../types';
import { books } from '../../app';

const queries: QueryResolvers = {
  books: (_, { offset, limit }) => {
    if (offset && limit) {
      return books.slice(offset, limit);
    } else {
      return books;
    }
  },

  getBookById: (_, { id: bookId }) => {
    const existingBook = books.find(book => book.id === bookId);

    if (!existingBook) return null;

    return existingBook;
  },
};

export default queries;
