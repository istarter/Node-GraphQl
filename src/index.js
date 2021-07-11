import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { uuid } from "uuidv4";

// import express
const app = express();

// writing queries and mutions here.
const schema = gql`
  type Query {
    whoami: String
    class: String
    students: [Student]
    findStudent(sid: ID!): Student
  }
  type Student {
    name: String
    id: ID
  }
  type Mutation {
    addStudent(name: String!): Student
    deleteStudent(sid: ID!): ID
  }
`;

// Global array object
const studentList = [{ name: "Mohsin", id: 1 }];

// Query that get argument and return something query name findStudent.

const resolvers = {
  Query: {
    whoami: (_, args, { currentStd }) => {
      console.log(currentStd);
      return "Najib";
    },
    class: () => {
      return "BSCS";
    },
    students: () => {
      return studentList;
    },
    findStudent: (_, args) => {
      const result = studentList.find((stdObj) => {
        return stdObj.id == args.sid;
      });
      return result;
    },
  },
  Mutation: {
    addStudent: (_, args) => {
      const lastId = studentList[studentList.length - 1].id;
      const newStudent = {
        name: args.name,
        // id: lastId + 1,
        id: uuid(),
      };
      studentList.push(newStudent);
      return newStudent;
    },
    // deleting user
    deleteStudent: (_, args) => {
      const stdObj = studentList.find((sObj) => sObj.id == args.sid);
      studentList.splice(stdObj.id - 1, 1);
      console.log(studentList);
      return stdObj.id;
    },
  },
};

// Get schema and resolver
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    currentStd: studentList[2],
  },
});

// url for the graphlql, end point
server.applyMiddleware({ app, path: "/graphql" });

// listen the server in port 8000.
app.listen({ port: 8000 }, () => {
  console.log("Apollo Server on http://localhost:8000/graphql");
});
