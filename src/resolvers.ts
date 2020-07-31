import { DataSources } from './types';
import { Query, QuerySongArgs } from './__generated__/types';

export default {
  Query: {
    song: async (
      _root: any,
      { id }: QuerySongArgs,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Query['song']> => {
      return dataSources.songAPI.findSong(id);
    }
  },
  Song: {

  }
};
