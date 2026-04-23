import pool from "../pool/pool.js";

export const getFilteredMovies = async (genres, years) => {
  const mappedGenres = genres.map((g) => g.id);

  const { rows } = await pool.query(
    `
    SELECT 
      m.*,
      json_agg(g.name) AS genre_list
    FROM movies m
    JOIN movie_genres mg ON m.id = mg.movie_id
    JOIN genres g ON mg.genre_id = g.id
    WHERE m.year BETWEEN $1 AND $2
      AND mg.genre_id = ANY($3)
    GROUP BY m.id;
    `,
    [years[0], years[1], mappedGenres],
  );

  return rows;
};
