import type { Request, Response } from "express";
import { genres } from "../../../public/resources/movieGenres.js";

const addMovieGet = async (req: Request, res: Response) => {
  res.render("addMovie", {
    genres,
  });
};

export default addMovieGet;
