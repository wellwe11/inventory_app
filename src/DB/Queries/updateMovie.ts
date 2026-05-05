import pool from "../pool/pool.js";
import { getOrAltarDirectors } from "./getOrAltarDirectors.js";

export const updateMovie = async (id, title, year, director_name, genres) => {
  const directorRows = await getOrAltarDirectors(director_name);

  const { rows } = await pool.query(
    `
        UPDATE movies 
        SET title = ($1), year = ($2), director_id = ($3)
        WHERE id = ($4)
        RETURNING *;
        `,
    [title, year, directorRows[0].id, id],
  );

  return rows;
};
