import App from 'next/app';
import fetch from 'node-fetch';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { getCurrentUser } from '../lib/';
import getConfig from 'next/config';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../stylesheets/board-column.scss';
import '../stylesheets/boards.scss';
import '../stylesheets/navbar.scss';
import '../stylesheets/task-card.scss';
import 'semantic-ui-css/semantic.min.css'

function MyApp({
  Component,
  pageProps,
}) {

  const { publicRuntimeConfig } = getConfig();
  const { REACT_APP_GRAPHQL_URL } = publicRuntimeConfig;
  const httpLink = createHttpLink({
    uri: REACT_APP_GRAPHQL_URL,
    fetch
  });
  
  const cache = new InMemoryCache({
    addTypename: false,
  });
  
  const authLink = setContext(async (_, { headers }) => {
  
    const userData: any = await getCurrentUser();

    // get the authentication token from local storage if it exists
    let token = userData.xa;
  
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink), 
    cache,
  
  });

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  )
}

export default MyApp;