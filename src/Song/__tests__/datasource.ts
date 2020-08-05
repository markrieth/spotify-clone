/* eslint-disable */
import SongAPI from '../datasource';
import { Song } from '@prisma/client';
import EntityNotFoundError from '../../Error/EntityNotFoundError';

const mockStore = {
  song: {
    findOne: jest.fn()
  }
};

// TODO: Remove the @ts-ignore flag. For the sake of demonstrating the test, keep it in temporarily.
// @ts-ignore
const songAPI = new SongAPI({ store: mockStore });

describe('SongAPI.find', () => {
  it('Makes the correct query and returns the result of the query', async () => {
    const mockSong: Song = {
      id: '4',
      title: 'foo',
      contentUrl: 'bar',
      albumId: '1',
      genre: 'baz'
    };
    mockStore.song.findOne.mockResolvedValueOnce(mockSong);

    const actual = await songAPI.find('2');
    // Check that findOne is called with the correct args
    expect(mockStore.song.findOne).toBeCalledWith({ where: { id: '2' } });

    // Check that findSong returns the result of searching the database
    expect(actual).toMatchObject(mockSong);
  });

  it('throws an EntityNotFoundError when the song is not found', async () => {
    const mockSong = null;
    mockStore.song.findOne.mockResolvedValueOnce(mockSong);
    // Check that the error is thrown
    await expect(songAPI.find('2'))
      .rejects
      .toThrow(EntityNotFoundError);
  });
});