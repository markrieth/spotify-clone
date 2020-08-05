import { PrismaClient, Song, Album } from '@prisma/client';
import { DataSource } from 'apollo-datasource';
import EntityNotFoundError from '../Error/EntityNotFoundError';

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

  async find(id: string): Promise<Song> {
    const queryArgs = { where: { id } };
    const song = await this.store.song.findOne(queryArgs);
    if (song === null) {
      throw new EntityNotFoundError(
        'Song',
        { invalidArgs: queryArgs.where }
      );
    }
    return song;
  }

  async findAlbum(songId: string): Promise<Album> {
    const queryArgs = {
      where: { id: songId },
      select: { album: true }
    };
    const song = await this.store.song.findOne(queryArgs);
    if (!song) {
      throw new EntityNotFoundError(
        'Song',
        { invalidArgs: queryArgs.where }
      );
    }
    return song.album;
  }

  async list(genre: string): Promise<Array<Song>> {
    return this.store.song.findMany({ where: { genre } });
  }
}

export default SongAPI;