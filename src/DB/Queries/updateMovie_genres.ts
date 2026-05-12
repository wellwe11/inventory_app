import pool from "../pool/pool.js";

export const updateMovie_genres = async (movieId, genres) => {
  console.log(movieId, genres);
  await pool.query(
    `
        DELETE FROM movie_genres
            WHERE movie_id = ($1)
        `,
    [movieId],
  );

  if (genres) {
    for (const genreId of genres) {
      await pool.query(
        `
              INSERT INTO movie_genres (movie_id, genre_id)
              VALUES ($1, (SELECT id FROM genres WHERE id = $2))
              `,
        [movieId, genreId],
      );
    }
  }
};
