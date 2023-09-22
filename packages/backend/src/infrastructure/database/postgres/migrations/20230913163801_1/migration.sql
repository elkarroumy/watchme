-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "runtime" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "ageRate" INTEGER NOT NULL,
    "originalLanguage" TEXT NOT NULL,
    "budget" BIGINT NOT NULL,
    "revenue" BIGINT NOT NULL,
    "reviewId" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movie_reviewId_key" ON "Movie"("reviewId");

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;
