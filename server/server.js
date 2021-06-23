const express = require('express');
const path = require("path");
// import ApolloServer
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");

// impirt typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
// create new Apollo server and pass in schema data
// so they know what API looks like and how it resolves requests
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // headers come back as context to resolvers
  // context: ({ req }) => req.headers
  // every request performs auth check, updated req obj passed to resolvers as context
  context: authMiddleware
});

// integrate Apollo server with Express app as middleware
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets, see if Node env is in production
if (process.env.NODE_ENV === "production") {
  // serve any files in build directory in client folder
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/serviceWorker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "serviceWorker.js"));
});

// wild GET route for server, no explicit route defined, respond with prod-ready React front-end code
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// listen for connection, start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to ttest GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
