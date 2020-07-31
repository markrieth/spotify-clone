import SongAPI from './Song/datasource';
import PlaylistAPI from './Playlist/datasource';

export type DataSources = {
  songAPI: SongAPI,
  playlistAPI: PlaylistAPI
}