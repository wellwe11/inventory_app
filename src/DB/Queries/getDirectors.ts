import pool from "../pool/pool.js";

const getDirectors = async (id) => {
  // get director based on ID here
  // Also find all related movies to director

  const { rows } = await pool.query(
    `
    SELECT 
        directors.*,
        directors.name AS director_name,
        json_agg(
            json_build_object(
                'id', m.id,
                'title', m.title,
                'year', m.year,
                'src', m.src,
                'genre_list', (
                    SELECT json_agg(g.name)
                    FROM movie_genres mg
                    JOIN genres g ON mg.genre_id = g.id
                    WHERE mg.movie_id = m.id
                )
            )
        ) AS movie_list
        FROM directors
        JOIN movies m ON directors.id = m.director_id
        WHERE directors.id = $1
        GROUP BY directors.id;
    `,
    [id],
  );

  return rows;
};

export default getDirectors;
