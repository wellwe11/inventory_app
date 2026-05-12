import pool from "../pool/pool.js";

export const addMovie = async (title, year, director_id, src) => {
  const { rows } = await pool.query(
    `
        INSERT INTO     movies (title, year, director_id, src)
        VALUES          ($1, $2, $3, $4)
        ON CONFLICT     ((LOWER(title)))
        DO NOTHING
        RETURNING       *;
        `,
    [title, year, director_id, src],
  );

  return rows;
};
