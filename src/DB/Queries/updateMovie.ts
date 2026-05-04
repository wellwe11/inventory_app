import pool from "../pool/pool.js";
import { getOrAltarDirectors } from "./getOrAltarDirectors.js";

export const updateMovie = async (id, title, year, director_name, genres) => {
  // check if director has changed
  // If it has, update directors.
  // Find matching directors name.
  // If found:
  //   return director_id & add it to the update-movies query
  // If not found:
  //   return the new id and add it to the query

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
