// import gql tagged template fx, advanced template literal
const { gql } = require("apollo-server-express");

// create typeDefs
const typeDefs = gql`
type Query {
    helloWorld: String
}
`;

// export typeDefs
module.exports = typeDefs;