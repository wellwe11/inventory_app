import type { Request, Response } from "express";
import { getMovie } from "../../DB/Queries/getMovie.js";

// for tomorrow: fix the POST form inside of movie.ejs.
// It should link to id.
// Also fix all inputs etc.
// Submit and inputs should only be enabled if user has clicked edit.

const movieGet = async (req: Request, res: Response) => {
  const movieId = req.query.id;
  const editMode = req.query.edit;

  const movieObj = await getMovie(movieId);

  const { id, title, src, year, director_name, director_id, genre_list } =
    movieObj[0];

  res.render("movie", {
    id,
    title,
    src,
    year,
    director_name,
    director_id,
    genre_list,
    editMode,
  });
};

export default movieGet;
