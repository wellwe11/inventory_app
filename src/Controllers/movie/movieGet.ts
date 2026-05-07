import type { Request, Response } from "express";
import { getMovie } from "../../DB/Queries/getMovie.js";
import { getAllGenres } from "../../DB/Queries/getGenres.js";

const movieGet = async (req: Request, res: Response) => {
  const movieId = req.query.id;
  const editMode = req.query.edit || false;

  const movieObj = await getMovie(movieId);
  const allGenres = await getAllGenres();

  console.log(movieObj);

  const { id, title, src, year, director_name, director_id, genre_list } =
    movieObj[0];

  res.render("movie", {
    id,
    src,

    title,
    year,
    director_name,

    director_id,
    genre_list,
    allGenres: allGenres.map(({ id, name }) => ({ id, name })),
    editMode,
  });
};

export default movieGet;
