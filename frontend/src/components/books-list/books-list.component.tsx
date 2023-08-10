import { FC } from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { BooksQuery } from '../../routes/home/home.route';
import GenericButtonComponent from '../button/button.component';

import { Link } from 'react-router-dom';

type BooksListProps = { data?: BooksQuery };

const BooksList: FC<BooksListProps> = ({ data }) => {
  return (
    <>
      {data?.books.map(book => (
        <Grid key={book.id} xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography variant='h5'>{book.title}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {book.author}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <GenericButtonComponent
                component={Link}
                to={`book/${book.id}`}
                size='small'
                color='primary'
                variant='outlined'
              >
                Узнать больше . . .
              </GenericButtonComponent>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default BooksList;
