import { QueryResolvers } from '../__generated__/types';
import { books } from 'src/app';

const queries: QueryResolvers = {
  books: () => books,

  getBookById: (_, { id: bookId }) => {
    const existingBook = books.find(book => book.id === bookId);

    if (!existingBook) return null;

    return existingBook;
  },
};

export default queries;
