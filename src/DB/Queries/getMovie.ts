import pool from "../pool/pool.js";

export const getMovie = async (id) => {
  const { rows } = await pool.query(
    `
    SELECT movies.*,
    directors.name AS director_name,
    json_agg(genres) FILTER (WHERE genres.id IS NOT NULL) AS genre_list
    FROM movies
    LEFT JOIN movie_genres ON movies.id = movie_genres.movie_id
    LEFT JOIN genres ON movie_genres.genre_id = genres.id
    LEFT JOIN directors ON movies.director_id = directors.id
    WHERE movies.id = $1
    GROUP BY movies.id, directors.id;
    `,
    [id],
  );

  return rows;
};
