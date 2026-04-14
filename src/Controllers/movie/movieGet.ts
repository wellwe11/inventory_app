import type { Request, Response } from "express";

const movieGet = async (req: Request, res: Response) => {
  res.render("movie");
};

export default movieGet;
