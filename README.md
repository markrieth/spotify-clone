# Atticus Engineering Assignemnt
Final submission for the Atticus assignment. Run with `yarn start` and visit localhost:4000 to start exploring.
Test the code by running `yarn test`.

Some pre-populated songs have ids: `1,2,3`. By searching for those in the playground, you can start exploring.

## Source Code
The source can be found in the /src directory. The code is generally organized by domain, e.g. Song, Playlist, Album, etc.
Tests are kept close to the source code files. There are only two tests as a demonstration of how they would work, but an 
imporovement would be to expand test coverage and to include integration tests.


## Architectural Schema

- GraphQL was chosen over ReST. 
- The schema file can be found in the /src directory at `schema.ts`.
I used code generating tools to create typescript types based on the introspected schema. This ensures that the
source code is working with types that Apollo Server will generate based on incoming requests. 

An important file, `schema.prisma`, is unique to using Prisma as a tool to manage migrations. This file is located at 
`/prisma/schema.prisma`. The database tables are derived from that file. 

Database Notes:
- SQLite was used for demo purposes.
- Prisma library was used as a tool for database migrations. See https://prisma.io for more info. 
- A song has an attribute genre as a string. This could possibly be an Enum. For now, it is a string for flexibility. 
- An index was created on Song.genre since we'll be searching by genre.


## Brief Documentation 

### Requirements
Assumptions: 
We have a set of songs already created to pre-populate our system. 

Core:
1. As a listener, I want to retrieve a song, so that I can listen to it. 
2. As a listener, I want to retrieve a list of songs filtered by genre or album, so that I can play a collection of related songs.
3. As a listener, I want to create a playlist of songs, so that I can define a custom collection of songs across different genres and albums. 

Nice-to-haves:
4. As an artist, I want to create albums of songs, so that my listeners can retrieve and listen to them.

### A Roadmap
Some issues to consider would be error handling and authentication. If a song doesn't exist, should the api return null,
or should it return an error? 
