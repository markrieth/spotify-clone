import { PrismaClient, Song, Album } from '@prisma/client';
import { DataSource } from 'apollo-datasource';
import { ApolloError } from 'apollo-server';

/**
 * This example may seem superficial, but it acts as a layer of abstraction for our
 * resolvers to tap into. For example, if we used different methods to grab our data,
 * like from a cache or from a REST api, that logic would be housed in these functions.
 * The resolves could remain unchanged in that case.
 */
class SongAPI extends DataSource {
  private store: PrismaClient;
  constructor({ store }: { store: PrismaClient }) {
    super();
    this.store = store;
  }

  // Todo: consider throwing an error when the record does not exist
  async findSong(id: string): Promise<Song | null> {
    return this.store.song.findOne({ where: { id } });
  }

  async findAlbum(songId: string): Promise<Album> {
    const song = await this.store.song.findOne({
      where: { id: songId },
      select: { album: true }
    });
    if (!song) {
      throw new ApolloError('Could not find song: ' + songId)
    }
    return song.album;
  }

  async listSongs(genre: string): Promise<Array<Song>> {
    return this.store.song.findMany({ where: { genre } });
  }
}

export default SongAPI;