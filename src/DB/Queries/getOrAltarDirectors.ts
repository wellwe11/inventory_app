import pool from "../pool/pool.js";

export const getOrAltarDirectors = async (director_name) => {
  const { rows } = await pool.query(
    `
        INSERT INTO directors (name)
        VALUES ($1)
        ON CONFLICT (name)
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id;
        `,
    [director_name],
  );

  return rows;
};
