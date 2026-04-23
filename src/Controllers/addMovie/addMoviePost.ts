import type { Request, Response } from "express";

const addMoviePost = async (req: Request, res: Response) => {
  const selectedGenres = req.body.genres;
};

export default addMoviePost;
