import { PrismaClient, Song } from '@prisma/client';
import { DataSource } from 'apollo-datasource';

class SongAPI extends DataSource {
  private store: PrismaClient;
  constructor({ store }: { store: PrismaClient }) {
    super();
    this.store = store;
  }

  async findSong(id: string): Promise<Song | null> {
    return this.store.song.findOne({ where: { id } });
  }

}

export default SongAPI;