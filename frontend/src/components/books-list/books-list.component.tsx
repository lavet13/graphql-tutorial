import { FC, UIEvent } from 'react';

import {
  Alert,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
} from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import { GenericCardActionArea } from '../button/button.component';

import { Link } from 'react-router-dom';

import { GetBooksQuery } from '../../__generated/graphql';

type BooksListProps = {
  data?: GetBooksQuery;
  fetchMore: () => Promise<void>;
  isLoading: boolean;
};

const BooksList: FC<BooksListProps> = ({ data, fetchMore, isLoading }) => {
  const handleNextFetchOnScroll = (
    { currentTarget }: UIEvent<HTMLDivElement>,
    fetchMore: () => Promise<void>
  ) => {
    if (
      !isLoading &&
      currentTarget.scrollTop + currentTarget.clientHeight >=
        currentTarget.scrollHeight
    ) {
      fetchMore();
    }
  };

  const handleScroll = (e: UIEvent<HTMLDivElement>) =>
    handleNextFetchOnScroll(e, fetchMore);

  return (
    <Grid
      width={'100%'}
      container
      spacing={2}
      maxHeight={350}
      overflow={'auto'}
      onScroll={handleScroll}
    >
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

      <Box width='100%' visibility={isLoading ? 'visible' : 'hidden'}>
        <LinearProgress />
      </Box>
    </Grid>
  );
};

export default BooksList;
