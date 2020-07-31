export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  song?: Maybe<Song>;
  songs: Array<Song>;
};


export type QuerySongArgs = {
  id: Scalars['String'];
};


export type QuerySongsArgs = {
  genre: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPlaylist: Playlist;
};


export type MutationCreatePlaylistArgs = {
  songIds: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['ID'];
  title: Scalars['String'];
  contentUrl: Scalars['String'];
  album?: Maybe<Album>;
  genre?: Maybe<Scalars['String']>;
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['ID'];
  title: Scalars['String'];
  songs: Array<Song>;
};

export type Playlist = {
  __typename?: 'Playlist';
  id: Scalars['ID'];
  title: Scalars['String'];
  songs: Array<Song>;
};

export type CacheControlScope = 
  | 'PUBLIC'
  | 'PRIVATE';

