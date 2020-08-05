/* eslint-disable */
import resolvers from '../resolvers';
import SongAPI from '../Song/datasource';
import { mocked } from 'ts-jest/utils';
import { MutationCreatePlaylistArgs, QuerySongArgs, Song } from '../__generated__/types';
import PlaylistAPI from '../Playlist/datasource';

jest.mock('../Song/datasource');
jest.mock('../Playlist/datasource');

// Mocking datasources in this way ensures that our tests will fail if
// the mocked return values no longer conform to what the actual function
// is typed to return.
const mockDataSources = {
  // Ignore passing a null store
  // @ts-ignore
  songAPI: mocked(new SongAPI({ store: null }), true),
  // @ts-ignore
  playlistAPI: mocked(new PlaylistAPI({ store: null }), true)
};


describe('[Query.song]', () => {
  it('should return the song when it exists', async () => {
    const mockOutput: Song = {
      id: '4',
      title: 'foo',
      genre: 'baz',
      contentUrl: 'test'
    };
    mockDataSources.songAPI.find.mockResolvedValueOnce(mockOutput);
    const mockInput: QuerySongArgs = { id: '4' };
    const mockContext = { dataSources: mockDataSources };
    const result = await resolvers.Query.song(null, mockInput, mockContext);

    // Check that the song was returned
    expect(result).toMatchObject(mockOutput);

    // Check that songAPI was called correctly
    expect(mockDataSources.songAPI.find).toBeCalledWith(mockInput.id);
  });

  test.todo('Define error cases and test what happens there');
});

describe('[Mutation.createPlaylist]', () => {
  it('should call PlaylistAPI.create with the correct args and returns the result', async () => {

    const mockInput: MutationCreatePlaylistArgs = {
      title: 'foo',
      songIds: []
    };
    const mockOutput = {
      id: 'x',
      title: 'foo',
    };
    const mockContext = { dataSources: mockDataSources };
    mockContext.dataSources.playlistAPI.create.mockResolvedValueOnce(mockOutput);
    const result = await resolvers.Mutation.createPlaylist(null, mockInput, mockContext);

    // Check that playlistAPI was called correctly
    expect(mockDataSources.playlistAPI.create).toBeCalledWith(mockInput);

    // Check that the result was returned
    expect(result).toMatchObject(mockOutput)
  });

});