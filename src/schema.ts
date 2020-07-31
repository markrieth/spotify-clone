import { gql } from "apollo-server";

const schema = gql`
  schema {
    query: Query
  }

  type Query {
    song(id: Int!): Song
  }

  type Song {
    id: ID!
    title: String!
    contentUrl:  String!
    genre: String
  }
`

export default schema;