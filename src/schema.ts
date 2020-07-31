import { gql } from "apollo-server";

const schema = gql`
  schema {
    query: Query
  }

  type Query {
    song(id: String!): Song
    songs(genre: String!): [Song!]!
  }
  
  type Mutation {
    createPlaylist(songIds: [String!]!, title: String!): Playlist!
  }
  
  type Song {
    id: ID!
    title: String!
    contentUrl:  String!
    album: Album
    genre: String
  }
  
  type Album {
    id: ID!
    title: String!
    songs: [Song!]!
  }
  
  type Playlist {
    id: ID!
    title: String!
    songs: [Song!]!
  }
`

export default schema;