import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App'; // Import your main App component

// Create the ApolloClient instance and pass the GraphQL endpoint URL
const client = new ApolloClient({
  uri: 'https://nx9zvp49q7.lp.gql.zone/graphql', // The GraphQL endpoint URL
});

// Wrap your main App component in the ApolloProvider
const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App /> {/* Your main App component */}
  </ApolloProvider>
);

// Render the ApolloProvider-wrapped App to the DOM
render(ApolloApp(), document.getElementById('root'));
