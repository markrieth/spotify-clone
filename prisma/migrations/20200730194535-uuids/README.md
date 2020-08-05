# Migration `20200730194535-uuids`

This migration has been generated by markrieth at 7/30/2020, 7:45:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "new_Song" (
"id" TEXT NOT NULL,
"title" TEXT NOT NULL,
"contentUrl" TEXT NOT NULL,
"albumId" TEXT NOT NULL,
"genre" TEXT ,
PRIMARY KEY ("id"),
FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO "new_Song" ("id", "title", "contentUrl", "albumId", "genre") SELECT "id", "title", "contentUrl", "albumId", "genre" FROM "Song"

PRAGMA foreign_keys=off;
DROP TABLE "Song";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Song" RENAME TO "Song";

CREATE TABLE "new_Artist" (
"id" TEXT NOT NULL,
"name" TEXT NOT NULL,
PRIMARY KEY ("id"))

INSERT INTO "new_Artist" ("id", "name") SELECT "id", "name" FROM "Artist"

PRAGMA foreign_keys=off;
DROP TABLE "Artist";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Artist" RENAME TO "Artist";

CREATE TABLE "new_Album" (
"id" TEXT NOT NULL,
"artistId" TEXT NOT NULL,
PRIMARY KEY ("id"),
FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO "new_Album" ("id", "artistId") SELECT "id", "artistId" FROM "Album"

PRAGMA foreign_keys=off;
DROP TABLE "Album";;
PRAGMA foreign_keys=on

ALTER TABLE "new_Album" RENAME TO "Album";

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200730182414-add-genre..20200730194535-uuids
--- datamodel.dml
+++ datamodel.dml
@@ -1,30 +1,30 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Song {
-  id          Int     @id @default(autoincrement())
+  id          String     @id @default(uuid())
   title       String
   contentUrl  String
-  albumId     Int
+  albumId     String
   genre       String?
   album       Album  @relation(fields: [albumId], references: [id])
 }
 model Artist {
-  id          Int     @id @default(autoincrement())
+  id          String     @id @default(uuid())
   name        String
   albums      Album[]
 }
 model Album {
-  id          Int     @id @default(autoincrement())
-  artistId    Int
-  artist      Artist  @relation(fields: [artistId], references: [id])
+  id          String     @id @default(uuid())
+  artistId    String
+  artist      Artist     @relation(fields: [artistId], references: [id])
   songs       Song[]
 }
```

