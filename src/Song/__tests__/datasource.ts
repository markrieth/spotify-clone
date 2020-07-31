import SongAPI from '../datasource';
import { Song } from '@prisma/client';

const mockStore = {
  song: {
    findOne: jest.fn()
  }
};

// TODO: Remove the @ts-ignore flag. For the sake of demonstrating the test, keep it in temporarily.
// @ts-ignore
const dataSource = new SongAPI({ store: mockStore });

describe('SongAPI.findSong', () => {
  it('Makes the correct query and returns the result of the query', async () => {
    const mockSong: Song = {
      id: '4',
      title: 'foo',
      contentUrl: 'bar',
      albumId: '1',
      genre: 'baz'
    };
    mockStore.song.findOne.mockResolvedValueOnce(mockSong);

    const actual = await dataSource.findSong(2);
    // Check that findOne is called with the correct parameters
    expect(mockStore.song.findOne).toBeCalledWith({ where: { id: 2 } });

    // Check that findSong returns the result of searching the database
    expect(actual).toMatchObject(mockSong);
  });
});