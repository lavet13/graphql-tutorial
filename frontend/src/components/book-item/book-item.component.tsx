import { Stack, Box, Alert, CircularProgress } from '@mui/material';

import { useParams } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { Book } from '../../routes/home/home.route';

export const GET_BOOK = gql`
  query GetBook($id: ID!) {
    getBookById(id: $id) {
      id
      title
      author
    }
  }
`;

type BookItemParams = {
  id: string;
};

export type BookQuery = {
  getBookById: Book;
};

const BookItem = () => {
  const { id } = useParams<keyof BookItemParams>() as BookItemParams;

  const { loading, error, data } = useQuery<BookQuery>(GET_BOOK, {
    variables: { id },
  });

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>Error message: {error.message}</Alert>
      ) : (
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Box>id: {data?.getBookById.id}</Box>
          <Box>title: {data?.getBookById.title}</Box>
          <Box>author: {data?.getBookById.author}</Box>
        </Stack>
      )}
    </>
  );
};

export default BookItem;