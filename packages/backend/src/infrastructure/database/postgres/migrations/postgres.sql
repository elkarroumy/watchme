CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "time" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "ageRate" INTEGER NOT NULL,
    "originalLanguage" TEXT NOT NULL,
    "budget" BIGINT NOT NULL,
    "revenue" BIGINT NOT NULL,
    "reviewId" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
