import { useQuery, useReactiveVar } from '@apollo/client';

import { Link } from 'react-router-dom';

import { CircularProgress, Stack } from '@mui/material';

import { Alert, LoadingButton } from '@mui/lab';

import BooksList from '../../components/books-list/books-list.component';
import GenericButtonComponent from '../../components/button/button.component';
import { Book } from '@mui/icons-material';

import { gql } from '../../__generated/gql';
import { useState } from 'react';
import { limitBooksVar } from '../../cache';

export const GET_BOOKS = gql(/* GraphQL */ `
  query GetBooks($offset: Int, $limit: Int) {
    books(offset: $offset, limit: $limit) {
      id
      title
      author
    }
  }
`);

const Home = () => {
  const limit = useReactiveVar(limitBooksVar);
  const [isNextFetchLoading, setIsNextFetchLoading] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS, {
    variables: { offset: 0, limit },
  });

  const handleNextFetch = async () => {
    if (data && data.books) {
      const currentLength = data.books.length;

      setIsNextFetchLoading(true);
      const fetchMoreResult = await fetchMore({
        variables: {
          offset: currentLength,
          limit: limit + 5,
        },
      });
      setIsNextFetchLoading(false);

      if (fetchMoreResult.data.books) {
        console.log(fetchMoreResult.data.books.length);
        limitBooksVar(currentLength + fetchMoreResult.data.books.length);
      }
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
          <BooksList data={data} />
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
            <LoadingButton
              onClick={handleNextFetch}
              sx={{ alignSelf: 'flex-start' }}
              variant='outlined'
              loading={isNextFetchLoading}
            >
              Загрузить еще книг
            </LoadingButton>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Home;
