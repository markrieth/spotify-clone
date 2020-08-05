# Spotify Clone (Backend)
Run with `yarn start` and visit localhost:4000 to start exploring.
Test the code by running `yarn test`.

Some pre-populated songs have ids: `1,2,3`. By searching for those in the playground, you can start exploring.

## Source Code
The source can be found in the /src directory. The code is generally organized by domain, e.g. Song, Playlist, Album, etc.
Tests are kept close to the source code files. There are only two tests as a demonstration of how they would work, but an 
improvement would be to expand test coverage and to include integration tests.


## Architectural Schema

- The GraphQL schema file can be found in the /src directory at `schema.ts`.
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

## Challenges

####How are various parts of the system notified of events? 
For example, what if an album has a status, which is affected by how many playlists contain songs from the album? 
We could:
 - Have a pub/sub system in place and push a notification that a playlist was created. 
 The Album service can listen for this event, and update its status based on that. 
 - Have the business logic for determining an album's status inside the resolver. The resolver for 
 `status` is responsible for fetching the data it needs to determine the status. 
 We wouldn't have to worry about updating the status as a result of any event, because it's a derived piece of data.
 What performance implications does this have? How do we handle caching? What if later on,
 artists want to be notified when their album changes status? Would the resolver also be responsible
 for determining and notifying a status change?
 
#### How do we handle breaking schema changes?
For example, what if songs can exist without albums? How do we ensure that we don't break our client's code.
 - In a RESTful API, we could come out with different versions every few months. Every few years, the oldest
 versions can be no longer maintained. 
 - If we have full control over the client, we can check that current version of the client
 is compatible with the latest version of the graph before deploying the graph. Using cache-busting
 techniques on the client will ensure that all users are on the latest version. 
 - If we don't, we can create a new type and mark the old one as @deprecated. See [Shopify's MoneyV2 object](https://shopify.dev/docs/admin-api/graphql/reference/object/moneyv2?api[version]=2020-01)
 

## Additional Resources
[Shopify GraphQL Rules](https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md
)
1. Always start with a high-level view of the objects and their relationships before you deal with specific fields.
2. Never expose implementation details in your API design.
3. Design your API around the business domain, not the implementation, user-interface, or legacy APIs.
4. It’s easier to add fields than to remove them.
5. Major business-object types should always implement Node.
6. Group closely-related fields together into subobjects.
7. Always check whether list fields should be paginated or not.
8. Always use object references instead of ID fields.
9. Choose field names based on what makes sense, not based on the implementation or what the field is called in legacy APIs.
10. Use custom scalar types when you’re exposing something with specific semantic value.
11. Use enums for fields which can only take a specific set of values.
12. The API should provide business logic, not just data. Complex calculations should be done on the server, in one place, not on the client, in many places.
13. Provide the raw data too, even when there’s business logic around it.
14. Write separate mutations for separate logical actions on a resource.
15. Mutating relationships is really complicated and not easily summarized into a snappy rule.
16. When writing separate mutations for relationships, consider whether it would be useful for the mutations to operate on multiple elements at once.
17. Prefix mutation names with the object they are mutating for alphabetical grouping (e.g. use orderCancel instead of cancelOrder).
18. Only make input fields required if they're actually semantically required for the mutation to proceed.
19. Use weaker types for inputs (e.g. String instead of Email) when the format is unambiguous and client-side validation is complex. This lets the server run all non-trivial validations at once and return the errors in a single place in a single format, simplifying the client.
20. Use stronger types for inputs (e.g. DateTime instead of String) when the format may be ambiguous and client-side validation is simple. This provides clarity and encourages clients to use stricter input controls (e.g. a date-picker widget instead of a free-text field).
21. Structure mutation inputs to reduce duplication, even if this requires relaxing requiredness constraints on certain fields.
22. Mutations should provide user/business-level errors via a userErrors field on the mutation payload. The top-level query errors entry is reserved for client and server-level errors.
23. Most payload fields for a mutation should be nullable, unless there is really a value to return in every possible error case.

[GraphQL Official Best Practices](https://graphql.org/learn/best-practices/#versioning)

[Principled GraphQL](https://principledgraphql.com/)

