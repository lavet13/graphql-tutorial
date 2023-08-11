import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

import { isDialogOpenVar } from './cache.ts';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isDialogOpen: {
            read() {
              return isDialogOpenVar();
            },
          },
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <App />
        </StyledEngineProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
