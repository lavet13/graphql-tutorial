import { useQuery, gql } from '@apollo/client';

import { Link } from 'react-router-dom';

import { CircularProgress, Stack } from '@mui/material';

import { Alert } from '@mui/lab';

import BooksList from '../../components/books-list/books-list.component';
import GenericButtonComponent from '../../components/button/button.component';
import { Book } from '@mui/icons-material';

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`;

export type Book = {
  id: string;
  title: string;
  author: string;
  __typename: 'Book';
};

export type BooksQuery = {
  books: Book[];
};

const Home = () => {
  const { loading, error, data } = useQuery<BooksQuery>(GET_BOOKS);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>Error message: {error.message}</Alert>
      ) : (
        <Stack mt={3}>
          <BooksList data={data} />
          <Stack mt={3} justifyContent={'center'}>
            <GenericButtonComponent
              component={Link}
              to={'book/add'}
              sx={{ alignSelf: 'flex-start' }}
              variant='text'
              size='medium'
              startIcon={<Book />}
            >
              Добавить книгу
            </GenericButtonComponent>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Home;
