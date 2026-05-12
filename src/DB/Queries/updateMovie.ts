import pool from "../pool/pool.js";

export const updateMovie = async (id, title, year, director_id, src) => {
  const { rows } = await pool.query(
    `
        UPDATE movies 
        SET title = ($1), year = ($2), director_id = ($3), src = ($4)
        WHERE id = ($5)
        RETURNING *;
        `,
    [title, year, director_id, src, id],
  );

  return rows;
};
