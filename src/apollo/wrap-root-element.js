import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import {AppProvider} from '../context/AppContext';

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <AppProvider>
      {element}
    </AppProvider>
    </ApolloProvider>
);