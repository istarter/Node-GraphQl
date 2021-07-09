import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

// import express
const app = express();

// writing queries and mutions here.
const schema = gql`
  type Query {
    name: String
    class: String
    students: [Student]
    findStudent(sid: ID!): Student
  }
  type Student {
    name: String
    id: ID
  }
`;

// Global array object
const studenList = [
  { name: "Mohsin", id: 1 },
  { name: "Fahad", id: 2 },
  { name: "Kabir", id: 3 },
  { name: "Safi", id: 4 },
];
// Query that get argument and return something query name findStudent.

const resolvers = {
  Query: {
    name: () => {
      return "Najib";
    },
    class: () => {
      return "BSCS";
    },
    students: () => {
      return studenList;
    },
    findStudent: (_, args) => {
      const result = studenList.find((stdObj) => {
        return stdObj.id == args.sid;
      });
      return result;
    },
  },
};

// Get schema and resolver
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

// url for the graphlql, end point
server.applyMiddleware({ app, path: "/graphql" });

// listen the server in port 8000.
app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});
