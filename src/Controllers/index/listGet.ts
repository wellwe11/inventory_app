import type { Request, Response } from "express";
import { genres } from "../../../public/resources/movieGenres.js";

const listGet = async (req: Request, res: Response) => {
  res.render("index", {
    genres,
  });
};

export default listGet;
