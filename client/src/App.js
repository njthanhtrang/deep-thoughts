import React from "react";
// ApolloProvider-- React component provides data to other components
// ApolloClient-- constructor fx initializes connection to GraphQL API server
// InMemoryCache-- enables ApolloClient instance to cache API response data so we can request more efficiently
// createHttpLink-- control how ApolloClient makes request (middleware for outbound network request)
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

// establish new link to GraphQL server at /graphql endpoint
const httpLink = createHttpLink({
  // absolute path to server, uniform resource identifier
  // uri: "http://localhost:3001/graphql"
  uri: "/graphql",
});

// instantiate ApolloClient instance, create connection to API endpoint
const client = new ApolloClient({
  link: httpLink,
  // instantiate new cache obj
  cache: new InMemoryCache(),
});

function App() {
  return (
    // pass in client variable as value for client prop in provider
    // everything between ApolloProvider tags have access to server's API data through client
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
