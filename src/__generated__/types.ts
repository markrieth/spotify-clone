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
};


export type QuerySongArgs = {
  id: Scalars['String'];
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['ID'];
  title: Scalars['String'];
  contentUrl: Scalars['String'];
  genre?: Maybe<Scalars['String']>;
};

export type CacheControlScope = 
  | 'PUBLIC'
  | 'PRIVATE';

