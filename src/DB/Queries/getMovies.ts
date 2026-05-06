import pool from "../pool/pool.js";

export const getAllMovies = async () => {
  const { rows } = await pool.query(
    `
    SELECT 
      m.*,
      json_agg(g) AS genre_list
    FROM movies m
    JOIN movie_genres mg ON m.id = mg.movie_id
    JOIN genres g ON mg.genre_id = g.id
    GROUP BY m.id;
    `,
  );

  return rows;
};
