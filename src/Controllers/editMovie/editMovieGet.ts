import type { Request, Response } from "express";

const editMovieGet = async (req: Request, res: Response) => {
  res.render("editMovie");
};

export default editMovieGet;
