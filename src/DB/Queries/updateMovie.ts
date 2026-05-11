import pool from "../pool/pool.js";

export const updateMovie = async (id, title, year, director_id) => {
  const { rows } = await pool.query(
    `
        UPDATE movies 
        SET title = ($1), year = ($2), director_id = ($3)
        WHERE id = ($4)
        RETURNING *;
        `,
    [title, year, director_id, id],
  );

  return rows;
};
