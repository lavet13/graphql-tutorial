import { FC } from 'react';

import { Card, CardContent, Typography } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { BooksQuery } from '../../routes/home/home.route';
import { GenericCardActionArea } from '../button/button.component';

import { Link } from 'react-router-dom';

type BooksListProps = { data?: BooksQuery };

const BooksList: FC<BooksListProps> = ({ data }) => {
  return (
    <Grid width={'100%'} container spacing={2}>
      {data?.books.map(book => (
        <Grid key={book.id} xs={12} sm={6} md={4}>
          <Card>
            <GenericCardActionArea component={Link} to={`book/${book.id}`}>
              <CardContent>
                <Typography variant='h5'>{book.title}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {book.author}
                </Typography>
              </CardContent>
            </GenericCardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BooksList;
