import type { Request, Response } from "express";
import { getMovie } from "../../DB/Queries/getMovie.js";

const movieGet = async (req: Request, res: Response) => {
  const movieId = req.query.id;
  const movieObj = await getMovie(movieId);

  const { title, src, year, director_name, genre_list } = movieObj[0];

  res.render("movie", {
    title,
    src,
    year,
    director_name,
    genre_list,
  });
};

export default movieGet;
