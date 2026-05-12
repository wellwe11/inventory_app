import type { Request, Response } from "express";
import { getAllGenres } from "../../DB/Queries/getGenres.js";

const addMovieGet = async (req: Request, res: Response) => {
  const genres = await getAllGenres();
  console.log(genres);

  res.render("addMovie", {
    genres,
  });
};

export default addMovieGet;
