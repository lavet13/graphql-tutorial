import { FC } from 'react';

import { Alert, Card, CardContent, Typography } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { GenericCardActionArea } from '../button/button.component';

import { Link } from 'react-router-dom';

import { GetBooksQuery } from '../../__generated/graphql';

type BooksListProps = { data?: GetBooksQuery };

const BooksList: FC<BooksListProps> = ({ data }) => {
  return (
    <Grid width={'100%'} container spacing={2}>
      {data?.books?.length !== 0 ? (
        data?.books?.map(book => (
          <Grid key={book?.id} xs={12} sm={6} md={4}>
            <Card>
              <GenericCardActionArea component={Link} to={`book/${book?.id}`}>
                <CardContent>
                  <Typography variant='h5'>{book?.title}</Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {book?.author}
                  </Typography>
                </CardContent>
              </GenericCardActionArea>
            </Card>
          </Grid>
        ))
      ) : (
        <Alert severity='info'>No books to be found, MegaLuL :(</Alert>
      )}
    </Grid>
  );
};

export default BooksList;
