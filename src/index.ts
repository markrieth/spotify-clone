import { PrismaClient} from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import SongAPI from './Song/datasource';
import schema from './schema';
import { DataSources } from './types';
import PlaylistAPI from './Playlist/dataSources';

// Initialize our ORM
const store = new PrismaClient();

// set up any dataSources our resolvers need
const dataSources = (): DataSources => ({
  songAPI: new SongAPI({ store }),
  playlistAPI: new PlaylistAPI({ store })
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
  dataSources,
  engine: false
});

const port = 4000;

// Start up the server
server.listen(
  { port },
  () => console.log(`🚀 app running at http://localhost:${port}${server.graphqlPath}`)
);
