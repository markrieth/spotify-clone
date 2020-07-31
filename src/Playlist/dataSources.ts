import { PrismaClient, Playlist } from '@prisma/client';
import { DataSource } from 'apollo-datasource';

class PlaylistAPI extends DataSource {
  private store: PrismaClient;
  constructor({ store }: { store: PrismaClient }) {
    super();
    this.store = store;
  }

  async create({ title, songIds }: CreateInput): Promise<Playlist> {
    return this.store.playlist.create({
      data: {
        title,
        songs: {
          connect: songIds.map(songId => ({ id: songId }))
        }
      }
    })
  }
}

export type CreateInput = {
  title: string,
  songIds: Array<string>
}

export default PlaylistAPI;