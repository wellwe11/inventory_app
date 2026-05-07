import pool from "../pool/pool.js";

export const getAllMovies = async () => {
  const { rows } = await pool.query(
    `
    SELECT 
      m.*,
      json_agg(g) FILTER (WHERE g.id IS NOT NULL) AS genre_list
    FROM movies m
    LEFT JOIN movie_genres mg ON m.id = mg.movie_id
    LEFT JOIN genres g ON mg.genre_id = g.id
    GROUP BY m.id;
    `,
  );

  return rows;
};
