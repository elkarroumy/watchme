CREATE TABLE Movie (
    id TEXT NOT NULL,
    added_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    overview TEXT NOT NULL,
    release_date TIMESTAMP(3) NOT NULL,
    time INTEGER NOT NULL,
    country TEXT NOT NULL,
    authors TEXT NOT NULL,
    genre TEXT NOT NULL,
    ageRate INTEGER NOT NULL,
    original_language TEXT NOT NULL,
    budget BIGINT NOT NULL,
    revenue BIGINT NOT NULL,
    review_id TEXT IS NULL,

    CONSTRAINT Movie_pkey PRIMARY KEY (id)
);
