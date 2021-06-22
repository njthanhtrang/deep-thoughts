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
// retrieve token from localStorage and include with each request to API
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

// establish new link to GraphQL server at /graphql endpoint
const httpLink = createHttpLink({
  // absolute path to server, uniform resource identifier
  // uri: "http://localhost:3001/graphql"
  uri: "/graphql",
});

// omit first param (current request obj) in case fx is running after we've initiated request
const authLink = setContext((_, { headers }) => {
  // retrieve token from localStorage
  const token = localStorage.getItem("id_token");
  return {
    // set HTTP request headers of every request to include token
    // whether request needs or not, if doesn't need token, server-side resolver won't check for it
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// instantiate ApolloClient instance, create connection to API endpoint
const client = new ApolloClient({
  // combine authLink and httpLink obj so
  // every request retrieves token and sets request headers before making request to API
  link: authLink.concat(httpLink),
  // instantiate new cache obj
  cache: new InMemoryCache(),
});

function App() {
  return (
    // pass in client variable as value for client prop in provider
    // everything between ApolloProvider tags have access to server's API data through client
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />

              {/* if route doesn't match preceding paths, 404 message */}
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
