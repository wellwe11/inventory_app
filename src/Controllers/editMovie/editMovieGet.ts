import type { Request, Response } from "express";
import { genres } from "../../../public/css/resources/movieGenres.js";

const editMovieGet = async (req: Request, res: Response) => {
  res.render("editMovie", { genres });
};

export default editMovieGet;
