import { QueryResolvers } from '../types';
import { books } from '../../app';

const queries: QueryResolvers = {
  books: () => books,

  getBookById: (_, { id: bookId }) => {
    const existingBook = books.find(book => book.id === bookId);

    if (!existingBook) return null;

    return existingBook;
  },
};

export default queries;
