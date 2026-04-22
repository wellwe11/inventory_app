import pool from "../pool/pool.js";

export const getFilteredMovies = async (genres, years) => {
  const mappedGenres = genres.map((g) => g.id);

  const filteredMovies = await pool.query(
    `SELECT DISTINCT * FROM movies
    JOIN movie_genres ON movies.id = movie_genres.movie_id
    JOIN genres ON movie_genres.genre_id = genres.id
    WHERE year BETWEEN $1 AND $2
    AND genres.id = ANY($3);
    `,
    [years[0], years[1], mappedGenres],
  );

  return filteredMovies.rows;
};
