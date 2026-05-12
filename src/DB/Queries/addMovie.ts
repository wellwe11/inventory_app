import pool from "../pool/pool.js";

export const addMovie = async (title) => {
  const { rows } = await pool.query(
    `
        INSERT INTO     movies (title)
        VALUES          ($1)
        ON CONFLICT     ((LOWER(title)))
        DO NOTHING
        RETURNING       *;
        `,
    [title],
  );

  return rows;
};
