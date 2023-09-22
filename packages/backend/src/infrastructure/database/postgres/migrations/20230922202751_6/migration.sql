-- CreateTable
CREATE TABLE "Logs" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "timestamp" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,

    CONSTRAINT "Logs_pkey" PRIMARY KEY ("id")
);
