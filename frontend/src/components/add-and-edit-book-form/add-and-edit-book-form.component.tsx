import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Book } from '../../routes/home/home.route';
import { BookQuery, GET_BOOK } from '../book-item/book-item.component';

import { CircularProgress, Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

type AddAndEditBookFormParams = {
  id: string;
};

export type DefaultValues = Omit<Book, 'id'>;

const defaultValues: DefaultValues = {
  title: '',
  author: '',
};

const AddAndEditBookForm = () => {
  const { id } = useParams<
    keyof AddAndEditBookFormParams
  >() as AddAndEditBookFormParams;
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<BookQuery>(GET_BOOK, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      const { getBookById } = data;
      if (getBookById && !isAddMode) {
        (Object.keys(defaultValues) as (keyof typeof defaultValues)[]).forEach(
          field => setValue(field, getBookById[field])
        );
      }
    }
  }, [data]);

  const isAddMode = !id;

  const validationSchema: Yup.ObjectSchema<DefaultValues> = Yup.object().shape({
    title: Yup.string()
      .defined()
      .required('Название книги обязательно к заполнению'),
    author: Yup.string()
      .defined()
      .required('Автор книги обязателен к заполнению'),
  });

  const { control, handleSubmit, setValue, formState } = useForm<DefaultValues>(
    { resolver: yupResolver(validationSchema) }
  );

  const { isSubmitting } = formState;

  const addBook = async (data: DefaultValues) => {
    console.log(data);
  };

  const editBook = async (id: string, data: DefaultValues) => {
    console.log(data);
  };

  const onSubmit: SubmitHandler<DefaultValues> = async data => {
    isAddMode ? await addBook(data) : await editBook(id, data);

    navigate('/');
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity='error'>Error message: {error.message}</Alert>
      ) : !data?.getBookById && !isAddMode ? (
        <Alert severity='error'>Error message: Такой книги нет!</Alert>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='title'
            control={control}
            render={({ field, fieldState: { error, invalid } }) => (
              <TextField
                {...field}
                label='Название книги'
                error={invalid}
                helperText={error?.message || null}
                variant='standard'
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
                helperText={error?.message || null}
                variant='standard'
              />
            )}
          />

          <LoadingButton
            type='submit'
            size='small'
            startIcon={<Save />}
            loading={isSubmitting}
            variant='text'
            color='secondary'
          >
            <span>Подтвердить</span>
          </LoadingButton>
        </form>
      )}
    </>
  );
};

export default AddAndEditBookForm;
