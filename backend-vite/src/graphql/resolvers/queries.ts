import { QueryResolvers } from '../types';
import { books } from '../../app';

const queries: QueryResolvers = {
  books: (_, { offset = 0, limit = 5 }) => {
    if (typeof offset === 'number' && typeof limit === 'number') {
      return books.slice(offset < 0 ? 0 : offset, offset + limit);
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
