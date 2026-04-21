import pool from "../pool/pool.js";

export const getFilteredMovies = async (genres, years) => {
  // console.log(genres, years);
  const filteredMovies = await pool.query(
    `SELECT * FROM movies
    WHERE year BETWEEN $1 AND $2`,
    [years[0], years[1]],
  );

  return filteredMovies.rows;
};
