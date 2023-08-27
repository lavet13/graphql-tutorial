import { Stack, Box, Alert, CircularProgress } from '@mui/material';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { useQuery, useMutation } from '@apollo/client';
import GenericButtonComponent from '../button/button.component';
import DraggableDialog from '../draggable-dialog/draggable-dialog.component';

import { gql } from '../../__generated/gql';
import { Book } from '../../__generated/graphql';

export const GET_BOOK = gql(/* GraphQL */ `
  query GetBook($id: ID!) {
    getBookById(id: $id) {
      id
      title
      author
    }
  }
`);

type BookItemParams = {
  id: string;
};

const DELETE_BOOK = gql(/* GraphQL */ `
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      author
    }
  }
`);

const BookItem = () => {
  const navigate = useNavigate();
  const { id } = useParams<keyof BookItemParams>() as BookItemParams;

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { id },
  });

  const [
    deleteBook,
    { loading: mutationLoading, error: mutationError, reset },
  ] = useMutation(DELETE_BOOK, {
    update(cache, { data: mutatedData }) {
      if (mutatedData && mutatedData.deleteBook) {
        cache.modify({
          fields: {
            books(existingBooks = [], { readField }) {
              return existingBooks.filter(
                bookRef =>
                  mutatedData.deleteBook?.id !== readField('id', bookRef)
              );
            },
          },
        });
      }
    },
  });

  const handleDelete = async () => {
    await deleteBook({ variables: { id } });
    navigate('/');
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>Error message: {error.message}</Alert>
      ) : !data?.getBookById ? (
        <Alert severity='error'>Error message: Нет такой книги!</Alert>
      ) : (
        <>
          <Stack
            alignItems={'flex-start'}
            spacing={2}
            maxWidth={500}
            mx={'auto'}
          >
            <Box>Идентификатор: {data?.getBookById?.id}</Box>
            <Box>Название книги: {data?.getBookById?.title}</Box>
            <Box>Автор книги: {data?.getBookById?.author}</Box>
            <Stack direction={'row'} spacing={2}>
              <GenericButtonComponent
                component={Link}
                to={`/book/edit/${data?.getBookById?.id}`}
                variant='contained'
                color='primary'
                size='large'
              >
                Изменить
              </GenericButtonComponent>
              <DraggableDialog
                title='Удалить книгу'
                content='Вы уверены что хотите удалить книгу?'
                actionTitle='Удалить'
                buttonColor='error'
                handleAction={handleDelete}
                loading={mutationLoading}
                error={mutationError}
                reset={reset}
              />
            </Stack>
          </Stack>
        </>
      )}
    </>
  );
};

export default BookItem;
