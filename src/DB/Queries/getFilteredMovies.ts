import pool from "../pool/pool.js";

export const getFilteredMovies = async (genres, years) => {
  const mappedGenres = genres.map((g) => g.id);

  const filteredMovies = await pool.query(
    `
    SELECT * FROM movies
    WHERE year BETWEEN $1 AND $2
    AND id IN (
      SELECT movie_id FROM movie_genres WHERE genre_id = ANY($3)  
    );
    `,
    [years[0], years[1], mappedGenres],
  );

  return filteredMovies.rows;
};
