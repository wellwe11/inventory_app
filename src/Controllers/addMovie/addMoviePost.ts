import type { Request, Response } from "express";

const addMoviePost = async (req: Request, res: Response) => {
  console.log(req.body);
  const selectedGenres = req.body.genres;
};

export default addMoviePost;
