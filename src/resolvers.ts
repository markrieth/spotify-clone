import { DataSources } from './types';
import {
  Album,
  Mutation,
  MutationCreatePlaylistArgs,
  Query,
  QuerySongArgs,
  QuerySongsArgs,
  Song,
} from './__generated__/types';

const resolvers = {
  Query: {
    song: async (
      parent: any,
      { id }: QuerySongArgs,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Partial<Query['song']>> => {
      return dataSources.songAPI.find(id);
    },
    songs: async (
      parent: any,
      { genre }: QuerySongsArgs,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Partial<Query['songs']>> => {
      return dataSources.songAPI.list(genre)
    },

  },
  Mutation: {
    createPlaylist: async (
      parent: any,
      args: MutationCreatePlaylistArgs,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Partial<Mutation['createPlaylist']>> => {
      return dataSources.playlistAPI.create({
        title: args.title,
        songIds: args.songIds
      })
    }
  },
  Song: {
    album: async (
      song: Song,
      args: null,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Partial<Album>> => {
      if (song.album) {
        return song.album;
      }
      return dataSources.songAPI.findAlbum(song.id);
    }
  }
};

export default resolvers;
