import resolvers from '../resolvers';
import SongAPI from '../Song/datasource';
import { mocked } from 'ts-jest/utils';
import { QuerySongArgs, Song } from '../__generated__/types';

jest.mock('../Song/datasource');

// Mocking datasources in this way ensures that our tests will fail if
// the mocked return values no longer conform to what the actual function
// is typed to return.
const mockDataSources = {
  // Ignore passing a null store
  // @ts-ignore
  songAPI: mocked(new SongAPI({ store: null }), true)
};


describe('[Query.song]', () => {
  it('should return the song when it exists', async () => {
    const mockOutput: Song = {
      id: '4',
      title: 'foo',
      genre: 'baz',
      contentUrl: 'test'
    };
    mockDataSources.songAPI.findSong.mockResolvedValueOnce(mockOutput);
    const mockInput: QuerySongArgs = { id: '4' };
    const mockContext = { dataSources: mockDataSources };
    const result = await resolvers.Query.song(null, mockInput, mockContext);

    // Check that the song was returned
    expect(result).toMatchObject(mockOutput);

    // Check that songAPI was called correctly
    expect(mockDataSources.songAPI.findSong).toBeCalledWith(mockInput.id);
  });

  test.todo('Define error cases and test what happens there');
});