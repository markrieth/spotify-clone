import { DataSources } from './types';
import {
  Album,
  Mutation,
  MutationCreatePlaylistArgs,
  Query,
  QuerySongArgs,
  QuerySongsArgs,
  Song
} from './__generated__/types';

export default {
  Query: {
    song: async (
      _root: any,
      { id }: QuerySongArgs,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Query['song']> => {
      return dataSources.songAPI.findSong(id);
    },
    songs: async (
      _root: any,
      { genre }: QuerySongsArgs,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Query['songs']> => {
      return dataSources.songAPI.listSongs(genre)
    },
  },
  Mutation: {
    createPlaylist: async (
      _root: any,
      args: MutationCreatePlaylistArgs,
      { dataSources }: { dataSources: DataSources }
    ): Promise<Mutation['createPlaylist']> => {
      return dataSources.playlistAPI.create({
        title: args.title,
        songIds: args.songIds
      })
    }
  },
  Song: {
    album: async (
      song: Song,
      _args: any,
      { dataSources }: { dataSources: DataSources }
    ): Promise<any> => {
      if (song.album) {
        return song.album;
      }
      return dataSources.songAPI.findAlbum(song.id);
    }
  }
};
