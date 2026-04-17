import pool from "../pool/pool.js";

export const getAllGenres = async () => {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
};
