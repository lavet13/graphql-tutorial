import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { GET_BOOKS } from '../../routes/home/home.route';

import { Alert, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

import { gql } from '../../__generated/gql';
import { Book, GetBooksQuery } from '../../__generated/graphql';

const ADD_BOOK = gql(/* GraphQL */ `
  mutation AddBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`);

type AddBookMutation = {
  addBook: Book;
};

type DefaultValues = Omit<Book, 'id' | '__typename'>;

const AddBookForm = () => {
  const navigate = useNavigate();

  const [addBook, { loading, error, reset }] = useMutation<AddBookMutation>(
    ADD_BOOK,
    {
      update(cache, { data }) {
        if (data) {
          const existingBooks = cache.readQuery<GetBooksQuery>({
            query: GET_BOOKS,
          });

          if (existingBooks && existingBooks.books) {
            cache.writeQuery<GetBooksQuery>({
              query: GET_BOOKS,
              data: {
                books: [...existingBooks.books, data.addBook],
              },
            });
          }
        }
      },
    }
  );

  const handleResetMutation = () => reset();

  const validationSchema: Yup.ObjectSchema<DefaultValues> = Yup.object().shape({
    title: Yup.string()
      .defined()
      .required('Название книги обязательно к заполнению'),
    author: Yup.string()
      .defined()
      .required('Автор книги обязателен к заполнению'),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<DefaultValues> = async data => {
    console.log(data);

    await addBook({
      variables: { title: data.title, author: data.author },
      optimisticResponse: {
        addBook: {
          id: 'temp-id',
          author: data.author,
          title: data.title,
          __typename: 'Book',
        },
      },
    });

    navigate('/');
  };

  console.log({ error });

  return (
    <>
      {error ? (
        <Alert onClose={handleResetMutation} severity='error'>
          Error message: {error.message}
        </Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            mt={5}
            alignItems='center'
            maxWidth={500}
            mx={'auto'}
            spacing={2}
          >
            <Controller
              name='title'
              control={control}
              render={({ field, fieldState: { error, invalid } }) => (
                <TextField
                  {...field}
                  sx={{ alignSelf: 'stretch' }}
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
                  sx={{ alignSelf: 'stretch' }}
                  label='Автор книги'
                  color='secondary'
                  error={invalid}
                  helperText={error?.message || null}
                  variant='outlined'
                />
              )}
            />

            <LoadingButton
              sx={{ alignSelf: 'center' }}
              type='submit'
              size='large'
              startIcon={<Save />}
              loading={loading}
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

export default AddBookForm;
