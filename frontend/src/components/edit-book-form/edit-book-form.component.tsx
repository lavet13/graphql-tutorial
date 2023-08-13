import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Book, BooksQuery, GET_BOOKS } from '../../routes/home/home.route';
import { BookQuery, GET_BOOK } from '../book-item/book-item.component';

import { CircularProgress, Alert, TextField, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

type AddAndEditBookFormParams = {
  id: string;
};

export type DefaultValues = Omit<Book, 'id' | '__typename'>;

const defaultValues: DefaultValues = {
  title: '',
  author: '',
};

type BookUpdateQuery = {
  updateBook: Book;
};

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String, $author: String) {
    updateBook(id: $id, title: $title, author: $author) {
      id
      title
      author
    }
  }
`;

const EditBookForm = () => {
  const { id } = useParams<
    keyof AddAndEditBookFormParams
  >() as AddAndEditBookFormParams;

  const navigate = useNavigate();

  const { loading, error, data } = useQuery<BookQuery>(GET_BOOK, {
    variables: { id },
  });

  const [updateBook, { error: mutationError, reset }] =
    useMutation<BookUpdateQuery>(UPDATE_BOOK, {
      update(cache, { data }) {
        if (data) {
          const existingBooks = cache.readQuery<BooksQuery>({
            query: GET_BOOKS,
          });

          if (existingBooks) {
            cache.writeQuery<BooksQuery>({
              query: GET_BOOKS,
              data: {
                books: existingBooks.books.map(book =>
                  book.id === id ? data.updateBook : book
                ),
              },
            });
          }
        }
      },
    });

  const handleResetMutation = () => reset();

  useEffect(() => {
    if (data) {
      const { getBookById } = data;

      if (getBookById) {
        (Object.keys(defaultValues) as (keyof typeof defaultValues)[]).forEach(
          field => setValue(field, getBookById[field])
        );
      }
    }
  }, [data]);

  const validationSchema: Yup.ObjectSchema<DefaultValues> = Yup.object().shape({
    title: Yup.string()
      .defined()
      .required('Название книги обязательно к заполнению'),

    author: Yup.string()
      .defined()
      .required('Автор книги обязателен к заполнению'),
  });

  const { control, handleSubmit, setValue, formState } = useForm<DefaultValues>(
    {
      resolver: yupResolver(validationSchema),
    }
  );

  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<DefaultValues> = async data => {
    console.log(data);

    await updateBook({
      variables: { id, title: data.title, author: data.author },
      optimisticResponse: {
        updateBook: {
          id,
          title: data.title,
          author: data.author,
          __typename: 'Book',
        },
      },
    });

    navigate('/');
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>Error message: {error.message}</Alert>
      ) : !data?.getBookById ? (
        <Alert severity='error'>Error message: Такой книги нет!</Alert>
      ) : mutationError ? (
        <Alert onClose={handleResetMutation} severity='error'>
          Error message: {mutationError.message}
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack alignItems='center' maxWidth={500} mx={'auto'} spacing={2}>
            <TextField variant='filled' disabled label='Id' defaultValue={id} />

            <Controller
              name='title'
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                  {...field}
                  label='Название книги'
                  error={invalid}
                  color='secondary'
                  helperText={error?.message || null}
                  variant='outlined'
                />
              )}
            />

            <Controller
              name='author'
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                  {...field}
                  label='Автор книги'
                  error={invalid}
                  color='secondary'
                  helperText={error?.message || null}
                  variant='outlined'
                />
              )}
            />

            <LoadingButton
              type='submit'
              size='large'
              startIcon={<Save />}
              loading={isSubmitting}
              variant='text'
              color='secondary'
            >
              <span>Подтвердить</span>
            </LoadingButton>
          </Stack>
        </form>
      )}
    </>
  );
};

export default EditBookForm;
