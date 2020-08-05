/* eslint-disable */
import { Playlist } from '@prisma/client';
import EntityNotFoundError from '../../Error/EntityNotFoundError';
import PlaylistAPI, { CreateInput } from '../datasource';

const mockStore = {
  playlist: {
    create: jest.fn()
  }
};

// @ts-ignore
const playlistAPI = new PlaylistAPI({ store: mockStore });

describe('PlaylistAPI.create', () => {
  it('Makes the correct query and returns the playlist created', async () => {
    const mockPlaylist: Playlist = {
      id: '4',
      title: 'foo'
    };
    const mockCreateInput: CreateInput = {
      title: 'foo',
      songIds: ['x','y']
    };

    mockStore.playlist.create.mockResolvedValueOnce(mockPlaylist);

    const actual = await playlistAPI.create(mockCreateInput);
    // Check that create is called with the correct args
    expect(mockStore.playlist.create).toBeCalledWith({
      data: {
        title: mockCreateInput.title,
        songs: {
          connect: mockCreateInput.songIds.map(songId => ({ id: songId }))
        }
      }
    });

    // Check that the created playlist is returned
    expect(actual).toMatchObject(mockPlaylist);
  });

});