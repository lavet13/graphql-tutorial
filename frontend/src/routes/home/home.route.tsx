import { useQuery, gql } from '@apollo/client';

import { Link } from 'react-router-dom';

import { CircularProgress, Stack } from '@mui/material';

import { Alert } from '@mui/lab';

import Grid from '@mui/material/Unstable_Grid2';
import BooksList from '../../components/books-list/books-list.component';
import GenericButtonComponent from '../../components/button/button.component';

const GET_BOOKS = gql`
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
        <>
          <Grid width={'100%'} container spacing={2}>
            <BooksList data={data} />
          </Grid>
          <Stack mt={3} justifyContent={'center'}>
            <GenericButtonComponent
              component={Link}
              to={'book/add'}
              sx={{ alignSelf: 'flex-start' }}
              variant='contained'
              size='medium'
            >
              Добавить книгу
            </GenericButtonComponent>
          </Stack>
        </>
      )}
    </>
  );
};

export default Home;
