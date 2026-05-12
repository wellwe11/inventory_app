import { Client } from "pg";
import "dotenv/config";

import moviesData from "../../../public/movies_data.json" with { type: "json" };
import directorsData from "../../../public/directors_data.json" with { type: "json" };
import genresData from "../../../public/genres_data.json" with { type: "json" };

// Seed tables-query

const SQL = `
CREATE TABLE IF NOT EXISTS directors (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR( 255 ),
        born INTEGER,
        deceased INTEGER,
        country VARCHAR ( 400 )
    );

CREATE UNIQUE INDEX  IF NOT EXISTS idx_directors_name_lower 
        ON directors (LOWER(name));


CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        director_id INTEGER REFERENCES directors(id),
        title VARCHAR ( 500 ),
        src VARCHAR ( 500 ),
        year INTEGER
    );

CREATE UNIQUE INDEX IF NOT EXISTS idx_movies_lower 
        ON movies (LOWER(title));

CREATE TABLE IF NOT EXISTS genres (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR( 100 ) UNIQUE
    );

CREATE TABLE IF NOT EXISTS movie_genres (
        movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
        genre_id INTEGER REFERENCES genres(id) ON DELETE CASCADE,
        PRIMARY KEY (movie_id, genre_id)
    );
`;

// Populate list of directors from the director-query. We can later retrieve the directors id to associate it to the movie
const seedDirectors = async (directorList, client) => {
  console.log("Seeding directors");
  for (const director of directorList) {
    const q = `
                INSERT INTO directors (name, born, deceased, country)
                VALUES ($1, $2, $3, $4)`;
    await client.query(q, [
      director.name,
      +director.born,
      +director.deceased,
      director.country,
    ]);
  }
};

// Same goes here. We create a list for each genre, so we can later associate it to a specific movie
const seedGenres = async (genreList, client) => {
  console.log("Seeding genres");
  for (const genre of genreList) {
    try {
      const q = `
        INSERT INTO genres (name)
        VALUES ($1)`;
      await client.query(q, [genre.name]);
    } catch (err) {
      console.error("Failed seeding genres:", err.message);
    }
  }
};

// Goes through directors, movies and genres. Does this so we can get a link between these three tables, with matching id's to easily retrieve the data
const seedMovies = async (movieList, client) => {
  console.log("Seeding movies");
  for (const movie of movieList) {
    try {
      // Find specific director for movie
      const directorRes = await client.query(
        `SELECT id FROM directors WHERE name = $1`,
        [movie.director_name],
      );

      if (directorRes.rows.length === 0) {
        console.error(
          `Skipping ${movie.name}: Director "${movie.director_name}"`,
        );
        continue;
      }

      // Retrieve id
      const directorid = directorRes.rows[0].id;

      // Seed movie-list with movie-info together with directorId
      const movieRes = await client.query(
        `INSERT INTO movies (director_id, title, src, year)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [directorid, movie.name, movie.src, +movie.year],
      );

      const movieId = movieRes.rows[0].id;

      for (const genreName of movie.genres) {
        await client.query(
          `INSERT INTO movie_genres (movie_id, genre_id)
            VALUES ($1, (SELECT id FROM genres WHERE name = $2))`,
          [movieId, genreName],
        );
      }
    } catch (err) {
      console.error(`Error seeding ${movie.name}:`, err.message);
    }
  }
};

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
  });

  console.log(client);
  await client.connect();

  await client.query(SQL);
  await seedDirectors(directorsData, client);
  await seedGenres(genresData, client);
  await seedMovies(moviesData, client);

  await client.end();

  console.log("done");
}

main();
