import type { Request, Response } from "express";

const addMoviePost = async (req: Request, res: Response) => {
  const selectedGenres = req.body.genres;
  console.log(selectedGenres);
};

export default addMoviePost;
