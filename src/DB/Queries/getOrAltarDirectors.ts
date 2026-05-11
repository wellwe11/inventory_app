import pool from "../pool/pool.js";

export const getOrAltarDirectors = async (director_name) => {
  // Compare if name is actually the same. Lets say user writes ALfred Hitchcock instead of Alfred

  const { rows } = await pool.query(
    `
        INSERT INTO directors (name)
        VALUES ($1)
        ON CONFLICT (LOWER(name))
        DO UPDATE SET name = EXCLUDED.name
        RETURNING id;
        `,
    [director_name],
  );

  return rows;
};
