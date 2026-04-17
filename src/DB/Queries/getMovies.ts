import pool from "../pool/pool.js";

export const getAllMovies = async () => {
  const { rows } = await pool.query("SELECT * FROM movies");

  return rows;
};
