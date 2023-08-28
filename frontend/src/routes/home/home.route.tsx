import { useQuery } from '@apollo/client';

import { Link } from 'react-router-dom';

import { CircularProgress, Stack } from '@mui/material';

import { Alert, LoadingButton } from '@mui/lab';

import BooksList from '../../components/books-list/books-list.component';
import GenericButtonComponent from '../../components/button/button.component';
import { Book } from '@mui/icons-material';

import { gql } from '../../__generated/gql';
import { useState } from 'react';

export const GET_BOOKS = gql(/* GraphQL */ `
  query GetBooks($offset: Int) {
    books(offset: $offset, limit: 10) {
      id
      title
      author
    }
  }
`);

const Home = () => {
  const [isNextFetchLoading, setIsNextFetchLoading] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS);

  const handleNextFetch = async () => {
    if (data && data.books) {
      setIsNextFetchLoading(true);
      // await new Promise(resolve => setTimeout(() => resolve(1), 2000));
      await fetchMore({
        variables: {
          offset: data.books.length,
        },
      });
      setIsNextFetchLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>Error message: {error.message}</Alert>
      ) : (
        <Stack mt={3}>
          <BooksList
            isLoading={isNextFetchLoading}
            fetchMore={handleNextFetch}
            data={data}
          />
          <Stack direction={'row'} spacing={1} mt={3} alignItems={'center'}>
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

            {/* <LoadingButton
              onClick={handleNextFetch}
              sx={{ alignSelf: 'flex-start' }}
              variant='outlined'
              loading={isNextFetchLoading}
            >
              Загрузить еще книг
            </LoadingButton> */}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Home;
